import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getJournal } from '../../lib/journal';
import { getProgress } from '../../lib/progress';
import { ButterflyProgress, JournalEntry } from '../../types/healing';

export default function DashboardScreen() {
  const [progress, setProgress] = useState<ButterflyProgress>({
    butterflySteps: 0,
    completedExercises: [],
    streak: 0,
    lastCheckIn: undefined,
  });

  const [journal, setJournal] = useState<JournalEntry[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const savedProgress = await getProgress();
    const savedJournal = await getJournal();

    setProgress(savedProgress);
    setJournal(savedJournal);
  }

  const completedCount = progress.completedExercises.length;
  const latestEntry = journal[0];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🦋</Text>

      <Text style={styles.title}>Welcome Back</Text>

      <Text style={styles.subtitle}>
        Your healing journey is still growing, one Butterfly step at a time.
      </Text>

      <View style={styles.reminderCard}>
        <Text style={styles.reminderTitle}>Today&apos;s Reminder</Text>
        <Text style={styles.reminderText}>
          Healing does not have to happen all at once. One honest step still counts.
        </Text>
      </View>

      <View style={styles.grid}>
        <StatCard label="Butterfly Steps" value={progress.butterflySteps.toString()} />
        <StatCard label="Healing Streak" value={`${progress.streak} days`} />
        <StatCard label="Journal Entries" value={journal.length.toString()} />
        <StatCard label="Exercises Done" value={`${completedCount}/7`} />
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/(tabs)/healing-exercises' as any)}
      >
        <Text style={styles.primaryButtonText}>Continue Healing</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/(tabs)/healing-journal?tab=healing' as any)}
      >
        <Text style={styles.secondaryButtonText}>Open My Healing Journal</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Journal</Text>

        {latestEntry ? (
          <>
            <Text style={styles.entryTitle}>{latestEntry.title}</Text>
            <Text style={styles.entryText}>{latestEntry.preview}</Text>
          </>
        ) : (
          <Text style={styles.emptyText}>
            Your journal is waiting. Complete a healing exercise to see your first entry here.
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.gardenCard}
        onPress={() => router.push('/(tabs)/garden' as any)}
      >
        <Text style={styles.gardenTitle}>🌱 Healing Garden</Text>
        <Text style={styles.gardenText}>
          Your garden will grow as you keep taking Butterfly steps.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  content: { padding: 24, paddingTop: 70, paddingBottom: 120 },
  icon: { fontSize: 56, textAlign: 'center', marginBottom: 8 },
  title: {
    color: '#4B1D7A',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
    lineHeight: 24,
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
  },
  reminderTitle: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  reminderText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    borderRadius: 22,
    padding: 18,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 14,
    alignItems: 'center',
  },
  statValue: {
    color: '#E75480',
    fontSize: 26,
    fontWeight: '900',
  },
  statLabel: {
    color: '#4B1D7A',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 6,
  },
  primaryButton: {
    backgroundColor: '#E75480',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  secondaryButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 18,
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 18,
  },
  cardTitle: {
    color: '#4B1D7A',
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 10,
  },
  entryTitle: {
    color: '#E75480',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 6,
  },
  entryText: {
    color: '#444',
    fontSize: 16,
    lineHeight: 24,
  },
  emptyText: {
    color: '#555',
    fontSize: 16,
    lineHeight: 24,
  },
  gardenCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  gardenTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },
  gardenText: {
    color: '#555',
    fontSize: 16,
    lineHeight: 24,
  },
});