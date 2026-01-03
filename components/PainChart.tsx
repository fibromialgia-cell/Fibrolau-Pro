
import React from 'react';
import { DailyLog } from '../types';

interface PainChartProps {
    logs: DailyLog[];
}

const PainChart: React.FC<PainChartProps> = ({ logs }) => {
    if (logs.length < 2) {
        return (
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center text-gray-500 border border-white/50">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Evolución del Dolor</h3>
                <p>Se necesitan al menos 2 registros para mostrar un gráfico.</p>
            </div>
        );
    }

    const sortedLogs = [...logs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const latestLogs = sortedLogs.slice(-15); // Show last 15 logs for clarity

    const width = 500;
    const height = 200;
    const padding = 40;

    const xScale = (index: number) => {
        return padding + (index / (latestLogs.length - 1)) * (width - padding * 2);
    };

    const yScale = (painLevel: number) => {
        return height - padding - (painLevel / 10) * (height - padding * 2);
    };

    const linePoints = latestLogs.map((log, index) => `${xScale(index)},${yScale(log.painLevel)}`).join(' ');
    const areaPoints = `M ${xScale(0)},${height - padding} L ${linePoints} L ${xScale(latestLogs.length - 1)},${height - padding} Z`;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { timeZone: 'UTC', day: '2-digit', month: '2-digit' });
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
            <h3 className="font-semibold text-lg text-gray-800 mb-4 text-center">Evolución del Dolor (Últimos {latestLogs.length} registros)</h3>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-labelledby="chartTitle chartDesc">
                <title id="chartTitle">Gráfico de Nivel de Dolor</title>
                <desc id="chartDesc">Un gráfico de línea mostrando la fluctuación del nivel de dolor a lo largo del tiempo.</desc>

                <defs>
                    <linearGradient id="painGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Y Axis Labels and Grid Lines */}
                {[0, 2, 4, 6, 8, 10].map(level => (
                    <g key={level} className="text-gray-400">
                        <text
                            x={padding - 10}
                            y={yScale(level)}
                            textAnchor="end"
                            alignmentBaseline="middle"
                            className="text-xs fill-current"
                        >
                            {level}
                        </text>
                        <line
                            x1={padding}
                            y1={yScale(level)}
                            x2={width - padding}
                            y2={yScale(level)}
                            className="stroke-current opacity-50"
                            strokeDasharray="3,3"
                        />
                    </g>
                ))}

                {/* X Axis Labels */}
                {latestLogs.map((log, index) => {
                    if (index === 0 || index === latestLogs.length - 1 || (latestLogs.length > 8 && index % Math.floor(latestLogs.length / 4) === 0)) {
                        return (
                             <text
                                key={log.id}
                                x={xScale(index)}
                                y={height - padding + 15}
                                textAnchor="middle"
                                className="text-xs fill-current text-gray-500"
                            >
                                {formatDate(log.date)}
                            </text>
                        )
                    }
                    return null;
                })}

                {/* Area Gradient */}
                <path d={areaPoints} fill="url(#painGradient)" />

                {/* Data Line */}
                <polyline
                    fill="none"
                    strokeWidth="2.5"
                    className="stroke-violet-500"
                    points={linePoints}
                />

                {/* Data Points */}
                {latestLogs.map((log, index) => (
                    <circle
                        key={log.id}
                        cx={xScale(index)}
                        cy={yScale(log.painLevel)}
                        r="4"
                        className="fill-white stroke-violet-600"
                        strokeWidth="2"
                    >
                         <title>Fecha: {formatDate(log.date)}, Dolor: {log.painLevel}</title>
                    </circle>
                ))}
            </svg>
        </div>
    );
};

export default PainChart;