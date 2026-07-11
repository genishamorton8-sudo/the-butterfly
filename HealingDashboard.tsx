import { StyleSheet, Text, View } from 'react-native';

import { getCompanionMemory } from '../../lib/butterflyCompanion';
import { getHealingJourney } from '../../lib/healingJourney';
import { getHealingTimeline } from '../../lib/healingTimeline';

export default function HealingDashboard() {
  const memory = getCompanionMemory();
  const journey = getHealingJourney();
  const timelineCount = getHealingTimeline().length;

  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Healing Dashboard</Text>
      <Text style={styles.title}>Welcome back, {memory.userName}</Text>

      <View style={styles.grid}>
        <DashboardItem label="Journey Stage" value={journey.stage} />
        <DashboardItem label="Last Focus" value={memory.lastHealingTheme} />
        <DashboardItem label="Prayer Streak" value={`${memory.prayerStreak}`} />
        <DashboardItem label="Healing Moments" value={`${timelineCount}`} />
      </View>

      <Text style={styles.footer}>
        Every honest check-in is helping Butterfly understand your healing journey.
      </Text>
    </View>
  );
}

type DashboardItemProps = {
  label: string;
  value: string;
};

function DashboardItem({ label, value }: DashboardItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#E75480',
  },
  kicker: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 18,
  },
  grid: {
    gap: 12,
  },
  item: {
    backgroundColor: '#FFF8F2',
    borderRadius: 18,
    padding: 14,
  },
  itemLabel: {
    color: '#8B7A90',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  itemValue: {
    color: '#3F2A4D',
    fontSize: 18,
    fontWeight: '900',
  },
  footer: {
    color: '#3F2A4D',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
  },
});