export interface TimelineEntry {
  id: number;
  date: string;
  theme: string;
  scripture: string;
  recommendation: string;
}

let timeline: TimelineEntry[] = [];

export function addTimelineEntry(
  theme: string,
  scripture: string,
  recommendation: string
) {
  timeline.unshift({
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    theme,
    scripture,
    recommendation,
  });
}

export function getHealingTimeline(): TimelineEntry[] {
  return timeline;
}

export function getTimelineLength(): number {
  return timeline.length;
}

export function getLatestTimelineEntry(): TimelineEntry | null {
  return timeline.length > 0 ? timeline[0] : null;
}

export function clearTimeline(): void {
  timeline = [];
}