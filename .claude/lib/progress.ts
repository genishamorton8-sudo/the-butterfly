import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = '@butterfly_progress';

export async function getProgress() {
  const savedProgress = await AsyncStorage.getItem(PROGRESS_KEY);

  if (savedProgress) {
    return Number(savedProgress);
  }

  return 20;
}

export async function increaseProgress(amount: number = 5) {
  const currentProgress = await getProgress();

  let newProgress = currentProgress + amount;

  if (newProgress > 100) {
    newProgress = 100;
  }

  await AsyncStorage.setItem(PROGRESS_KEY, String(newProgress));

  return newProgress;
}

export async function resetProgress() {
  await AsyncStorage.setItem(PROGRESS_KEY, '20');
}