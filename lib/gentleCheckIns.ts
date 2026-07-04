import { getCompanionMemory, getCompanionProfile } from './butterflyCompanion';

export type GentleCheckIn = {
  title: string;
  message: string;
};

export function buildGentleCheckIn(): GentleCheckIn {
  const memory = getCompanionMemory();
  const profile = getCompanionProfile();

  if (memory.conversationCount === 0) {
    return {
      title: 'Welcome In',
      message: 'I am glad you are here. What has your heart been carrying today?',
    };
  }

  if (profile.victories.length > 0) {
    return {
      title: 'Celebrating You',
      message: `Last time, you shared a victory: "${profile.victories.at(-1)}". How does that progress feel today?`,
    };
  }

  return {
    title: 'Welcome Back',
    message: `Last time, we talked about ${memory.lastHealingTheme}. How has your heart been since then?`,
  };
}