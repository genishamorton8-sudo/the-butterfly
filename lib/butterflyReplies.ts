import { ExerciseRecommendation } from './butterflyExercises';

export function createButterflyReply(
  text: string,
  recommendation?: ExerciseRecommendation
) {
  const lower = text.toLowerCase();

  if (
    lower.includes('panic') ||
    lower.includes('anxious') ||
    lower.includes('anxiety') ||
    lower.includes('overwhelmed')
  ) {
    return recommendation
      ? 'That sounds heavy. Let us slow this down together. I also have a gentle exercise suggestion for you below.'
      : 'That sounds heavy. Let us slow this down together. Put both feet on the floor if you can. Name one thing you can see, one thing you can touch, and one thing your body needs right now.';
  }

  if (
    lower.includes('sad') ||
    lower.includes('cry') ||
    lower.includes('grief') ||
    lower.includes('miss')
  ) {
    return 'I hear tenderness in that. Grief and sadness can feel like waves. You do not have to fight the wave right now. What part of this hurts the most today?';
  }

  if (
    lower.includes('angry') ||
    lower.includes('mad') ||
    lower.includes('frustrated')
  ) {
    return 'Your anger may be trying to protect something important. Let us listen without judging it. What boundary, need, or truth might your anger be pointing to?';
  }

  if (
    lower.includes('worthless') ||
    lower.includes('not enough') ||
    lower.includes('failure')
  ) {
    return recommendation
      ? 'I am sorry that thought has been so loud. A painful thought is not the same thing as truth. I have a gentle exercise suggestion below that may help.'
      : 'I am sorry that thought has been so loud. A painful thought is not the same thing as truth. What would you say to someone you loved if they were carrying that same thought?';
  }

  if (
    lower.includes('pray') ||
    lower.includes('god') ||
    lower.includes('jesus') ||
    lower.includes('scripture')
  ) {
    return 'We can bring this to God gently. Take a breath and say, “Lord, meet me right here.” What do you need from Him in this moment: peace, wisdom, comfort, courage, or strength?';
  }

  if (recommendation) {
    return 'Thank you for trusting me with that. I hear something important underneath what you shared, and I have a gentle exercise suggestion that may help.';
  }

  return 'Thank you for trusting me with that. Let us take it one piece at a time. What feeling is underneath what you just shared?';
}