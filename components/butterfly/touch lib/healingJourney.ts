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
  journey.totalConversations++;

  journey.themes[theme]++;

  journey.lastTheme = theme;

  journey.updatedAt = new Date().toISOString();
}

export function recordExerciseCompleted() {
  journey.totalExercises++;

  journey.updatedAt = new Date().toISOString();
}

export function recordPrayerCompleted() {
  journey.totalPrayers++;

  journey.updatedAt = new Date().toISOString();
}

export function detectHealingTheme(text: string): HealingTheme {
  const input = text.toLowerCase();

  if (
    input.includes('anxiety') ||
    input.includes('panic') ||
    input.includes('worried') ||
    input.includes('overwhelmed')
  ) {
    return 'Anxiety';
  }

  if (
    input.includes('grief') ||
    input.includes('loss') ||
    input.includes('funeral') ||
    input.includes('miss')
  ) {
    return 'Grief';
  }

  if (
    input.includes('forgive') ||
    input.includes('resentment') ||
    input.includes('bitterness')
  ) {
    return 'Forgiveness';
  }

  if (
    input.includes('ashamed') ||
    input.includes('guilty') ||
    input.includes('embarrassed')
  ) {
    return 'Shame';
  }

  if (
    input.includes('purpose') ||
    input.includes('calling') ||
    input.includes('destiny')
  ) {
    return 'Purpose';
  }

  if (
    input.includes('relationship') ||
    input.includes('marriage') ||
    input.includes('friend')
  ) {
    return 'Relationships';
  }

  if (
    input.includes('boundary') ||
    input.includes('people pleasing')
  ) {
    return 'Boundaries';
  }

  if (
    input.includes('worthless') ||
    input.includes('not enough') ||
    input.includes('failure')
  ) {
    return 'Self-Worth';
  }

  if (
    input.includes('god') ||
    input.includes('jesus') ||
    input.includes('faith') ||
    input.includes('church')
  ) {
    return 'Faith';
  }

  if (
    input.includes('who am i') ||
    input.includes('identity')
  ) {
    return 'Identity';
  }

  return 'Unknown';
}

export function getStrongestTheme(): HealingTheme {
  let strongest: HealingTheme = 'Unknown';
  let highest = 0;

  Object.entries(journey.themes).forEach(([theme, value]) => {
    if (value > highest) {
      highest = value;
      strongest = theme as HealingTheme;
    }
  });

  return strongest;
}

export function getJourneyInsight() {
  const strongest = getStrongestTheme();

  switch (strongest) {
    case 'Anxiety':
      return "I've noticed anxiety has come up several times. You're making progress by continuing to face it instead of avoiding it.";

    case 'Grief':
      return "Your healing journey has included grief. Healing doesn't mean forgetting. It means learning to carry love and loss together.";

    case 'Self-Worth':
      return "I've noticed you've been questioning your worth. Remember, painful thoughts are not permanent truths.";

    case 'Forgiveness':
      return "Forgiveness has been a recurring part of your journey. That takes courage.";

    case 'Faith':
      return "Your faith continues to be part of your healing story. Keep leaning into it.";

    default:
      return "Every conversation is another step forward. Healing happens one honest moment at a time.";
  }
}