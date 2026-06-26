import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { increaseProgress } from '../../.claude/lib/progress';

const JOURNEY_KEY = '@butterfly_daily_journey';

type StepKey = 'wordDone' | 'moodDone' | 'journalDone' | 'prayerDone' | 'celebrateDone';

type JourneySteps = {
  wordDone: boolean;
  moodDone: boolean;
  journalDone: boolean;
  prayerDone: boolean;
  celebrateDone: boolean;
};

const freshSteps: JourneySteps = {
  wordDone: false,
  moodDone: false,
  journalDone: false,
  prayerDone: false,
  celebrateDone: false,
};

export default function DailyJourneyScreen() {
  const [steps, setSteps] = useState<JourneySteps>(freshSteps);

  useFocusEffect(
    useCallback(() => {
      loadJourney();
    }, [])
  );

  async function loadJourney() {
    const saved = await AsyncStorage.getItem(JOURNEY_KEY);

    if (saved) {
      setSteps(JSON.parse(saved));
    } else {
      setSteps(freshSteps);
    }
  }

  async function saveSteps(updatedSteps: JourneySteps) {
    setSteps(updatedSteps);
    await AsyncStorage.setItem(JOURNEY_KEY, JSON.stringify(updatedSteps));
  }

  async function toggleStep(stepName: StepKey) {
    const wasAlreadyDone = steps[stepName];

    const updatedSteps = {
      ...steps,
      [stepName]: !wasAlreadyDone,
    };

    await saveSteps(updatedSteps);

    if (!wasAlreadyDone) {
      await increaseProgress(5);
    }
  }

  async function resetJourney() {
    await AsyncStorage.removeItem(JOURNEY_KEY);
    setSteps(freshSteps);
    Alert.alert('Fresh start', 'Today’s checkmarks have been cleared.');
  }

  function openStep(route: string) {
    router.push(route as any);
  }

  const completedCount = Object.values(steps).filter(Boolean).length;
  const dailyPercentage = completedCount * 20;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🌱 Today’s Healing Journey</Text>

      <Text style={styles.subtitle}>
        Open each step, then come back and check it off.
      </Text>

      <TouchableOpacity style={styles.resetButton} onPress={resetJourney}>
        <Text style={styles.resetButtonText}>Start Fresh Today</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <JourneyStep
          icon="📖"
          label="Today’s Word"
          done={steps.wordDone}
          onOpen={() => openStep('/(tabs)/today-word')}
          onToggle={() => toggleStep('wordDone')}
        />

        <JourneyStep
          icon="😊"
          label="Mood Check"
          done={steps.moodDone}
          onOpen={() => openStep('/(tabs)/mood')}
          onToggle={() => toggleStep('moodDone')}
        />

        <JourneyStep
          icon="📝"
          label="Journal"
          done={steps.journalDone}
          onOpen={() => openStep('/(tabs)/journal')}
          onToggle={() => toggleStep('journalDone')}
        />

        <JourneyStep
          icon="🙏"
          label="Prayer"
          done={steps.prayerDone}
          onOpen={() => openStep('/(tabs)/prayer')}
          onToggle={() => toggleStep('prayerDone')}
        />

        <JourneyStep
          icon="🎉"
          label="Celebrate"
          done={steps.celebrateDone}
          onOpen={() => openStep('/(tabs)/celebrate')}
          onToggle={() => toggleStep('celebrateDone')}
        />
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressText}>{completedCount} of 5 steps complete</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${dailyPercentage}%` }]} />
        </View>

        {completedCount === 5 && (
          <Text style={styles.completeText}>
            🦋 You completed today’s journey. Pain lied. Purpose didn’t.
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => router.push('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.dashboardButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function JourneyStep({
  icon,
  label,
  done,
  onOpen,
  onToggle,
}: {
  icon: string;
  label: string;
  done: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <View style={styles.step}>
      <Text style={styles.stepIcon}>{icon}</Text>

      <View style={styles.stepTextArea}>
        <Text style={[styles.stepText, done && styles.doneText]}>{label}</Text>
        <Text style={styles.stepStatus}>{done ? 'Completed' : 'Not complete yet'}</Text>
      </View>

      <View style={styles.stepButtons}>
        <TouchableOpacity style={styles.openButton} onPress={onOpen}>
          <Text style={styles.openButtonText}>Open</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkButton} onPress={onToggle}>
          <Text style={styles.checkButtonText}>{done ? 'Uncheck' : 'Check'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 80,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  resetButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 18,
  },
  resetButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F4E7F8',
  },
  stepIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  stepTextArea: {
    flex: 1,
  },
  stepText: {
    color: '#3F2A4D',
    fontSize: 17,
    fontWeight: '800',
  },
  doneText: {
    color: '#E75480',
    textDecorationLine: 'line-through',
  },
  stepStatus: {
    color: '#8B7A91',
    fontSize: 13,
    marginTop: 3,
  },
  stepButtons: {
    alignItems: 'flex-end',
  },
  openButton: {
    backgroundColor: '#E75480',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 6,
  },
  openButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  checkButton: {
    borderColor: '#4B1D7A',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  checkButtonText: {
    color: '#4B1D7A',
    fontWeight: '800',
    fontSize: 12,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
  },
  progressText: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 16,
    backgroundColor: '#F4E7F8',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E75480',
    borderRadius: 20,
  },
  completeText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 24,
  },
  dashboardButton: {
    backgroundColor: '#E75480',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  dashboardButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});