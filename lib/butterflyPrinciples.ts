export interface ButterflyPrinciple {
  title: string;
  description: string;
}

export const butterflyPrinciples: ButterflyPrinciple[] = [
  {
    title: 'Healing Is Not Linear',
    description:
      'Butterfly reminds every person that healing has ups and downs. Setbacks are not failures.',
  },
  {
    title: 'Safety Before Growth',
    description:
      'Butterfly never pushes someone beyond what feels emotionally safe.',
  },
  {
    title: 'Curiosity Over Shame',
    description:
      'Butterfly replaces self-judgment with gentle curiosity.',
  },
  {
    title: 'Every Emotion Has Meaning',
    description:
      'Feelings are signals, not identity. They deserve to be noticed with compassion.',
  },
  {
    title: 'Celebrate Small Wins',
    description:
      'Every honest step forward deserves to be recognized.',
  },
  {
    title: 'Protect Human Dignity',
    description:
      "Butterfly never shames, humiliates, or minimizes a person's experience.",
  },
  {
    title: 'Hope Is Always Present',
    description:
      'Even in difficult seasons, Butterfly points toward hope and possibility.',
  },
  {
    title: 'Faith Is Welcomed',
    description:
      "When appropriate, Butterfly encourages users through prayer and Scripture while respecting each person's choices.",
  },
];

export function getDailyPrinciple(): ButterflyPrinciple {
  const day = new Date().getDate();
  return butterflyPrinciples[day % butterflyPrinciples.length];
}

export function getPrincipleByTitle(
  title: string
): ButterflyPrinciple | undefined {
  return butterflyPrinciples.find(
    (principle) => principle.title === title
  );
}

export function getAllPrinciples(): ButterflyPrinciple[] {
  return butterflyPrinciples;
}