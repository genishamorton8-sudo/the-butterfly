export type TimelineEntry = {
  date: string;
  theme: string;
  milestone: string;
};

const timeline: TimelineEntry[] = [];

export function addTimelineEntry(
  theme: string,
  milestone: string
) {
  timeline.push({
    date: new Date().toISOString(),
    theme,
    milestone,
  });
}

export function getHealingTimeline() {
  return timeline;
}

export function getLatestTimelineEntry() {
  return timeline[timeline.length - 1] ?? null;
}

export function getTimelineCount() {
  return timeline.length;
}