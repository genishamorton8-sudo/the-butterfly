import { loadData, saveData } from './storage';

export interface ButterflySessionMemory {
  lastSession: string | null;
  totalSessions: number;
  favoriteHealingTheme: string | null;
  lastEmotion: string | null;
  lastPrayerDate: string | null;
}

const SESSION_MEMORY_KEY = 'butterfly_session_memory';

const defaultMemory: ButterflySessionMemory = {
  lastSession: null,
  totalSessions: 0,
  favoriteHealingTheme: null,
  lastEmotion: null,
  lastPrayerDate: null,
};

let memory: ButterflySessionMemory = { ...defaultMemory };
let hydrated = false;

// Loads any previously saved session memory from disk into the in-memory
// cache. Call this once, early in the app lifecycle (e.g. after login),
// before any screen reads getSessionMemory(). Reads stay synchronous for
// callers; this is what makes that data survive an app restart.
export async function hydrateSessionMemory(): Promise<void> {
  if (hydrated) return;

  const saved = await loadData<ButterflySessionMemory>(SESSION_MEMORY_KEY);

  if (saved) {
    memory = saved;
  }

  hydrated = true;
}

export function getSessionMemory(): ButterflySessionMemory {
  return memory;
}

export function updateSessionMemory(
  updates: Partial<ButterflySessionMemory>
) {
  memory = {
    ...memory,
    ...updates,
  };

  saveData(SESSION_MEMORY_KEY, memory);
}

export function incrementSessionCount() {
  memory.totalSessions += 1;

  saveData(SESSION_MEMORY_KEY, memory);
}

export function resetSessionMemory() {
  memory = { ...defaultMemory };

  saveData(SESSION_MEMORY_KEY, memory);
}