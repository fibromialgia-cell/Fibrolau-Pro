
import React, { useState, useEffect } from 'react';
import InfoScreen from './components/InfoScreen';
import TreatmentLog from './components/TreatmentLog';
import AppointmentsLog from './components/AppointmentsLog';
import DailyLog from './components/DailyLog';
import { HomeIcon, PillIcon, CalendarIcon, ChartBarIcon } from './components/icons/Icons';
import InstallButton from './components/InstallButton';

type View = 'info' | 'treatments' | 'appointments' | 'daily';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('info');
    const [installPrompt, setInstallPrompt] = useState<any>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            console.log('beforeinstallprompt event fired');
            setInstallPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = () => {
        if (!installPrompt) {
            return;
        }
        installPrompt.prompt();
        installPrompt.userChoice.then((choiceResult: { outcome: string }) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            setInstallPrompt(null);
        });
    };

    const renderView = () => {
        switch (activeView) {
            case 'info':
                return <InfoScreen />;
            case 'treatments':
                return <TreatmentLog />;
            case 'appointments':
                return <AppointmentsLog />;
            case 'daily':
                return <DailyLog />;
            default:
                return <InfoScreen />;
        }
    };
    
    const NavItem = ({ view, label, icon }: { view: View, label: string, icon: React.ReactElement }) => {
        const isActive = activeView === view;
        return (
            <button
                onClick={() => setActiveView(view)}
                className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-200 ease-in-out rounded-lg m-1 ${
                    isActive 
                    ? 'bg-violet-100 text-violet-600' 
                    : 'text-gray-500 hover:text-violet-600 hover:bg-violet-50'
                }`}
            >
                {React.cloneElement(icon, { className: 'h-6 w-6' })}
                <span className="text-xs mt-1 font-semibold">{label}</span>
            </button>
        );
    };


    return (
        <div className="min-h-screen font-sans flex flex-col">
            <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200/80">
                <div className="max-w-4xl mx-auto px-4 py-4 relative flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-500">
                        Fibrolatamunidos Pro
                    </h1>
                    <div className="absolute right-4 top-0 bottom-0 flex items-center">
                        {installPrompt && <InstallButton onInstall={handleInstallClick} />}
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto p-4 pb-24 max-w-4xl">
                {renderView()}

                <footer className="mt-12 text-center">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Fibrolatamunidos Pro. Todos los derechos reservados.
                    </p>
                </footer>
            </main>
            
            <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200/80 shadow-t-2xl flex justify-around z-10 p-1">
                <NavItem view="info" label="Información" icon={<HomeIcon />} />
                <NavItem view="treatments" label="Tratamientos" icon={<PillIcon />} />
                <NavItem view="appointments" label="Citas" icon={<CalendarIcon />} />
                <NavItem view="daily" label="Registro Diario" icon={<ChartBarIcon />} />
            </nav>
        </div>
    );
};

export default App;
