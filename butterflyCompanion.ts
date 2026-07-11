export type CompanionProfile = {
  victories: string[];
  struggles: string[];
  favoriteScriptures: string[];
};

export type CompanionMemory = {
  userName: string;
  lastConversationDate: string | null;
  lastHealingTheme: string;
  conversationCount: number;
  favoriteScripture: string;
  prayerStreak: number;
  encouragementStreak: number;
  lastCheckIn: string | null;
};

let profile: CompanionProfile = {
  victories: [],
  struggles: [],
  favoriteScriptures: [],
};

let memory: CompanionMemory = {
  userName: 'Friend',
  lastConversationDate: null,
  lastHealingTheme: 'none',
  conversationCount: 0,
  favoriteScripture: 'Psalm 46:10',
  prayerStreak: 0,
  encouragementStreak: 0,
  lastCheckIn: null,
};

export function getCompanionProfile(): CompanionProfile {
  return profile;
}

export function getCompanionMemory(): CompanionMemory {
  return memory;
}

export function updateCompanionMemory(theme: string) {
  memory = {
    ...memory,
    lastConversationDate: new Date().toISOString(),
    lastHealingTheme: theme,
    conversationCount: memory.conversationCount + 1,
  };
}

export function rememberUserName(name: string) {
  if (!name.trim()) return;

  memory = {
    ...memory,
    userName: name.trim(),
  };
}

export function rememberFavoriteScripture(scripture: string) {
  if (!scripture.trim()) return;

  memory = {
    ...memory,
    favoriteScripture: scripture.trim(),
  };

  profile = {
    ...profile,
    favoriteScriptures: [...profile.favoriteScriptures, scripture.trim()],
  };
}

export function recordPrayerMoment() {
  memory = {
    ...memory,
    prayerStreak: memory.prayerStreak + 1,
  };
}

export function recordEncouragementMoment() {
  memory = {
    ...memory,
    encouragementStreak: memory.encouragementStreak + 1,
  };
}

export function saveLastCheckIn(message: string) {
  memory = {
    ...memory,
    lastCheckIn: message,
  };
}

export function buildMemoryGreeting(): string {
  if (memory.conversationCount === 0) {
    return 'Welcome. I am glad you are here today. Tell me what is on your heart.';
  }

  return `Welcome back, ${memory.userName}. Last time, we talked about ${memory.lastHealingTheme}. How has your heart been since then?`;
}