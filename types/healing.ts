export interface HealingEntry {
  id: string;
  exercise: string;
  title: string;
  date: string;
  answers: Record<string, string>;
}

export interface ButterflyProgress {
  butterflySteps: number;
  completedExercises: string[];
  streak: number;
  lastCheckIn?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  exercise: string;
  date: string;
  preview: string;
  answers: Record<string, string>;
}