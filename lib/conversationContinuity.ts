let lastConversationDate: string | null = null;

export function saveConversationDate() {
  lastConversationDate = new Date().toISOString();
}

export function daysSinceLastConversation(): number {
  if (!lastConversationDate) {
    return 0;
  }

  const then = new Date(lastConversationDate).getTime();
  const now = Date.now();

  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}