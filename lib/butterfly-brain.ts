export type HealingTheme =
  | 'fear'
  | 'anxiety'
  | 'grief'
  | 'shame'
  | 'anger'
  | 'identity'
  | 'loneliness'
  | 'forgiveness'
  | 'hope'
  | 'purpose'
  | 'none';

export interface BrainResult {
  theme: HealingTheme;
  recommendation: string;
  scripture: string;
  prayer: string;
}

export function butterflyBrain(text: string): BrainResult {
  const words = text.toLowerCase();

  if (
    words.includes('fear') ||
    words.includes('afraid') ||
    words.includes('scared') ||
    words.includes('anxious') ||
    words.includes('anxiety') ||
    words.includes('worried')
  ) {
    return {
      theme: 'fear',
      recommendation: 'Prayer Room',
      scripture: 'Isaiah 41:10',
      prayer: 'Pray for courage and peace.',
    };
  }

  if (
    words.includes('grief') ||
    words.includes('loss') ||
    words.includes('died') ||
    words.includes('death') ||
    words.includes('miss')
  ) {
    return {
      theme: 'grief',
      recommendation: 'Journal',
      scripture: 'Psalm 34:18',
      prayer: 'Pray for comfort.',
    };
  }

  if (
    words.includes('ashamed') ||
    words.includes('worthless') ||
    words.includes('not enough') ||
    words.includes('shame')
  ) {
    return {
      theme: 'shame',
      recommendation: 'Rewrite the Scene',
      scripture: 'Romans 8:1',
      prayer: 'Pray for freedom from shame.',
    };
  }

  if (
    words.includes('angry') ||
    words.includes('mad') ||
    words.includes('resent') ||
    words.includes('offended')
  ) {
    return {
      theme: 'anger',
      recommendation: 'Change the Thought',
      scripture: 'Ephesians 4:31-32',
      prayer: 'Pray for forgiveness and wisdom.',
    };
  }

  if (
    words.includes('alone') ||
    words.includes('lonely') ||
    words.includes('rejected')
  ) {
    return {
      theme: 'loneliness',
      recommendation: 'Butterfly Partner',
      scripture: 'Deuteronomy 31:6',
      prayer: "Pray for God's presence and healthy relationships.",
    };
  }

  if (
    words.includes('purpose') ||
    words.includes('calling')
  ) {
    return {
      theme: 'purpose',
      recommendation: 'Scripture Vault',
      scripture: 'Jeremiah 29:11',
      prayer: 'Pray for wisdom and direction.',
    };
  }

  return {
    theme: 'none',
    recommendation: 'Butterfly Path',
    scripture: 'Psalm 46:10',
    prayer: 'Spend a few quiet moments with God today.',
  };
}