import { getHealingJourney } from './healingJourney';

export type GrowthCelebration = {
  title: string;
  message: string;
  celebrationLevel: 'small' | 'medium' | 'major';
};

export function checkGrowthCelebration(): GrowthCelebration | null {
  const journey = getHealingJourney();

  if (journey.totalConversations === 1) {
    return {
      title: 'Your First Step',
      message:
        'Beginning takes courage. Thank you for trusting Butterfly with your healing journey.',
      celebrationLevel: 'small',
    };
  }

  if (journey.totalConversations === 5) {
    return {
      title: 'Consistency Matters',
      message:
        'Five honest conversations is a meaningful milestone. Healing grows through consistency.',
      celebrationLevel: 'medium',
    };
  }

  if (journey.totalConversations === 10) {
    return {
      title: 'Growing Stronger',
      message:
        "You've now completed ten healing conversations. The fact that you keep showing up says a lot about your courage.",
      celebrationLevel: 'major',
    };
  }

  if (journey.totalConversations === 25) {
    return {
      title: 'Deep Roots',
      message:
        'Twenty-five conversations represent more than numbers. They represent perseverance, honesty, and hope.',
      celebrationLevel: 'major',
    };
  }

  if (journey.totalExercises === 10) {
    return {
      title: 'Practicing Healing',
      message:
        "You've consistently practiced your healing exercises. Small actions repeated over time create lasting change.",
      celebrationLevel: 'medium',
    };
  }

  if (journey.totalPrayers === 10) {
    return {
      title: 'A Faithful Heart',
      message:
        "You've continued bringing your heart before God. May His peace continue to strengthen you.",
      celebrationLevel: 'medium',
    };
  }

  return null;
}

export function buildGrowthReflection(): string {
  const journey = getHealingJourney();

  if (journey.totalConversations < 5) {
    return 'Healing begins with honesty. Every conversation is another step forward.';
  }

  if (journey.totalConversations < 15) {
    return "You're building a healthy rhythm. Consistency is becoming part of your healing story.";
  }

  if (journey.totalConversations < 30) {
    return "You've come farther than you may realize. Growth often happens quietly before we notice it.";
  }

  return "Your healing journey reflects resilience, courage, and hope. Keep becoming the person you're growing into.";
}