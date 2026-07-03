export type ExerciseRecommendation = {
  title: string;
  description: string;
  route: string;
  icon: string;
};

export function getExerciseRecommendation(
  text: string
): ExerciseRecommendation | undefined {
  const lower = text.toLowerCase();

  if (
    lower.includes('panic') ||
    lower.includes('anxious') ||
    lower.includes('anxiety') ||
    lower.includes('overwhelmed') ||
    lower.includes('scared') ||
    lower.includes('afraid') ||
    lower.includes('unsafe')
  ) {
    return {
      title: 'Safe Place',
      description:
        'This may help your body and mind slow down by creating a peaceful place you can return to anytime.',
      route: '/(tabs)/safe-place',
      icon: 'home-heart',
    };
  }

  if (
    lower.includes('childhood') ||
    lower.includes('younger') ||
    lower.includes('little me') ||
    lower.includes('when i was a child') ||
    lower.includes('inner child')
  ) {
    return {
      title: 'Meet Younger Me',
      description:
        'This exercise helps you comfort and reconnect with the younger version of yourself.',
      route: '/(tabs)/meet-younger-me',
      icon: 'human-child',
    };
  }

  if (
    lower.includes('memory') ||
    lower.includes('reminded me') ||
    lower.includes('triggered') ||
    lower.includes('old hurt') ||
    lower.includes('past') ||
    lower.includes('trauma')
  ) {
    return {
      title: 'Rewrite the Scene',
      description:
        'This exercise can help you revisit an older painful memory with safety, compassion, truth, and hope.',
      route: '/(tabs)/rewrite-scene',
      icon: 'movie-edit',
    };
  }

  if (
    lower.includes('not enough') ||
    lower.includes('worthless') ||
    lower.includes('failure') ||
    lower.includes('rejected') ||
    lower.includes('unlovable') ||
    lower.includes('hate myself') ||
    lower.includes('i am nothing')
  ) {
    return {
      title: 'Mirror Truth',
      description:
        'This exercise helps you notice a painful lie and replace it with truth.',
      route: '/(tabs)/mirror-truth',
      icon: 'mirror',
    };
  }

  if (
    lower.includes('never said') ||
    lower.includes('letter') ||
    lower.includes('i wish i could tell') ||
    lower.includes('unsaid') ||
    lower.includes('closure') ||
    lower.includes('apology')
  ) {
    return {
      title: 'Letters Never Sent',
      description:
        'This exercise gives your heart room to say what it has been carrying without pressure to send it.',
      route: '/(tabs)/letters-never-sent',
      icon: 'email-outline',
    };
  }

  if (
    lower.includes('future') ||
    lower.includes('become') ||
    lower.includes('better version') ||
    lower.includes('hope') ||
    lower.includes('next step') ||
    lower.includes('purpose')
  ) {
    return {
      title: 'Future Self',
      description:
        'This exercise helps you meet the healed version of you and take one step toward her.',
      route: '/(tabs)/future-self',
      icon: 'star-four-points',
    };
  }

  if (
    lower.includes('thinking') ||
    lower.includes('thought') ||
    lower.includes("can't stop thinking") ||
    lower.includes('can’t stop thinking') ||
    lower.includes('spiraling') ||
    lower.includes('overthinking')
  ) {
    return {
      title: 'Change the Thought',
      description:
        'This exercise helps you name the painful thought and choose a healthier truth.',
      route: '/(tabs)/change-the-thought',
      icon: 'brain',
    };
  }

  return undefined;
}