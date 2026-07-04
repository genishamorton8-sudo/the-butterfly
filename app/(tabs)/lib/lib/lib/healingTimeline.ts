export type TimelineTheme =
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

export type HealingTimelineEntry = {
  id: number;
  date: string;
  theme: TimelineTheme;
  note: string;
  scripture: string;
  recommendation: string;
};

let timeline: HealingTimelineEntry[] = [];

export function addTimelineEntry(
  theme: TimelineTheme,
  note: string,
  scripture: string,
  recommendation: string
): HealingTimelineEntry {
  const entry: HealingTimelineEntry = {
    id: Date.now(),
    date: new Date().toISOString(),
    theme,
    note,
    scripture,
    recommendation,
  };

  timeline = [entry, ...timeline];

  return entry;
}

export function getHealingTimeline(): HealingTimelineEntry[] {
  return timeline;
}

export function getTimelineCount(): number {
  return timeline.length;
}

export function getMostRecentTimelineEntry(): HealingTimelineEntry | null {
  return timeline[0] ?? null;
}

export function getMostCommonTheme(): TimelineTheme {
  if (timeline.length === 0) return 'none';

  const counts: Record<string, number> = {};

  timeline.forEach((entry) => {
    counts[entry.theme] = (counts[entry.theme] || 0) + 1;
  });

  const sortedThemes = Object.entries(counts).sort(
    (first, second) => second[1] - first[1]
  );

  return sortedThemes[0][0] as TimelineTheme;
}

export function buildTimelineSummary(): string {
  if (timeline.length === 0) {
    return 'Your healing timeline is ready. Each honest check-in will help Butterfly understand your journey more clearly.';
  }

  const recent = getMostRecentTimelineEntry();
  const commonTheme = getMostCommonTheme();

  return `You have ${timeline.length} healing moment${timeline.length === 1 ? '' : 's'} recorded. Your most common theme is ${commonTheme}. Your most recent focus was ${recent?.theme ?? 'none'}.`;
}