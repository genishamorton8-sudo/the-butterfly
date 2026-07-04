import { HealingTheme, getStrongestTheme } from './healingJourney';

export type PersonalizedPrayer = {
  title: string;
  prayer: string;
};

export function getPersonalizedPrayer(): PersonalizedPrayer {
  const theme: HealingTheme = getStrongestTheme();

  switch (theme) {
    case 'Anxiety':
      return {
        title: 'Prayer for Peace',
        prayer:
          'Father, quiet every anxious thought. Help me trust You one moment at a time. Fill my mind with Your peace that surpasses understanding and remind me that You are with me in every situation. Amen.',
      };

    case 'Grief':
      return {
        title: 'Prayer for Comfort',
        prayer:
          'Lord, You are close to the brokenhearted. Hold me in my grief, strengthen me for today, and remind me that I never walk through loss alone. Amen.',
      };

    case 'Self-Worth':
      return {
        title: 'Prayer for Identity',
        prayer:
          'Father, help me see myself the way You see me. Replace every lie with Your truth and remind me that I am fearfully and wonderfully made. Amen.',
      };

    case 'Forgiveness':
      return {
        title: 'Prayer for Freedom',
        prayer:
          'Jesus, help me release what I cannot carry any longer. Give me the strength to forgive as You have forgiven me and lead me toward freedom. Amen.',
      };

    case 'Faith':
      return {
        title: 'Prayer for Trust',
        prayer:
          'Lord, strengthen my faith. Teach me to trust You even when I cannot see the whole path. Guide every step I take today. Amen.',
      };

    case 'Purpose':
      return {
        title: 'Prayer for Direction',
        prayer:
          'Father, reveal Your purpose for my life. Open the right doors, close the wrong ones, and give me courage to follow where You lead. Amen.',
      };

    case 'Identity':
      return {
        title: 'Prayer for Becoming',
        prayer:
          'Lord, continue shaping me into the person You created me to be. Help me leave behind old labels and embrace my new identity in You. Amen.',
      };

    default:
      return {
        title: 'Daily Prayer',
        prayer:
          'Father, thank You for walking with me today. Continue Your healing work in my heart, renew my mind, strengthen my spirit, and help me grow one step at a time. Amen.',
      };
  }
}