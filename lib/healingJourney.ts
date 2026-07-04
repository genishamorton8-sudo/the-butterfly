export type JourneyStage =
  | 'Beginning'
  | 'Growing'
  | 'Healing'
  | 'Thriving';

export interface HealingJourney {
  stage: JourneyStage;
  totalCheckIns: number;
  totalConversations: number;
  totalPrayers: number;
  totalJournalEntries: number;
  dominantTheme: string;
}

let journey: HealingJourney = {
  stage: 'Beginning',
  totalCheckIns: 0,
  totalConversations: 0,
  totalPrayers: 0,
  totalJournalEntries: 0,
  dominantTheme: 'none',
};

export function getHealingJourney(): HealingJourney {
  return journey;
}

export function getStrongestTheme(): string {
  return journey.dominantTheme;
}

export function recordCheckIn(theme: string) {
  journey = {
    ...journey,
    totalCheckIns: journey.totalCheckIns + 1,
    totalConversations: journey.totalConversations + 1,
    dominantTheme: theme,
  };

  updateJourneyStage();
}

export function recordConversation(theme: string) {
  journey = {
    ...journey,
    totalConversations: journey.totalConversations + 1,
    dominantTheme: theme,
  };

  updateJourneyStage();
}

export function recordPrayer() {
  journey = {
    ...journey,
    totalPrayers: journey.totalPrayers + 1,
  };

  updateJourneyStage();
}

export function recordJournalEntry() {
  journey = {
    ...journey,
    totalJournalEntries: journey.totalJournalEntries + 1,
  };

  updateJourneyStage();
}

function updateJourneyStage() {
  const score =
    journey.totalCheckIns +
    journey.totalConversations +
    journey.totalPrayers +
    journey.totalJournalEntries;

  if (score >= 100) {
    journey.stage = 'Thriving';
  } else if (score >= 50) {
    journey.stage = 'Healing';
  } else if (score >= 15) {
    journey.stage = 'Growing';
  } else {
    journey.stage = 'Beginning';
  }
}

export function buildJourneyMessage(): string {
  switch (journey.stage) {
    case 'Beginning':
      return 'Every healing journey starts with one honest step. Thank you for beginning yours.';

    case 'Growing':
      return 'You are building healthy habits. Growth may feel slow, but it is happening.';

    case 'Healing':
      return 'Your consistency is creating real change. Keep leaning into the healing process.';

    case 'Thriving':
      return 'Look how far you have come. Continue walking in freedom and helping others find hope.';

    default:
      return 'Keep moving forward one day at a time.';
  }
}