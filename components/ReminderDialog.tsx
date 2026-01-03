
import React, { useState } from 'react';

interface ReminderDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (dateTime: string) => void;
    treatmentName: string;
}

const ReminderDialog: React.FC<ReminderDialogProps> = ({ isOpen, onClose, onConfirm, treatmentName }) => {
    if (!isOpen) return null;
    
    const now = new Date();
    // Set default to 1 hour from now
    now.setHours(now.getHours() + 1);
    const defaultDate = now.toISOString().split('T')[0];
    const defaultTime = now.toTimeString().substring(0, 5);

    const [date, setDate] = useState(defaultDate);
    const [time, setTime] = useState(defaultTime);

    const handleSubmit = () => {
        if (date && time) {
            onConfirm(`${date}T${time}`);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale border border-white/50">
                <h3 className="text-lg font-bold text-gray-800">Establecer Recordatorio</h3>
                <p className="mt-2 text-sm text-gray-600">
                    Establecer un recordatorio para: <span className="font-semibold text-violet-700">{treatmentName}</span>
                </p>
                <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="reminder-date" className="block text-sm font-medium text-gray-700">Fecha</label>
                            <input type="date" id="reminder-date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500" required />
                        </div>
                        <div>
                            <label htmlFor="reminder-time" className="block text-sm font-medium text-gray-700">Hora</label>
                            <input type="time" id="reminder-time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500" required />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-md hover:from-violet-600 hover:to-indigo-600 font-semibold shadow-md">
                        Guardar
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in-scale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ReminderDialog;
