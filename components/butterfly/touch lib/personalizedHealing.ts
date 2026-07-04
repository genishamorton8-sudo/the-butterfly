import {
    HealingTheme,
    getHealingJourney,
    getStrongestTheme,
} from './healingJourney';

export type PersonalizedHealingPlan = {
  strongestTheme: HealingTheme;
  recommendedExercise: string;
  recommendedScripture: string;
  prayerFocus: string;
  encouragement: string;
};

export function buildHealingPlan(): PersonalizedHealingPlan {
  const journey = getHealingJourney();
  const strongestTheme = getStrongestTheme();

  switch (strongestTheme) {
    case 'Anxiety':
      return {
        strongestTheme,
        recommendedExercise: 'Safe Place',
        recommendedScripture: 'Philippians 4:6-7',
        prayerFocus: 'Peace and trust',
        encouragement:
          'You have continued showing up even when anxiety feels overwhelming. That is courage.',
      };

    case 'Grief':
      return {
        strongestTheme,
        recommendedExercise: 'Letters Never Sent',
        recommendedScripture: 'Psalm 34:18',
        prayerFocus: 'Comfort and healing',
        encouragement:
          'Healing from grief is not forgetting. Every conversation is another step forward.',
      };

    case 'Self-Worth':
      return {
        strongestTheme,
        recommendedExercise: 'Mirror Truth',
        recommendedScripture: 'Ephesians 2:10',
        prayerFocus: 'Identity in Christ',
        encouragement:
          'Your worth has never depended on your mistakes. You are learning to see yourself differently.',
      };

    case 'Forgiveness':
      return {
        strongestTheme,
        recommendedExercise: 'Letters Never Sent',
        recommendedScripture: 'Colossians 3:13',
        prayerFocus: 'Freedom',
        encouragement:
          'Forgiveness is a journey, not a single decision. Keep taking one step at a time.',
      };

    case 'Faith':
      return {
        strongestTheme,
        recommendedExercise: 'Prayer Reflection',
        recommendedScripture: 'Proverbs 3:5-6',
        prayerFocus: 'Trusting God',
        encouragement:
          'Your faith continues to be a foundation for your healing journey.',
      };

    default:
      return {
        strongestTheme,
        recommendedExercise: 'Butterfly Reflection',
        recommendedScripture: 'Philippians 1:6',
        prayerFocus: 'Daily growth',
        encouragement:
          `You've completed ${journey.totalConversations} healing conversations. Keep going. Healing happens one honest conversation at a time.`,
      };
  }
}