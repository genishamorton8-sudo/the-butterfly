export type ButterflyTone =
  | 'gentle'
  | 'encouraging'
  | 'prayerful'
  | 'reflective'
  | 'celebratory';

export type ButterflyVoiceInput = {
  userName?: string;
  tone?: ButterflyTone;
  theme?: string;
  emotion?: string;
  need?: string;
};

export function getButterflyGreeting(
  input: ButterflyVoiceInput = {}
): string {
  const name = input.userName ?? 'friend';
  return `Welcome back, ${name}. I am glad you are here.`;
}

export function getButterflyReflection(
  input: ButterflyVoiceInput = {}
): string {
  const emotion = input.emotion ?? 'what you have been carrying';
  const need = input.need ?? 'care and safety';

  return `Today, you gave attention to ${emotion}. That matters. Your need for ${need} is not too much. Healing begins when you stop ignoring what your heart has been trying to say.`;
}

export function getButterflyEncouragement(
  input: ButterflyVoiceInput = {}
): string {
  const theme = input.theme ?? 'healing';

  return `You do not have to finish ${theme} today. You only have to take the next honest step. Small steps still count.`;
}

export function getButterflyCelebration(
  input: ButterflyVoiceInput = {}
): string {
  const theme = input.theme ?? 'your healing journey';

  return `This is worth celebrating. You showed up for ${theme}, and that is a brave thing to do.`;
}

export function getButterflyPrayer(
  input: ButterflyVoiceInput = {}
): string {
  const emotion = input.emotion ?? 'what feels heavy';

  return `Lord, meet this heart with gentleness. Bring peace into ${emotion}, and remind them that they are not alone. Give them strength for the next step. Amen.`;
}

export function getButterflyClosing(
  input: ButterflyVoiceInput = {}
): string {
  const tone = input.tone ?? 'gentle';

  if (tone === 'celebratory') {
    return 'You made it through this step. That is a victory.';
  }

  if (tone === 'prayerful') {
    return 'Take a breath. God is near, and you are not walking alone.';
  }

  if (tone === 'reflective') {
    return 'Let this moment settle. You listened to your heart today.';
  }

  if (tone === 'encouraging') {
    return 'Keep going gently. You are making progress, even when it feels small.';
  }

  return 'Be gentle with yourself. We can take the next step together.';
}