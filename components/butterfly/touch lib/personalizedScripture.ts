import { HealingTheme, getStrongestTheme } from './healingJourney';

export type PersonalizedScripture = {
  reference: string;
  verse: string;
  why: string;
};

export function getPersonalizedScripture(): PersonalizedScripture {
  const theme: HealingTheme = getStrongestTheme();

  switch (theme) {
    case 'Anxiety':
      return {
        reference: 'Philippians 4:6–7',
        verse:
          'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
        why:
          'This passage reminds you that God invites you to exchange anxiety for His peace.',
      };

    case 'Grief':
      return {
        reference: 'Psalm 34:18',
        verse:
          'The Lord is close to the brokenhearted and saves those who are crushed in spirit.',
        why:
          'God draws near to people who are grieving. You do not walk through loss alone.',
      };

    case 'Self-Worth':
      return {
        reference: 'Ephesians 2:10',
        verse:
          'For we are His workmanship, created in Christ Jesus for good works...',
        why:
          'Your identity is rooted in who God says you are, not in your failures.',
      };

    case 'Forgiveness':
      return {
        reference: 'Colossians 3:13',
        verse:
          'Bear with each other and forgive one another if any of you has a grievance against someone.',
        why:
          'Forgiveness is part of freedom. God walks with you through that process.',
      };

    case 'Faith':
      return {
        reference: 'Proverbs 3:5–6',
        verse:
          'Trust in the Lord with all your heart and lean not on your own understanding...',
        why:
          'When the path feels uncertain, God promises to direct your steps.',
      };

    case 'Purpose':
      return {
        reference: 'Jeremiah 29:11',
        verse:
          'For I know the plans I have for you, declares the Lord...',
        why:
          'God has purpose for your life even when you cannot yet see the whole picture.',
      };

    case 'Identity':
      return {
        reference: '2 Corinthians 5:17',
        verse:
          'If anyone is in Christ, he is a new creation...',
        why:
          'Your past does not define who you are becoming.',
      };

    default:
      return {
        reference: 'Philippians 1:6',
        verse:
          'He who began a good work in you will carry it on to completion...',
        why:
          'Your healing is still unfolding, and God is not finished with you.',
      };
  }
}
