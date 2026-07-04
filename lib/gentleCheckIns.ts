import { getCompanionProfile } from './butterflyCompanion';
import { daysSinceLastConversation } from './conversationContinuity';
import { getHealingJourney, getStrongestTheme } from './healingJourney';

export type GentleCheckIn = {
  title: string;
  message: string;
};

export function buildGentleCheckIn(): GentleCheckIn {
  const journey = getHealingJourney();
  const profile = getCompanionProfile();
  const theme = getStrongestTheme();
  const daysAway = daysSinceLastConversation();

  if (daysAway >= 7) {
    return {
      title: "We've Missed You",
      message:
        "It's been a little while since we talked. Whenever you're ready, I'm here to continue your healing journey with you.",
    };
  }

  if (theme === 'Anxiety') {
    return {
      title: 'Checking In',
      message:
        "You've been working hard on anxiety. How has your heart been feeling since we last talked?",
    };
  }

  if (theme === 'Grief') {
    return {
      title: 'Thinking of You',
      message:
        "Grief can change from day to day. How are you carrying your heart today?",
    };
  }

  if (theme === 'Self-Worth') {
    return {
      title: 'A Gentle Reminder',
      message:
        "Before we begin, remember that your worth has never changed. How have you been speaking to yourself lately?",
    };
  }

  if (profile.victories.length > 0) {
    return {
      title: 'Celebrating Progress',
      message: `I've been thinking about your recent victory: "${profile.victories.at(-1)}". How has that progress continued?`,
    };
  }

  if (journey.totalConversations >= 10) {
    return {
      title: 'Keep Going',
      message:
        "You've built a beautiful habit of showing up. What's been on your heart since we last met?",
    };
  }

  return {
    title: 'Welcome Back',
    message:
      "I'm glad you're here today. What would you like us to work through together?",
  };
}