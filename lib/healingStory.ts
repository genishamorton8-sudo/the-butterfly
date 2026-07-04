import { getHealingJourney, getStrongestTheme } from './healingJourney';

export type HealingStory = {
  title: string;
  summary: string;
};

export function buildHealingStory(): HealingStory {
  const journey = getHealingJourney();
  const strongestTheme = getStrongestTheme();

  let stage = 'Beginning';

  if (journey.totalConversations >= 5) {
    stage = 'Growing';
  }

  if (journey.totalConversations >= 15) {
    stage = 'Strengthening';
  }

  if (journey.totalConversations >= 30) {
    stage = 'Thriving';
  }

  return {
    title: `${stage} Your Healing Journey`,
    summary: `You have completed ${journey.totalConversations} healing conversations. Your strongest healing focus has been ${strongestTheme}. Every honest conversation, prayer, and exercise is helping shape your story. Healing is not about perfection—it's about continuing to move forward one step at a time.`,
  };
}