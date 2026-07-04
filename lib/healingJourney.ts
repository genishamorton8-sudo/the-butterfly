export type HealingTheme =
  | 'Anxiety'
  | 'Grief'
  | 'Identity'
  | 'Forgiveness'
  | 'Shame'
  | 'Boundaries'
  | 'Purpose'
  | 'Relationships'
  | 'Faith'
  | 'Self-Worth'
  | 'Unknown';

export type HealingJourney = {
  totalConversations: number;
  totalExercises: number;
  totalPrayers: number;
  themes: Record<HealingTheme, number>;
  lastTheme: HealingTheme;
  updatedAt: string;
};

let journey: HealingJourney = {
  totalConversations: 0,
  totalExercises: 0,
  totalPrayers: 0,
  themes: {
    Anxiety: 0,
    Grief: 0,
    Identity: 0,
    Forgiveness: 0,
    Shame: 0,
    Boundaries: 0,
    Purpose: 0,
    Relationships: 0,
    Faith: 0,
    'Self-Worth': 0,
    Unknown: 0,
  },
  lastTheme: 'Unknown',
  updatedAt: new Date().toISOString(),
};

export function getHealingJourney() {
  return journey;
}

export function recordHealingTheme(theme: HealingTheme) {
  journey.totalConversations += 1;
  journey.themes[theme] += 1;
  journey.lastTheme = theme;
  journey.updatedAt = new Date().toISOString();
}

export function recordExerciseCompleted() {
  journey.totalExercises += 1;
  journey.updatedAt = new Date().toISOString();
}

export function recordPrayerCompleted() {
  journey.totalPrayers += 1;
  journey.updatedAt = new Date().toISOString();
}

export function getStrongestTheme(): HealingTheme {
  let strongest: HealingTheme = 'Unknown';
  let highest = 0;

  Object.entries(journey.themes).forEach(([theme, count]) => {
    if (count > highest) {
      highest = count;
      strongest = theme as HealingTheme;
    }
  });

  return strongest;
}