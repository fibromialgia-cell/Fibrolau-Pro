
import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DailyLog as DailyLogType, SymptomLog } from '../types';
import { FIBROMYALGIA_SYMPTOMS, MOOD_OPTIONS, SLEEP_QUALITY_LABELS, ACTIVITY_LEVEL_LABELS, SYMPTOM_SEVERITY_LABELS, SYMPTOM_DURATION_OPTIONS } from '../constants';
import { TrashIcon, PainIcon, SleepIcon, ActivityIcon, MoodIcon } from './icons/Icons';
import PainChart from './PainChart';
import LogStatistics from './LogStatistics';
import ConfirmationDialog from './ConfirmationDialog';

const DailyLog: React.FC = () => {
    const [logs, setLogs] = useLocalStorage<DailyLogType[]>('dailyLogs', []);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    
    // Form state
    const [painLevel, setPainLevel] = useState(5);
    const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
    const [notes, setNotes] = useState('');
    const [sleepQuality, setSleepQuality] = useState(3);
    const [mood, setMood] = useState('Normal');
    const [activityLevel, setActivityLevel] = useState(3);

    // Confirmation Dialog State
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [logToDelete, setLogToDelete] = useState<string | null>(null);

    useEffect(() => {
        const logForDate = logs.find(log => log.date === date);
        if (logForDate) {
            setPainLevel(logForDate.painLevel);
            setSymptomLogs(logForDate.symptoms);
            setNotes(logForDate.notes);
            setSleepQuality(logForDate.sleepQuality ?? 3);
            setMood(logForDate.mood ?? 'Normal');
            setActivityLevel(logForDate.activityLevel ?? 3);
        } else {
            // Reset form for a new entry
            setPainLevel(5);
            setSymptomLogs([]);
            setNotes('');
            setSleepQuality(3);
            setMood('Normal');
            setActivityLevel(3);
        }
    }, [date, logs]);

    const toggleSymptom = (symptomName: string) => {
        const symptomExists = symptomLogs.some(s => s.name === symptomName);
        if (symptomExists) {
            setSymptomLogs(prev => prev.filter(s => s.name !== symptomName));
        } else {
            setSymptomLogs(prev => [...prev, { name: symptomName, severity: 1, duration: 'Intermitente' }]);
        }
    };

    const updateSymptomDetail = (symptomName: string, detail: Partial<Omit<SymptomLog, 'name'>>) => {
        setSymptomLogs(prev => 
            prev.map(s => s.name === symptomName ? { ...s, ...detail } : s)
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLog: DailyLogType = { 
            id: new Date(date).toISOString(), 
            date, 
            painLevel, 
            symptoms: symptomLogs, 
            notes,
            sleepQuality,
            mood,
            activityLevel,
        };
        const updatedLogs = logs.filter(log => log.date !== date);
        const sortedLogs = [...updatedLogs, newLog].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setLogs(sortedLogs);
    };
    
    const handleRequestDelete = (id: string) => {
        setLogToDelete(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (logToDelete) {
            setLogs(logs.filter(log => log.id !== logToDelete));
        }
        setIsConfirmOpen(false);
        setLogToDelete(null);
    };

    const getPainColor = (level: number) => {
        if (level < 4) return 'text-green-600';
        if (level < 8) return 'text-amber-600';
        return 'text-red-600';
    };
    
    const getSymptomSeverityClass = (severity: number) => {
        switch (severity) {
            case 1: return 'bg-green-100 text-green-800';
            case 2: return 'bg-amber-100 text-amber-800';
            case 3: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que quieres eliminar este registro diario? Esta acción no se puede deshacer."
            />
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 text-center">Registro Diario de Síntomas</h2>
                
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 space-y-6">
                    <h3 className="font-semibold text-lg text-gray-800">Registro del día</h3>
                    <div>
                        <label htmlFor="logDate" className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input type="date" id="logDate" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500" required />
                    </div>
                    
                    <div>
                        <label htmlFor="painLevel" className="block text-sm font-medium text-gray-700">Nivel de Dolor: <span className="font-bold text-violet-600">{painLevel}</span>/10</label>
                        <input type="range" id="painLevel" min="0" max="10" value={painLevel} onChange={(e) => setPainLevel(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Calidad del Sueño: <span className="font-bold text-violet-600">{SLEEP_QUALITY_LABELS[sleepQuality]}</span></label>
                        <input type="range" min="1" max="5" value={sleepQuality} onChange={(e) => setSleepQuality(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nivel de Actividad: <span className="font-bold text-violet-600">{ACTIVITY_LEVEL_LABELS[activityLevel]}</span></label>
                        <input type="range" min="1" max="5" value={activityLevel} onChange={(e) => setActivityLevel(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600" />
                    </div>

                    <div>
                        <p className="block text-sm font-medium text-gray-700">Estado de Ánimo</p>
                        <div className="mt-2 flex justify-around items-center">
                            {Object.entries(MOOD_OPTIONS).map(([moodName, emoji]) => (
                                <button key={moodName} type="button" onClick={() => setMood(moodName)} className={`flex flex-col items-center p-2 rounded-lg transition-colors w-14 ${mood === moodName ? 'bg-violet-100' : 'hover:bg-gray-100'}`}>
                                    <span className="text-2xl">{emoji}</span>
                                    <span className="text-xs mt-1">{moodName}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="block text-sm font-medium text-gray-700">Síntomas Presentes</p>
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {FIBROMYALGIA_SYMPTOMS.map(symptom => (
                                <button key={symptom} type="button" onClick={() => toggleSymptom(symptom)} className={`text-sm py-2 px-3 rounded-full border transition-colors ${symptomLogs.some(s => s.name === symptom) ? 'bg-violet-600 text-white border-violet-700 shadow-md' : 'bg-white/80 text-gray-700 border-gray-300 hover:bg-violet-50'}`}>
                                    {symptom}
                                </button>
                            ))}
                        </div>

                        {symptomLogs.length > 0 && (
                            <div className="mt-6 space-y-5 border-t pt-5">
                                {symptomLogs.sort((a,b) => a.name.localeCompare(b.name)).map(symptomLog => (
                                    <div key={symptomLog.name}>
                                        <p className="font-semibold text-gray-800">{symptomLog.name}</p>
                                        <div className="mt-2 space-y-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600">Severidad: <span className="font-bold text-violet-600">{SYMPTOM_SEVERITY_LABELS[symptomLog.severity]}</span></label>
                                                <input type="range" min="1" max="3" value={symptomLog.severity} onChange={(e) => updateSymptomDetail(symptomLog.name, { severity: Number(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600 mt-1" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Duración</label>
                                                <div className="flex items-center gap-2">
                                                    {SYMPTOM_DURATION_OPTIONS.map(duration => (
                                                        <button key={duration} type="button" onClick={() => updateSymptomDetail(symptomLog.name, { duration })} className={`text-xs py-1 px-3 rounded-full border transition-colors ${symptomLog.duration === duration ? 'bg-violet-600 text-white border-violet-700' : 'bg-white/80 text-gray-700 border-gray-300 hover:bg-violet-50'}`}>
                                                            {duration}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="logNotes" className="block text-sm font-medium text-gray-700">Notas Adicionales</label>
                        <textarea id="logNotes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500" placeholder="Ej: El clima húmedo empeoró el dolor"></textarea>
                    </div>
                     <button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:from-violet-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all shadow-md hover:shadow-lg">
                        Guardar Registro del Día
                    </button>
                </form>

                <PainChart logs={logs} />

                <LogStatistics logs={logs} />

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">Historial de Registros</h3>
                    {logs.length === 0 ? (
                        <div className="text-center text-gray-500 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md">No hay registros diarios.</div>
                    ) : (
                        logs.map(log => (
                            <div key={log.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/50">
                                <div className="bg-violet-500/10 p-4 flex justify-between items-center">
                                    <p className="font-bold text-violet-700">{new Date(log.date).toLocaleDateString('es-ES', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <button onClick={() => handleRequestDelete(log.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors flex-shrink-0">
                                        <TrashIcon />
                                    </button>
                                </div>

                                <div className="p-4 space-y-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                        <div className="flex items-center space-x-2 p-2 bg-gray-500/5 rounded-lg">
                                            <PainIcon />
                                            <div>
                                                <span className="text-gray-500">Dolor</span>
                                                <p className={`font-bold text-lg ${getPainColor(log.painLevel)}`}>{log.painLevel}/10</p>
                                            </div>
                                        </div>
                                        {log.sleepQuality && (
                                            <div className="flex items-center space-x-2 p-2 bg-gray-500/5 rounded-lg">
                                                <SleepIcon />
                                                <div>
                                                    <span className="text-gray-500">Sueño</span>
                                                    <p className="font-bold">{SLEEP_QUALITY_LABELS[log.sleepQuality]}</p>
                                                </div>
                                            </div>
                                        )}
                                        {log.activityLevel && (
                                            <div className="flex items-center space-x-2 p-2 bg-gray-500/5 rounded-lg">
                                                <ActivityIcon />
                                                <div>
                                                    <span className="text-gray-500">Actividad</span>
                                                    <p className="font-bold">{ACTIVITY_LEVEL_LABELS[log.activityLevel]}</p>
                                                </div>
                                            </div>
                                        )}
                                        {log.mood && (
                                            <div className="flex items-center space-x-2 p-2 bg-gray-500/5 rounded-lg">
                                                <MoodIcon />
                                                <div>
                                                    <span className="text-gray-500">Ánimo</span>
                                                    <p className="font-bold">{MOOD_OPTIONS[log.mood]} {log.mood}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {log.symptoms.length > 0 && (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 mb-2">Síntomas:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {log.symptoms.map(s => (
                                                    <div key={s.name} className={`text-xs font-medium px-2.5 py-1 rounded-full ${getSymptomSeverityClass(s.severity)}`}>
                                                        {s.name} ({s.duration})
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {log.notes && (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 mb-1">Notas:</p>
                                            <p className="text-sm text-gray-700 bg-violet-500/10 p-3 rounded-lg whitespace-pre-wrap">{log.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default DailyLog;