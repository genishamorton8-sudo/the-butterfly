export type ButterflyResponse = {
  reply: string;
  prayer?: string;
  scripture?: string;
  healingFocus?: string;
};

export function processButterflyMessage(
  message: string
): ButterflyResponse {
  const lower = message.toLowerCase();

  if (
    lower.includes('anxious') ||
    lower.includes('anxiety') ||
    lower.includes('worried')
  ) {
    return {
      reply:
        'It sounds like anxiety may be weighing on your heart today. Thank you for sharing that with me.',
      healingFocus: 'Anxiety',
      scripture: 'Philippians 4:6-7',
      prayer:
        'Father, quiet every anxious thought and surround me with Your peace today.',
    };
  }

  if (
    lower.includes('sad') ||
    lower.includes('grief') ||
    lower.includes('loss')
  ) {
    return {
      reply:
        'Grief can be heavy. You do not have to carry it alone.',
      healingFocus: 'Grief',
      scripture: 'Psalm 34:18',
      prayer:
        'Lord, stay close to my broken heart and remind me that You never leave me.',
    };
  }

    return {
    reply:
      'Thank you for trusting me with that. I am listening, and we will take this one step at a time.',
    healingFocus: 'General Healing',
    scripture: 'Philippians 1:6',
    prayer:
      'Father, continue the good work You have started in me.',
  };
}