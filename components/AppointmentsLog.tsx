
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Appointment } from '../types';
import { TrashIcon, BellIcon } from './icons/Icons';
import ConfirmationDialog from './ConfirmationDialog';
import { useNotification } from '../hooks/useNotification';

const AppointmentsLog: React.FC = () => {
    const [appointments, setAppointments] = useLocalStorage<Appointment[]>('appointments', []);
    const [specialist, setSpecialist] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');
    const [setReminder, setSetReminder] = useState(false);
    const [reminderOffset, setReminderOffset] = useState(3600000); // Default: 1 hour in ms

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);

    const { permission, requestPermission, scheduleNotification } = useNotification();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!specialist.trim() || !date) return;
        
        const newAppointment: Appointment = { 
            id: new Date().toISOString(), 
            specialist, 
            date, 
            time, 
            notes,
            reminderSet: false 
        };

        if (setReminder && time) {
            if (permission !== 'granted') {
                requestPermission();
                alert("Por favor, concede permiso para notificaciones y vuelve a guardar la cita para establecer el recordatorio.");
            } else {
                const appointmentDateTime = new Date(`${date}T${time}`).getTime();
                const reminderTimestamp = appointmentDateTime - reminderOffset;
                
                if (reminderTimestamp > Date.now()) {
                    const success = scheduleNotification(
                        newAppointment.id,
                        `Recordatorio de Cita: ${specialist}`,
                        `Tu cita es a las ${time}. ${notes.substring(0, 100)}`,
                        reminderTimestamp
                    );
                    if (success) {
                        newAppointment.reminderSet = true;
                        alert("Recordatorio establecido con éxito.");
                    }
                } else {
                    alert("No se pudo establecer el recordatorio porque la hora de la cita ya ha pasado.");
                }
            }
        } else if (setReminder && !time) {
            alert("Por favor, especifica una hora para la cita para poder establecer un recordatorio.");
        }
        
        const sortedAppointments = [...appointments, newAppointment].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setAppointments(sortedAppointments);

        setSpecialist('');
        setDate('');
        setTime('');
        setNotes('');
        setSetReminder(false);
    };

    const handleRequestDelete = (id: string) => {
        setAppointmentToDelete(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (appointmentToDelete) {
            setAppointments(appointments.filter(a => a.id !== appointmentToDelete));
        }
        setIsConfirmOpen(false);
        setAppointmentToDelete(null);
    };

    return (
        <>
            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que quieres eliminar esta cita? Esta acción no se puede deshacer."
            />
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 text-center">Registro de Citas Médicas</h2>
                
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">Añadir Nueva Cita</h3>
                    <div>
                        <label htmlFor="specialist" className="block text-sm font-medium text-gray-700">Médico/Especialista</label>
                        <input type="text" id="specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500" placeholder="Ej: Reumatólogo" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
                            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500" required />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Hora</label>
                            <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="appointmentNotes" className="block text-sm font-medium text-gray-700">Notas (lugar, preguntas, etc.)</label>
                        <textarea id="appointmentNotes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500" placeholder="Ej: Preguntar sobre nuevo tratamiento"></textarea>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={setReminder}
                                onChange={(e) => setSetReminder(e.target.checked)}
                                className="h-5 w-5 rounded text-violet-600 focus:ring-violet-500 border-gray-300"
                            />
                            <span className="text-sm font-medium text-gray-700">Establecer recordatorio</span>
                        </label>
                        {setReminder && (
                            <div className="mt-3">
                                <label htmlFor="reminderOffset" className="block text-xs font-medium text-gray-500">Avisarme...</label>
                                <select 
                                    id="reminderOffset"
                                    value={reminderOffset}
                                    onChange={(e) => setReminderOffset(Number(e.target.value))}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white/50 border-gray-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md"
                                >
                                    <option value={300000}>5 minutos antes</option>
                                    <option value={600000}>10 minutos antes</option>
                                    <option value={1800000}>30 minutos antes</option>
                                    <option value={3600000}>1 hora antes</option>
                                    <option value={7200000}>2 horas antes</option>
                                    <option value={86400000}>1 día antes</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:from-violet-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all shadow-md hover:shadow-lg">
                        Guardar Cita
                    </button>
                </form>

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">Próximas Citas</h3>
                    {appointments.length === 0 ? (
                        <div className="text-center text-gray-500 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md">No hay citas registradas.</div>
                    ) : (
                        appointments.map(appointment => (
                            <div key={appointment.id} className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border-l-4 border-rose-400 flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-rose-700">{appointment.specialist}</p>
                                    <p className="text-sm font-semibold text-gray-800">{new Date(appointment.date).toLocaleDateString('es-ES', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} {appointment.time && `- ${appointment.time}`}</p>
                                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{appointment.notes}</p>
                                </div>
                                <div className="flex items-center flex-shrink-0 ml-2">
                                    {appointment.reminderSet && (
                                        <span className="text-violet-500 mr-1" title="Recordatorio activado">
                                            <BellIcon className="h-5 w-5" />
                                        </span>
                                    )}
                                    <button onClick={() => handleRequestDelete(appointment.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors" title="Eliminar cita">
                                       <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default AppointmentsLog;
