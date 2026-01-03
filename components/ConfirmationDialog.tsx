
import React from 'react';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale border border-white/50">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{message}</p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 font-semibold"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-md hover:from-red-600 hover:to-rose-600 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold"
                    >
                        Eliminar
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

export default ConfirmationDialog;