import { ButterflyProgress } from '../types/healing';
import { loadData, saveData } from './storage';

const PROGRESS_KEY = 'butterfly_progress';

const defaultProgress: ButterflyProgress = {
  butterflySteps: 0,
  completedExercises: [],
  streak: 0,
  lastCheckIn: undefined,
};

export async function getProgress(): Promise<ButterflyProgress> {
  const progress = await loadData<ButterflyProgress>(PROGRESS_KEY);
  return progress ?? defaultProgress;
}

export async function saveProgress(
  progress: ButterflyProgress
): Promise<void> {
  await saveData(PROGRESS_KEY, progress);
}

export async function completeExercise(
  exercise: string
): Promise<ButterflyProgress> {
  const progress = await getProgress();

  if (!progress.completedExercises.includes(exercise)) {
    progress.completedExercises.push(exercise);
    progress.butterflySteps += 1;
  }

  progress.lastCheckIn = new Date().toISOString();

  await saveProgress(progress);

  return progress;
}

export async function resetProgress(): Promise<void> {
  await saveProgress(defaultProgress);
}
