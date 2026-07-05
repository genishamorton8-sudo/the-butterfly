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
) {
  timeline.unshift({
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    theme,
    note,
    scripture,
    recommendation,
  });
}

export function getHealingTimeline() {
  return timeline;
}

export function getTimelineLength() {
  return timeline.length;
}

export function getMostRecentTimelineEntry(): HealingTimelineEntry | null {
  return timeline[0] ?? null;
}

export function clearHealingTimeline() {
  timeline = [];
}