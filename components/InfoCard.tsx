
import React from 'react';
import { InfoCardDetail } from '../types';
import { ChevronDownIcon } from './icons/Icons';

interface InfoCardProps {
    title: string;
    details: InfoCardDetail[];
    colorName: string;
    isOpen: boolean;
    onClick: () => void;
    icon: React.ReactElement;
}

const parseText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            // Using a darker slate color for better contrast and emphasis.
            return <strong key={index} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

const InfoCard: React.FC<InfoCardProps> = ({ title, details, colorName, isOpen, onClick, icon }) => {
    
    const baseClasses = `
        backdrop-blur-lg rounded-3xl shadow-lg shadow-inner
        transition-all duration-500 ease-in-out border overflow-hidden
    `;
    
    const closedClasses = `
        bg-gradient-to-br from-white/70 to-white/40
        border-white/50 hover:border-white/80 hover:shadow-xl hover:-translate-y-1
    `;
    
    // When open, the card gets a beautiful, subtle color wash from its theme color.
    const openClasses = `
        bg-gradient-to-br from-${colorName}-100/80 via-white/50 to-white/70
        border-${colorName}-300 shadow-2xl
    `;

    const containerClasses = `${baseClasses} ${isOpen ? openClasses : closedClasses}`;

    return (
        <div className={containerClasses}>
            <div 
                className="group flex items-center justify-between p-6 cursor-pointer" 
                onClick={onClick}
                aria-expanded={isOpen}
                aria-controls={`content-${title.replace(/\s+/g, '-')}`}
            >
                <div className="flex items-center space-x-5">
                    <div className={`
                        flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center 
                        bg-${colorName}-500 shadow-lg shadow-${colorName}-500/30
                    `}>
                        <span className="text-white">
                            {React.cloneElement(icon, { className: 'w-8 h-8' })}
                        </span>
                    </div>
                    <h3 className={`text-xl font-bold text-slate-800 transition-colors duration-300 ${isOpen ? `text-${colorName}-600` : 'group-hover:text-violet-600'}`}>
                        {title}
                    </h3>
                </div>
                <span className={`transform transition-transform duration-300 text-gray-400 group-hover:text-violet-600 ${isOpen ? 'rotate-180 text-violet-600' : ''}`}>
                    <ChevronDownIcon />
                </span>
            </div>
            
            <div
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                id={`content-${title.replace(/\s+/g, '-')}`}
                aria-hidden={!isOpen}
            >
                <div className="overflow-hidden">
                    <div className={`px-6 pb-6 pt-0 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="border-t border-violet-200/80 pt-5 space-y-4 text-slate-700 leading-relaxed">
                            {details.map((detail, index) => {
                                if (detail.type === 'paragraph' && detail.text) {
                                    return <p key={index}>{parseText(detail.text)}</p>;
                                }
                                if (detail.type === 'list' && detail.items) {
                                    return (
                                        <ul key={index} className="space-y-2 list-disc list-inside">
                                            {detail.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="pl-2">{parseText(item)}</li>
                                            ))}
                                        </ul>
                                     );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
