import { HealingTheme, getStrongestTheme } from './healingJourney';

export type AdaptiveRecommendation = {
  exercise: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
};

export function getAdaptiveRecommendation(): AdaptiveRecommendation {
  const theme: HealingTheme = getStrongestTheme();

  switch (theme) {
    case 'Anxiety':
      return {
        exercise: 'Safe Place',
        reason:
          'Anxiety has appeared several times. Strengthening your calming skills can help your nervous system feel safer.',
        priority: 'high',
      };

    case 'Grief':
      return {
        exercise: 'Letters Never Sent',
        reason:
          'Grief has been a recurring part of your journey. Giving those emotions a voice can support healing.',
        priority: 'high',
      };

    case 'Self-Worth':
      return {
        exercise: 'Mirror Truth',
        reason:
          'You have been working on your self-worth. Practicing truth over negative self-talk can build lasting confidence.',
        priority: 'high',
      };

    case 'Identity':
      return {
        exercise: 'Meet Younger Me',
        reason:
          'Exploring your identity often begins by reconnecting with your younger self.',
        priority: 'medium',
      };

    case 'Forgiveness':
      return {
        exercise: 'Letters Never Sent',
        reason:
          'Forgiveness grows through honest expression. Continue giving your heart space to process.',
        priority: 'medium',
      };

    case 'Boundaries':
      return {
        exercise: 'Boundary Reflection',
        reason:
          'Healthy boundaries become stronger through intentional practice.',
        priority: 'medium',
      };

    case 'Purpose':
      return {
        exercise: 'Future Self',
        reason:
          'Your conversations suggest you are thinking about purpose and direction.',
        priority: 'medium',
      };

    case 'Faith':
      return {
        exercise: 'Prayer Reflection',
        reason:
          'Your faith continues to be an important part of your healing journey.',
        priority: 'medium',
      };

    default:
      return {
        exercise: 'Butterfly Reflection',
        reason:
          'Keep building consistency. Healing grows through small, faithful steps.',
        priority: 'low',
      };
  }
}