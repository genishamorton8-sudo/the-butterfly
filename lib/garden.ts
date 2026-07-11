import { loadData, removeData, saveData } from './storage';

const GARDEN_KEY = '@butterfly_garden';

export interface GardenData {
  growth: number;
}

export async function getGarden(): Promise<GardenData> {
  const data = await loadData<GardenData>(GARDEN_KEY);
  return data ?? { growth: 0 };
}

export async function saveGarden(garden: GardenData) {
  await saveData(GARDEN_KEY, garden);
}

export async function addGrowth(points: number) {
  const garden = await getGarden();
  garden.growth += points;
  await saveGarden(garden);
  return garden;
}

export async function resetGarden() {
  await removeData(GARDEN_KEY);
}

export function getGardenStage(growth: number) {
  if (growth >= 300) {
    return {
      title: '👑 Flourishing',
      artwork: `☀️

🦋     🦋

🌳 🌸 🌼 🌻 🌳

🌷 😊 🌷

🌿 🌿 🌿 🌿`,
      message: 'Your healing is overflowing into the lives of others.',
      flowers: 20,
      butterflies: 6,
      trees: 2,
    };
  }

  if (growth >= 150) {
    return {
      title: '🦋 Transforming',
      artwork: `☀️

🦋   🦋

🌸 🌷 🌼

😊

🌿 🌿`,
      message: 'Transformation is happening one step at a time.',
      flowers: 10,
      butterflies: 2,
      trees: 1,
    };
  }

  if (growth >= 75) {
    return {
      title: '🌸 Blooming',
      artwork: `🌸 🌷 🌼

😊

🌿 🌿`,
      message: 'Your consistency is producing beautiful growth.',
      flowers: 6,
      butterflies: 0,
      trees: 0,
    };
  }

  if (growth >= 25) {
    return {
      title: '🌱 New Growth',
      artwork: `🌷

😊

🌱`,
      message: 'Your healing journey has begun.',
      flowers: 1,
      butterflies: 0,
      trees: 0,
    };
  }

  return {
    title: '🌰 Seed of Hope',
    artwork: `😊

🌱`,
    message: 'Every beautiful garden begins with one seed.',
    flowers: 0,
    butterflies: 0,
    trees: 0,
  };
}