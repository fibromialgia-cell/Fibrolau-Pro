import React from 'react';

interface InstallButtonProps {
    onInstall: () => void;
}

const InstallButton: React.FC<InstallButtonProps> = ({ onInstall }) => {
    return (
        <button
            onClick={onInstall}
            title="Instalar aplicación"
            className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Instalar</span>
        </button>
    );
};

export default InstallButton;
