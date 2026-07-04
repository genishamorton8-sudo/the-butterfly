export type HealingTheme =
  | 'fear'
  | 'anxiety'
  | 'grief'
  | 'shame'
  | 'anger'
  | 'identity'
  | 'loneliness'
  | 'forgiveness'
  | 'hope'
  | 'purpose'
  | 'none';

export interface BrainResult {
  theme: HealingTheme;
  compassionateResponse: string;
  encouragement: string;
  recommendation: string;
  scripture: string;
  prayer: string;
  nextStep: string;
}

export function butterflyBrain(text: string): BrainResult {
  const words = text.toLowerCase();

  if (
    words.includes('fear') ||
    words.includes('afraid') ||
    words.includes('scared')
  ) {
    return {
      theme: 'fear',
      compassionateResponse:
        'Thank you for trusting me with that. It sounds like fear has been speaking loudly today, but fear does not get the final word over your life.',
      encouragement:
        'You do not have to be brave all at once. One small step with God is still courage.',
      recommendation: 'Prayer Room',
      scripture: 'Isaiah 41:10',
      prayer:
        'Father, quiet fear in my heart. Help me remember that You are with me, strengthening me, and holding me up.',
      nextStep:
        'Take three slow breaths and write down one thing you need God to help you face today.',
    };
  }

  if (
    words.includes('anxious') ||
    words.includes('anxiety') ||
    words.includes('worried') ||
    words.includes('overthinking')
  ) {
    return {
      theme: 'anxiety',
      compassionateResponse:
        'It sounds like your mind has been carrying a lot. Anxiety can make everything feel urgent, but you are allowed to slow down.',
      encouragement:
        'You are not behind. You are not failing. You are learning how to breathe again.',
      recommendation: 'Change the Thought',
      scripture: 'Philippians 4:6-7',
      prayer:
        'Lord, help me release what I cannot control. Let Your peace guard my heart and mind today.',
      nextStep:
        'Name the thought that is troubling you, then ask: is this thought helping me heal or keeping me afraid?',
    };
  }

  if (
    words.includes('grief') ||
    words.includes('loss') ||
    words.includes('died') ||
    words.includes('death') ||
    words.includes('miss')
  ) {
    return {
      theme: 'grief',
      compassionateResponse:
        'Grief can feel heavy because love was real. You do not have to rush your heart through this.',
      encouragement:
        'Missing someone does not mean you are weak. It means your heart remembers love.',
      recommendation: 'Journal',
      scripture: 'Psalm 34:18',
      prayer:
        'Lord, stay close to my broken heart. Comfort me in the places words cannot reach.',
      nextStep:
        'Write one sentence beginning with: Today, what I miss most is...',
    };
  }

  if (
    words.includes('ashamed') ||
    words.includes('worthless') ||
    words.includes('not enough') ||
    words.includes('shame')
  ) {
    return {
      theme: 'shame',
      compassionateResponse:
        'Shame tries to make you believe your worst moment is your whole identity. It is not.',
      encouragement:
        'You are still worthy of love, healing, and a future.',
      recommendation: 'Rewrite the Scene',
      scripture: 'Romans 8:1',
      prayer:
        'Father, help me receive freedom from shame. Remind me that there is no condemnation in Christ.',
      nextStep:
        'Write down the shame statement, then rewrite it as a truth statement.',
    };
  }

  if (
    words.includes('angry') ||
    words.includes('mad') ||
    words.includes('resent') ||
    words.includes('offended')
  ) {
    return {
      theme: 'anger',
      compassionateResponse:
        'Anger often shows up when something mattered, hurt, or felt unfair. Let us listen to it without letting it lead.',
      encouragement:
        'You can feel anger without becoming controlled by it.',
      recommendation: 'Change the Thought',
      scripture: 'Ephesians 4:31-32',
      prayer:
        'Lord, help me process anger with wisdom. Show me what needs healing, boundaries, or release.',
      nextStep:
        'Ask yourself: what hurt is underneath this anger?',
    };
  }

  if (
    words.includes('alone') ||
    words.includes('lonely') ||
    words.includes('rejected')
  ) {
    return {
      theme: 'loneliness',
      compassionateResponse:
        'Feeling alone can make the heart feel invisible. But your presence matters, and your story still matters.',
      encouragement:
        'You are not too much. You are not forgotten. You are worthy of safe connection.',
      recommendation: 'Butterfly Partner',
      scripture: 'Deuteronomy 31:6',
      prayer:
        'God, remind me that You are near. Lead me toward healthy people, safe support, and meaningful connection.',
      nextStep:
        'Reach out to one safe person or write one honest sentence about what you need.',
    };
  }

  if (
    words.includes('purpose') ||
    words.includes('calling') ||
    words.includes('direction')
  ) {
    return {
      theme: 'purpose',
      compassionateResponse:
        'It sounds like you are searching for direction. That can feel confusing, but searching does not mean you are lost.',
      encouragement:
        'Purpose often unfolds one obedient step at a time.',
      recommendation: 'Scripture Vault',
      scripture: 'Jeremiah 29:11',
      prayer:
        'Lord, guide my steps. Help me trust Your timing and recognize the doors You are opening.',
      nextStep:
        'Write down one gift, one burden, and one next step you sense God highlighting.',
    };
  }

  return {
    theme: 'none',
    compassionateResponse:
      'Thank you for sharing that with me. I am listening, and we can take this one honest step at a time.',
    encouragement:
      'You do not have to have everything figured out today.',
    recommendation: 'Butterfly Path',
    scripture: 'Psalm 46:10',
    prayer:
      'Lord, help me slow down, breathe, and notice what my heart needs today.',
    nextStep:
      'Pause for one minute and ask yourself: what am I really feeling right now?',
  };
}