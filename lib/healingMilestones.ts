import { loadData, saveData } from './storage';

export interface HealingMilestone {
  id: number;
  date: string;
  title: string;
  description: string;
  category: string;
}

const MILESTONES_KEY = 'butterfly_healing_milestones';

let milestones: HealingMilestone[] = [];
let hydrated = false;

// Loads any previously saved milestones from disk into the in-memory
// cache. Call this once, early in the app lifecycle (e.g. after login),
// before any screen reads getHealingMilestones(). Reads stay synchronous
// for callers; this is what makes milestones survive an app restart.
export async function hydrateHealingMilestones(): Promise<void> {
  if (hydrated) return;

  const saved = await loadData<HealingMilestone[]>(MILESTONES_KEY);

  if (saved) {
    milestones = saved;
  }

  hydrated = true;
}

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

  saveData(MILESTONES_KEY, milestones);
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

  saveData(MILESTONES_KEY, milestones);
}
