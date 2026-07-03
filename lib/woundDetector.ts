export type HealingWound =
  | 'abandonment'
  | 'rejection'
  | 'shame'
  | 'betrayal'
  | 'grief'
  | 'fear'
  | 'perfectionism'
  | 'people_pleasing'
  | 'identity'
  | 'control'
  | 'trust'
  | 'loneliness'
  | 'burnout'
  | 'spiritual_dryness'
  | 'unknown';

export function detectHealingWound(text: string): HealingWound {
  const input = text.toLowerCase();

  if (
    input.includes('everyone leaves') ||
    input.includes('left me') ||
    input.includes('abandoned') ||
    input.includes('nobody stays')
  ) {
    return 'abandonment';
  }

  if (
    input.includes('rejected') ||
    input.includes("don't want me") ||
    input.includes('not chosen') ||
    input.includes('not accepted')
  ) {
    return 'rejection';
  }

  if (
    input.includes('ashamed') ||
    input.includes('broken') ||
    input.includes('i hate myself')
  ) {
    return 'shame';
  }

  if (
    input.includes('betrayed') ||
    input.includes('lied to') ||
    input.includes('cheated') ||
    input.includes('backstabbed')
  ) {
    return 'betrayal';
  }

  if (
    input.includes('died') ||
    input.includes('loss') ||
    input.includes('funeral') ||
    input.includes('grieving') ||
    input.includes('miss them')
  ) {
    return 'grief';
  }

  if (
    input.includes('afraid') ||
    input.includes('terrified') ||
    input.includes('fear') ||
    input.includes('panic')
  ) {
    return 'fear';
  }

  if (
    input.includes('perfect') ||
    input.includes('never enough') ||
    input.includes('failed again')
  ) {
    return 'perfectionism';
  }

  if (
    input.includes('make everyone happy') ||
    input.includes("can't say no") ||
    input.includes('people pleasing') ||
    input.includes('everyone first')
  ) {
    return 'people_pleasing';
  }

  if (
    input.includes('who am i') ||
    input.includes('purpose') ||
    input.includes('identity') ||
    input.includes("don't know who i am")
  ) {
    return 'identity';
  }

  if (
    input.includes('control') ||
    input.includes('everything falls apart') ||
    input.includes("can't let go")
  ) {
    return 'control';
  }

  if (
    input.includes("can't trust") ||
    input.includes('trust issues') ||
    input.includes('never trust')
  ) {
    return 'trust';
  }

  if (
    input.includes('lonely') ||
    input.includes('alone') ||
    input.includes('isolated') ||
    input.includes('nobody understands')
  ) {
    return 'loneliness';
  }

  if (
    input.includes('burned out') ||
    input.includes('burnt out') ||
    input.includes('exhausted') ||
    input.includes('emotionally drained')
  ) {
    return 'burnout';
  }

  if (
    input.includes("can't hear god") ||
    input.includes('god is silent') ||
    input.includes('far from god') ||
    input.includes('spiritually dry')
  ) {
    return 'spiritual_dryness';
  }

  return 'unknown';
}

export function getHealingFocus(wound: HealingWound) {
  switch (wound) {
    case 'abandonment':
      return {
        title: 'Healing from Abandonment',
        encouragement:
          'You deserve relationships where you feel safe, chosen, and secure.',
      };

    case 'rejection':
      return {
        title: 'Healing from Rejection',
        encouragement:
          "Someone else's rejection does not determine your worth.",
      };

    case 'shame':
      return {
        title: 'Healing from Shame',
        encouragement:
          'Shame tells you to hide. Healing invites you into truth and grace.',
      };

    case 'betrayal':
      return {
        title: 'Healing from Betrayal',
        encouragement:
          'Broken trust hurts deeply, but it does not have to define your future.',
      };

    case 'grief':
      return {
        title: 'Walking Through Grief',
        encouragement:
          'Healing does not mean forgetting. It means learning to carry love forward.',
      };

    case 'fear':
      return {
        title: 'Moving Beyond Fear',
        encouragement:
          'Fear may speak loudly, but it does not get the final word.',
      };

    case 'perfectionism':
      return {
        title: 'Freedom from Perfectionism',
        encouragement:
          'You are worthy even when you are unfinished.',
      };

    case 'people_pleasing':
      return {
        title: 'Healthy Boundaries',
        encouragement:
          'Loving others does not require abandoning yourself.',
      };

    case 'identity':
      return {
        title: 'Rediscovering Your Identity',
        encouragement:
          'Your identity is deeper than your pain, mistakes, or achievements.',
      };

    case 'control':
      return {
        title: 'Learning to Release Control',
        encouragement:
          'Healing often begins where control ends and trust begins.',
      };

    case 'trust':
      return {
        title: 'Learning to Trust Again',
        encouragement:
          'Healthy trust grows one safe step at a time.',
      };

    case 'loneliness':
      return {
        title: 'Healing Loneliness',
        encouragement:
          'Feeling alone is real, but you do not have to heal alone.',
      };

    case 'burnout':
      return {
        title: 'Recovering from Burnout',
        encouragement:
          'Rest is not weakness. It is part of healing.',
      };

    case 'spiritual_dryness':
      return {
        title: 'Renewing Your Spirit',
        encouragement:
          'Even when God feels quiet, His presence has not left you.',
      };

    default:
      return {
        title: '',
        encouragement: '',
      };
  }
}