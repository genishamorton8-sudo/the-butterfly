export type HealingMilestone =
  | 'FIRST_CONVERSATION'
  | 'FIRST_PRAYER'
  | 'FIRST_EXERCISE'
  | 'FIVE_CONVERSATIONS'
  | 'TEN_CONVERSATIONS'
  | 'TWENTY_FIVE_CONVERSATIONS'
  | 'FIFTY_CONVERSATIONS'
  | 'ONE_HUNDRED_CONVERSATIONS';

type MilestoneRecord = {
  id: HealingMilestone;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
};

const milestones: Record<HealingMilestone, MilestoneRecord> = {
  FIRST_CONVERSATION: {
    id: 'FIRST_CONVERSATION',
    title: 'First Step',
    description: 'You began your healing journey.',
    unlocked: false,
  },

  FIRST_PRAYER: {
    id: 'FIRST_PRAYER',
    title: 'A Prayer Begins',
    description: 'You invited God into your healing.',
    unlocked: false,
  },

  FIRST_EXERCISE: {
    id: 'FIRST_EXERCISE',
    title: 'Healing in Motion',
    description: 'You completed your first healing exercise.',
    unlocked: false,
  },

  FIVE_CONVERSATIONS: {
    id: 'FIVE_CONVERSATIONS',
    title: 'Keep Going',
    description: 'Five conversations is a beautiful beginning.',
    unlocked: false,
  },

  TEN_CONVERSATIONS: {
    id: 'TEN_CONVERSATIONS',
    title: 'Growing Stronger',
    description: 'Ten conversations completed.',
    unlocked: false,
  },

  TWENTY_FIVE_CONVERSATIONS: {
    id: 'TWENTY_FIVE_CONVERSATIONS',
    title: 'Deep Roots',
    description: 'Twenty-five healing conversations completed.',
    unlocked: false,
  },

  FIFTY_CONVERSATIONS: {
    id: 'FIFTY_CONVERSATIONS',
    title: 'Transformation',
    description: 'Fifty conversations completed.',
    unlocked: false,
  },

  ONE_HUNDRED_CONVERSATIONS: {
    id: 'ONE_HUNDRED_CONVERSATIONS',
    title: 'Butterfly',
    description: 'One hundred healing conversations completed.',
    unlocked: false,
  },
};

export function unlockMilestone(id: HealingMilestone) {
  const milestone = milestones[id];

  if (!milestone.unlocked) {
    milestone.unlocked = true;
    milestone.unlockedAt = new Date().toISOString();
  }

  return milestone;
}

export function getUnlockedMilestones() {
  return Object.values(milestones).filter(
    milestone => milestone.unlocked
  );
}

export function getNextMilestone() {
  return Object.values(milestones).find(
    milestone => !milestone.unlocked
  );
}

export function getAllMilestones() {
  return Object.values(milestones);
}
