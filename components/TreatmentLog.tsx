
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Treatment } from '../types';
import { TrashIcon, BellIcon } from './icons/Icons';
import ConfirmationDialog from './ConfirmationDialog';
import { useNotification } from '../hooks/useNotification';
import ReminderDialog from './ReminderDialog';

const TreatmentLog: React.FC = () => {
    const [treatments, setTreatments] = useLocalStorage<Treatment[]>('treatments', []);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [treatmentToDelete, setTreatmentToDelete] = useState<string | null>(null);
    
    const { permission, requestPermission, scheduleNotification } = useNotification();
    const [isReminderModalOpen, setReminderModalOpen] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        const newTreatment: Treatment = {
            id: new Date().toISOString(),
            name,
            notes,
            dateAdded: new Date().toLocaleDateString('es-ES'),
        };
        setTreatments([newTreatment, ...treatments]);
        setName('');
        setNotes('');
    };

    const handleRequestDelete = (id: string) => {
        setTreatmentToDelete(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (treatmentToDelete) {
            setTreatments(treatments.filter(t => t.id !== treatmentToDelete));
        }
        setIsConfirmOpen(false);
        setTreatmentToDelete(null);
    };

    const handleOpenReminderModal = (treatment: Treatment) => {
        if (permission === 'default') {
            requestPermission();
        }
        setSelectedTreatment(treatment);
        setReminderModalOpen(true);
    };
    
    const handleSetReminder = (dateTime: string) => {
        if (selectedTreatment) {
            const timestamp = new Date(dateTime).getTime();

             if (timestamp > Date.now()) {
                const success = scheduleNotification(
                    selectedTreatment.id,
                    'Recordatorio de Tratamiento',
                    `Es hora de tu tratamiento: ${selectedTreatment.name}. ${selectedTreatment.notes}`,
                    timestamp
                );
                if (success) {
                    alert("Recordatorio establecido con éxito.");
                }
            } else {
                alert("No se pudo establecer el recordatorio porque la hora seleccionada ya ha pasado.");
            }
        }
        setReminderModalOpen(false);
        setSelectedTreatment(null);
    };

    return (
        <>
            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que quieres eliminar este tratamiento? Esta acción no se puede deshacer."
            />
            <ReminderDialog
                isOpen={isReminderModalOpen}
                onClose={() => setReminderModalOpen(false)}
                onConfirm={handleSetReminder}
                treatmentName={selectedTreatment?.name || ''}
            />
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 text-center">Registro de Tratamientos</h2>
                
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">Añadir Nuevo Tratamiento</h3>
                    <div>
                        <label htmlFor="treatmentName" className="block text-sm font-medium text-gray-700">Nombre del Tratamiento/Medicina</label>
                        <input type="text" id="treatmentName" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500" placeholder="Ej: Fisioterapia, Paracetamol" required />
                    </div>
                    <div>
                        <label htmlFor="treatmentNotes" className="block text-sm font-medium text-gray-700">Notas (dosis, frecuencia, etc.)</label>
                        <textarea id="treatmentNotes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500" placeholder="Ej: 500mg cada 8 horas"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:from-violet-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all shadow-md hover:shadow-lg">
                        Guardar Tratamiento
                    </button>
                </form>

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">Historial de Tratamientos</h3>
                    {treatments.length === 0 ? (
                        <div className="text-center text-gray-500 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md">No hay tratamientos registrados.</div>
                    ) : (
                        treatments.map(treatment => (
                            <div key={treatment.id} className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border-l-4 border-violet-400 flex justify-between items-start">
                               <div>
                                    <p className="font-bold text-violet-700">{treatment.name}</p>
                                    <p className="text-sm text-gray-600 whitespace-pre-wrap mt-1">{treatment.notes}</p>
                                    <p className="text-xs text-gray-400 mt-2">Añadido el: {treatment.dateAdded}</p>
                               </div>
                               <div className="flex items-center flex-shrink-0 ml-2">
                                    <button onClick={() => handleOpenReminderModal(treatment)} className="text-violet-500 hover:text-violet-700 p-2 rounded-full hover:bg-violet-100 transition-colors" title="Establecer recordatorio">
                                        <BellIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleRequestDelete(treatment.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors" title="Eliminar tratamiento">
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

export default TreatmentLog;
