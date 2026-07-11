import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { getSessionMemory } from '../../lib/butterflySessionMemory';
import {
    getHealingMilestones,
    getLatestMilestone,
    getMilestoneCount,
} from '../../lib/healingMilestones';

export default function HealingJourneyScreen() {
  const memory = getSessionMemory();
  const milestones = getHealingMilestones();
  const latestMilestone = getLatestMilestone();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>The Butterfly</Text>
        <Text style={styles.title}>Healing Journey</Text>

        <Text style={styles.subtitle}>
          Every honest step matters. This is where Butterfly keeps track of the healing work you are doing.
        </Text>

        <View style={styles.grid}>
          <StatCard label="Healing Sessions" value={`${memory.totalSessions}`} />
          <StatCard label="Milestones" value={`${getMilestoneCount()}`} />
          <StatCard
            label="Last Emotion"
            value={memory.lastEmotion ?? 'Not yet'}
          />
          <StatCard
            label="Last Session"
            value={memory.lastSession ?? 'Not yet'}
          />
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Latest Healing Win</Text>
          <Text style={styles.featureText}>
            {latestMilestone
              ? latestMilestone.title
              : 'Your first healing milestone will appear here.'}
          </Text>
          <Text style={styles.featureSubtext}>
            {latestMilestone
              ? latestMilestone.description
              : 'When you complete a guided healing session, Butterfly will remember it here.'}
          </Text>
        </View>

        <View style={styles.timelineCard}>
          <Text style={styles.sectionTitle}>Healing Timeline</Text>

          {milestones.length === 0 ? (
            <Text style={styles.emptyText}>
              No milestones yet. Complete Rewrite the Scene and save it to your Healing Journey.
            </Text>
          ) : (
            milestones.map((milestone) => (
              <View key={milestone.id} style={styles.timelineItem}>
                <Text style={styles.timelineDate}>{milestone.date}</Text>
                <Text style={styles.timelineTitle}>{milestone.title}</Text>
                <Text style={styles.timelineText}>
                  {milestone.description}
                </Text>
                <Text style={styles.timelineCategory}>
                  {milestone.category}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.reminderCard}>
          <Text style={styles.reminderTitle}>Today’s Reminder</Text>
          <Text style={styles.reminderText}>
            Healing is not measured by perfection. It is measured by your willingness to keep returning.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type StatCardProps = {
  label: string;
  value: string;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  content: {
    padding: 24,
    paddingBottom: 50,
  },
  kicker: {
    color: '#D4AF37',
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 22,
  },
  grid: {
    gap: 12,
    marginBottom: 18,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E9E2EC',
  },
  statValue: {
    color: '#E75480',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    color: '#4B1D7A',
    fontSize: 14,
    fontWeight: '800',
  },
  featureCard: {
    backgroundColor: '#4B1D7A',
    borderRadius: 26,
    padding: 22,
    marginBottom: 18,
  },
  featureTitle: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
  },
  featureSubtext: {
    color: '#F7EFFF',
    fontSize: 15,
    lineHeight: 23,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },
  emptyText: {
    color: '#8B7A90',
    fontSize: 15,
    lineHeight: 22,
  },
  timelineItem: {
    backgroundColor: '#FFF8F2',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  timelineDate: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 4,
  },
  timelineTitle: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  timelineText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  timelineCategory: {
    color: '#8B7A90',
    fontSize: 13,
    fontWeight: '800',
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  reminderTitle: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  reminderText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
  },
});