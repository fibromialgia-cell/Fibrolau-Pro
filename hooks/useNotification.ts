
import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export interface ScheduledNotification {
    id: string;
    title: string;
    body: string;
    timestamp: number;
}

// Store timeout IDs to be able to clear them
const timeoutIds: { [key: string]: number } = {};

export const useNotification = () => {
    const [permission, setPermission] = useState('Notification' in window ? Notification.permission : 'default');
    const [notifications, setNotifications] = useLocalStorage<ScheduledNotification[]>('scheduledNotifications', []);

    const requestPermission = useCallback(() => {
        if ('Notification' in window) {
            Notification.requestPermission().then(setPermission);
        }
    }, []);

    const scheduleNotification = useCallback((id: string, title: string, body: string, timestamp: number) => {
        if (permission !== 'granted') {
            alert('Por favor, habilita las notificaciones para esta aplicación en la configuración de tu navegador.');
            requestPermission();
            return false;
        }

        const delay = timestamp - Date.now();
        if (delay < 0) {
            console.error("No se puede programar una notificación en el pasado.");
            return false;
        }

        // Add to local storage
        setNotifications(prev => [...prev.filter(n => n.id !== id), { id, title, body, timestamp }]);

        // Clear any existing timeout for this ID
        if (timeoutIds[id]) {
            clearTimeout(timeoutIds[id]);
        }

        // Schedule
        const timeoutId = window.setTimeout(() => {
            new Notification(title, { body });
            // Remove from local storage after it has been sent
            setNotifications(prev => prev.filter(n => n.id !== id));
            delete timeoutIds[id];
        }, delay);
        timeoutIds[id] = timeoutId;

        return true;

    }, [permission, setNotifications, requestPermission]);
    
    // On initial load, check for pending notifications and schedule them.
    useEffect(() => {
        if (permission === 'granted') {
            const rescheduled = new Set<string>();

            notifications.forEach(n => {
                if (rescheduled.has(n.id)) return;

                const delay = n.timestamp - Date.now();
                if (delay > 0) {
                    if (timeoutIds[n.id]) {
                        clearTimeout(timeoutIds[n.id]);
                    }
                    const timeoutId = window.setTimeout(() => {
                        new Notification(n.title, { body: n.body });
                        setNotifications(prev => prev.filter(p => p.id !== n.id));
                        delete timeoutIds[n.id];
                    }, delay);
                    timeoutIds[n.id] = timeoutId;
                    rescheduled.add(n.id);
                } else {
                    // Clean up past notifications from storage
                    setNotifications(prev => prev.filter(p => p.id !== n.id));
                }
            });
        }
    }, [permission, notifications, setNotifications]);

    return { permission, requestPermission, scheduleNotification };
};
