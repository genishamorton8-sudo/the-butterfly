export interface HealingMilestone {
  id: number;
  date: string;
  title: string;
  description: string;
  category: string;
}

let milestones: HealingMilestone[] = [];

export function addHealingMilestone(
  title: string,
  description: string,
  category: string
) {
  milestones.unshift({
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    title,
    description,
    category,
  });
}

export function getHealingMilestones(): HealingMilestone[] {
  return milestones;
}

export function getLatestMilestone(): HealingMilestone | null {
  return milestones.length > 0 ? milestones[0] : null;
}

export function getMilestoneCount(): number {
  return milestones.length;
}

export function clearHealingMilestones() {
  milestones = [];
}
