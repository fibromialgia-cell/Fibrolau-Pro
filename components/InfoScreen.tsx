
import React, { useState } from 'react';
import InfoCard from './InfoCard';
import { INFO_CARDS_DATA } from '../constants';
import { QuestionMarkCircleIcon, BrainIcon, SyringeIcon, LinkIcon, SparklesIcon, LeafIcon, BeakerIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from './icons/Icons';

// Web Audio API functions to play distinct, gentle sounds for opening and closing cards.
const playSound = (type: 'open' | 'close') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    if (type === 'open') {
        // A soft, rising "swoosh" sound.
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
    } else {
        // A subtle, short "click" sound for closing.
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
        oscillator.type = 'square';
        oscillator.frequency.value = 300;
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.05);
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
};


const InfoScreen: React.FC = () => {
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(0);

    const handleCardToggle = (index: number) => {
        const isOpening = openCardIndex !== index;
        
        if (isOpening) {
            setOpenCardIndex(index);
            playSound('open');
        } else {
            setOpenCardIndex(null);
            playSound('close');
        }
    };

    const getIcon = (iconName: string): React.ReactElement => {
        switch (iconName) {
            case 'question': return <QuestionMarkCircleIcon />;
            case 'brain': return <BrainIcon />;
            case 'syringe': return <SyringeIcon />;
            case 'link': return <LinkIcon />;
            case 'sparkles': return <SparklesIcon />;
            case 'leaf': return <LeafIcon />;
            case 'beaker': return <BeakerIcon />;
            case 'userGroup': return <UserGroupIcon />;
            case 'chatBubble': return <ChatBubbleLeftRightIcon />;
            default: return <QuestionMarkCircleIcon />;
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">Guía sobre Fibromialgia</h2>
            {INFO_CARDS_DATA.map((card, index) => {
                const cardProps = {
                    title: card.title,
                    details: card.details,
                    // Use the color defined in the card data for a vibrant, varied UI.
                    colorName: card.colorName,
                    icon: getIcon(card.icon),
                    isOpen: openCardIndex === index,
                    onClick: () => handleCardToggle(index),
                };

                return <InfoCard key={index} {...cardProps} />;
            })}
        </div>
    );
};

export default InfoScreen;
