export type DetectedEmotion =
  | 'overwhelmed'
  | 'anxious'
  | 'sad'
  | 'grieving'
  | 'angry'
  | 'ashamed'
  | 'lonely'
  | 'afraid'
  | 'hopeful'
  | 'joyful'
  | 'unknown';

export function detectEmotion(text: string): DetectedEmotion {
  const input = text.toLowerCase();

  if (
    input.includes('overwhelmed') ||
    input.includes('too much') ||
    input.includes('burned out') ||
    input.includes('exhausted')
  ) {
    return 'overwhelmed';
  }

  if (
    input.includes('anxious') ||
    input.includes('anxiety') ||
    input.includes('panic') ||
    input.includes('worried') ||
    input.includes('nervous')
  ) {
    return 'anxious';
  }

  if (
    input.includes('sad') ||
    input.includes('cry') ||
    input.includes('depressed') ||
    input.includes('down')
  ) {
    return 'sad';
  }

  if (
    input.includes('grief') ||
    input.includes('grieving') ||
    input.includes('loss') ||
    input.includes('miss them')
  ) {
    return 'grieving';
  }

  if (
    input.includes('angry') ||
    input.includes('mad') ||
    input.includes('furious') ||
    input.includes('frustrated')
  ) {
    return 'angry';
  }

  if (
    input.includes('ashamed') ||
    input.includes('guilty') ||
    input.includes('embarrassed')
  ) {
    return 'ashamed';
  }

  if (
    input.includes('alone') ||
    input.includes('lonely') ||
    input.includes('nobody')
  ) {
    return 'lonely';
  }

  if (
    input.includes('afraid') ||
    input.includes('scared') ||
    input.includes('fear')
  ) {
    return 'afraid';
  }

  if (
    input.includes('hope') ||
    input.includes('healing') ||
    input.includes('better')
  ) {
    return 'hopeful';
  }

  if (
    input.includes('happy') ||
    input.includes('joy') ||
    input.includes('peaceful') ||
    input.includes('excited')
  ) {
    return 'joyful';
  }

  return 'unknown';
}