import { getHealingJourney } from './healingJourney';

export type HealingMomentum = {
  score: number;
  level: string;
  message: string;
};

export function getHealingMomentum(): HealingMomentum {
  const journey = getHealingJourney();

  let score =
    journey.totalConversations * 5 +
    journey.totalExercises * 10 +
    journey.totalPrayers * 8;

  if (score > 100) {
    score = 100;
  }

  if (score >= 80) {
    return {
      score,
      level: 'Thriving',
      message:
        'Your consistency is building lasting healing. Keep taking one faithful step at a time.',
    };
  }

  if (score >= 60) {
    return {
      score,
      level: 'Growing',
      message:
        'You are building healthy habits. Healing takes time, and you are making meaningful progress.',
    };
  }

  if (score >= 40) {
    return {
      score,
      level: 'Steady',
      message:
        'You are showing up, and that matters. Every conversation is another step toward healing.',
    };
  }

  if (score >= 20) {
    return {
      score,
      level: 'Beginning',
      message:
        'Every journey starts with a first step. Thank you for trusting Butterfly with your healing.',
    };
  }

  return {
    score,
    level: 'Starting',
    message:
      'Welcome. Healing is not about perfection. It begins with honesty, and you have already begun.',
  };
}