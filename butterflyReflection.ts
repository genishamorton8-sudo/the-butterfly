import { getDailyPrinciple } from './butterflyPrinciples';
import { getSessionMemory } from './butterflySessionMemory';
import {
    getButterflyEncouragement,
    getButterflyGreeting,
} from './butterflyVoice';
import { getLatestMilestone } from './healingMilestones';

export function getDailyButterflyReflection(userName?: string) {
  const memory = getSessionMemory();
  const latestMilestone = getLatestMilestone();
  const principle = getDailyPrinciple();

  const greeting = getButterflyGreeting({
    userName,
  });

  const encouragement = getButterflyEncouragement({
    theme: memory.favoriteHealingTheme ?? 'your healing journey',
  });

  const latestWin = latestMilestone
    ? `Your latest healing win: ${latestMilestone.title}.`
    : 'Your healing wins will begin showing here as you keep taking gentle steps.';

  const lastEmotion = memory.lastEmotion
    ? `Last time, you worked through ${memory.lastEmotion}.`
    : 'Butterfly is ready to walk with you as you begin noticing what your heart needs.';

  return `${greeting}

${lastEmotion}

${latestWin}

${encouragement}

Today’s Butterfly Principle:
${principle.title}

${principle.description}`;
}