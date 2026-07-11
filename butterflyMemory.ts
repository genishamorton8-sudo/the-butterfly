export type ButterflyMemory = {
  lastConversation?: string;
  lastEmotion?: string;
  lastExercise?: string;
  lastPrayerTopic?: string;
  conversationCount: number;
  updatedAt: string;
};

let memory: ButterflyMemory = {
  conversationCount: 0,
  updatedAt: new Date().toISOString(),
};

export function getButterflyMemory(): ButterflyMemory {
  return memory;
}

export function updateButterflyMemory(update: Partial<ButterflyMemory>) {
  memory = {
    ...memory,
    ...update,
    conversationCount: memory.conversationCount + 1,
    updatedAt: new Date().toISOString(),
  };

  return memory;
}

export function clearButterflyMemory() {
  memory = {
    conversationCount: 0,
    updatedAt: new Date().toISOString(),
  };
}

export function buildWelcomeBackMessage() {
  if (memory.conversationCount === 0) {
    return "I'm Butterfly. I'm honored to walk with you.";
  }

  const pieces: string[] = [];

  pieces.push("Welcome back.");

  if (memory.lastEmotion) {
    pieces.push(
      `Last time you shared that you were feeling ${memory.lastEmotion}.`
    );
  }

  if (memory.lastExercise) {
    pieces.push(
      `We explored "${memory.lastExercise}" together.`
    );
  }

  pieces.push("How has your heart been since we last talked?");

  return pieces.join(" ");
}