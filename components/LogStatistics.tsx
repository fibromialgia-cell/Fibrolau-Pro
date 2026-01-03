
import React, { useMemo } from 'react';
import { DailyLog } from '../types';
import { SLEEP_QUALITY_LABELS, MOOD_OPTIONS } from '../constants';

interface LogStatisticsProps {
    logs: DailyLog[];
}

const StatCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/60 backdrop-blur-sm border border-white/50 p-3 rounded-xl text-center shadow-md">
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <div className="font-bold text-violet-700 text-lg mt-1">{children}</div>
    </div>
);

const LogStatistics: React.FC<LogStatisticsProps> = ({ logs }) => {
    const stats = useMemo(() => {
        if (logs.length === 0) {
            return null;
        }

        const totalPain = logs.reduce((sum, log) => sum + log.painLevel, 0);
        const averagePain = (totalPain / logs.length).toFixed(1);

        const logsWithSleep = logs.filter(log => typeof log.sleepQuality === 'number');
        const totalSleep = logsWithSleep.reduce((sum, log) => sum + log.sleepQuality!, 0);
        const averageSleep = logsWithSleep.length > 0 ? (totalSleep / logsWithSleep.length).toFixed(1) : null;
        const averageSleepLabel = averageSleep ? SLEEP_QUALITY_LABELS[Math.round(parseFloat(averageSleep))] : null;

        const highestPainLog = logs.reduce((max, log) => log.painLevel > max.painLevel ? log : max, logs[0]);
        
        const moodCounts: { [key: string]: number } = {};
        for (const log of logs) {
            if (log.mood) {
                moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
            }
        }
        const mostFrequentMood = Object.keys(moodCounts).length > 0 ? Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b) : null;


        return {
            averagePain,
            averageSleep,
            averageSleepLabel,
            highestPainLog,
            mostFrequentMood
        };
    }, [logs]);

    if (!stats) {
        return (
             <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center text-gray-500 border border-white/50">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Estadísticas Clave</h3>
                <p>No hay datos para mostrar estadísticas.</p>
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
            <h3 className="font-semibold text-lg text-gray-800 mb-4 text-center">Estadísticas Clave</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Dolor Promedio">
                    <span>{stats.averagePain} <span className="text-base font-medium text-gray-500">/ 10</span></span>
                </StatCard>

                {stats.averageSleep && (
                    <StatCard title="Sueño Promedio">
                        <span className="text-base">{stats.averageSleepLabel}</span>
                        <span className="text-xs block text-gray-500 font-normal">({stats.averageSleep})</span>
                    </StatCard>
                )}

                {stats.mostFrequentMood && (
                    <StatCard title="Ánimo Frecuente">
                         <span className="text-2xl">{MOOD_OPTIONS[stats.mostFrequentMood]}</span>
                         <span className="text-sm block font-medium">{stats.mostFrequentMood}</span>
                    </StatCard>
                )}

                <StatCard title="Pico de Dolor">
                    <span>{stats.highestPainLog.painLevel} <span className="text-base font-medium text-gray-500">/ 10</span></span>
                     <span className="text-xs block text-gray-500 font-normal">
                        {new Date(stats.highestPainLog.date).toLocaleDateString('es-ES', { timeZone: 'UTC', month: 'short', day: 'numeric' })}
                    </span>
                </StatCard>
            </div>
        </div>
    );
};

export default LogStatistics;