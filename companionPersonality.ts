export type CompanionTone =
  | 'gentle'
  | 'encouraging'
  | 'spiritual'
  | 'grounding';

export function getCompanionPersonalityIntro(tone: CompanionTone = 'gentle') {
  switch (tone) {
    case 'encouraging':
      return 'I am here with you. You do not have to have all the answers today. One honest step is enough.';

    case 'spiritual':
      return 'I am here with you. We can slow down, breathe, and invite God into this moment together.';

    case 'grounding':
      return 'I am here with you. Let us come back to this moment slowly and gently.';

    default:
      return 'I am here with you. You are safe to be honest here.';
  }
}

export function shapeButterflyResponse(message: string, tone: CompanionTone = 'gentle') {
  const intro = getCompanionPersonalityIntro(tone);

  return `${intro} ${message}`;
}