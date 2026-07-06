export interface ButterflySessionMemory {
  lastSession: string | null;
  totalSessions: number;
  favoriteHealingTheme: string | null;
  lastEmotion: string | null;
  lastPrayerDate: string | null;
}

let memory: ButterflySessionMemory = {
  lastSession: null,
  totalSessions: 0,
  favoriteHealingTheme: null,
  lastEmotion: null,
  lastPrayerDate: null,
};

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
}

export function incrementSessionCount() {
  memory.totalSessions += 1;
}

export function resetSessionMemory() {
  memory = {
    lastSession: null,
    totalSessions: 0,
    favoriteHealingTheme: null,
    lastEmotion: null,
    lastPrayerDate: null,
  };
}