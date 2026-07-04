type ConversationSnapshot = {
  date: string;
  summary: string;
  emotion: string;
  theme: string;
};

let previousConversation: ConversationSnapshot | null = null;

export function saveConversationSnapshot(
  summary: string,
  emotion: string,
  theme: string
) {
  previousConversation = {
    date: new Date().toISOString(),
    summary,
    emotion,
    theme,
  };
}

export function getConversationSnapshot() {
  return previousConversation;
}

export function buildConversationContinuation(): string {
  if (!previousConversation) {
    return "I'm glad you're here today. Where would you like to begin?";
  }

  const pieces: string[] = [];

  pieces.push("Welcome back.");

  if (previousConversation.emotion) {
    pieces.push(
      `Last time you shared that you were feeling ${previousConversation.emotion}.`
    );
  }

  if (previousConversation.theme) {
    pieces.push(
      `We spent time talking about ${previousConversation.theme.toLowerCase()}.`
    );
  }

  pieces.push(
    "How have things been since our last conversation?"
  );

  return pieces.join(" ");
}

export function daysSinceLastConversation(): number {
  if (!previousConversation) {
    return 0;
  }

  const then = new Date(previousConversation.date).getTime();
  const now = Date.now();

  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

export function hasRecentConversation(): boolean {
  return daysSinceLastConversation() <= 7;
}