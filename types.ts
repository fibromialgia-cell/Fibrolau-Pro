
export interface Treatment {
    id: string;
    name: string;
    notes: string;
    dateAdded: string;
}

export interface Appointment {
    id: string;
    specialist: string;
    date: string;
    time: string;
    notes: string;
    reminderSet?: boolean;
}

export interface SymptomLog {
    name: string;
    severity: number; // e.g., 1-3 for Leve, Moderado, Severo
    duration: string; // e.g., 'Intermitente', 'Constante'
}

export interface DailyLog {
    id: string;
    date: string;
    painLevel: number;
    symptoms: SymptomLog[];
    notes: string;
    sleepQuality?: number;
    mood?: string;
    activityLevel?: number;
}

// --- Nuevos tipos para las tarjetas de información ---
export interface InfoCardDetail {
    type: 'paragraph' | 'list';
    text?: string;
    items?: string[];
}

export interface InfoCardData {
    title: string;
    details: InfoCardDetail[];
    colorName: string;
    icon: string;
}