import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
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

type JourneySteps = {
  wordDone: boolean;
  moodDone: boolean;
  journalDone: boolean;
  prayerDone: boolean;
  celebrateDone: boolean;
};

const startingSteps: JourneySteps = {
  wordDone: false,
  moodDone: false,
  journalDone: false,
  prayerDone: false,
  celebrateDone: false,
};

export default function DailyJourneyScreen() {
  const [steps, setSteps] = useState<JourneySteps>(startingSteps);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadJourney();
    }, [])
  );

  async function loadJourney() {
    try {
      const savedJourney = await AsyncStorage.getItem(JOURNEY_KEY);

      if (savedJourney) {
        setSteps(JSON.parse(savedJourney));
      }
    } catch {
      Alert.alert('Unable to load journey', 'Please close the screen and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function completeStep(stepName: keyof JourneySteps) {
    if (steps[stepName]) {
      return;
    }

    try {
      const updatedSteps = {
        ...steps,
        [stepName]: true,
      };

      setSteps(updatedSteps);

      await AsyncStorage.setItem(JOURNEY_KEY, JSON.stringify(updatedSteps));

      await increaseProgress(5);
    } catch {
      Alert.alert('Unable to save progress', 'Please try completing the step again.');
    }
  }

  const completedCount = Object.values(steps).filter(Boolean).length;
  const dailyPercentage = completedCount * 20;

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Loading your healing journey...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🌱 Today&apos;s Healing Journey</Text>

      <Text style={styles.subtitle}>Complete one small step at a time.</Text>

      <View style={styles.card}>
        <JourneyStep
          icon="📖"
          label="Today’s Word"
          done={steps.wordDone}
          onPress={() => completeStep('wordDone')}
        />

        <JourneyStep
          icon="😊"
          label="Mood Check"
          done={steps.moodDone}
          onPress={() => completeStep('moodDone')}
        />

        <JourneyStep
          icon="📝"
          label="Journal"
          done={steps.journalDone}
          onPress={() => completeStep('journalDone')}
        />

        <JourneyStep
          icon="🙏"
          label="Prayer"
          done={steps.prayerDone}
          onPress={() => completeStep('prayerDone')}
        />

        <JourneyStep
          icon="🎉"
          label="Celebrate"
          done={steps.celebrateDone}
          onPress={() => completeStep('celebrateDone')}
        />
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressText}>{completedCount} of 5 steps complete</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${dailyPercentage}%` }]} />
        </View>

        {completedCount === 5 && (
          <View style={styles.completeCard}>
            <Text style={styles.completeTitle}>🦋 Today&apos;s Journey Complete</Text>

            <Text style={styles.completeText}>
              You showed up for yourself today.
              {'\n'}
              Pain lied. Purpose didn&apos;t.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function JourneyStep({
  icon,
  label,
  done,
  onPress,
}: {
  icon: string;
  label: string;
  done: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.step, done && styles.completedStep]}
      onPress={onPress}
      disabled={done}
    >
      <Text style={styles.stepIcon}>{icon}</Text>

      <Text style={[styles.stepText, done && styles.doneText]}>{label}</Text>

      <Text style={styles.checkmark}>{done ? '✓' : '○'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 65,
    paddingBottom: 60,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    color: '#4B1D7A',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 18,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 22,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4E7F8',
  },
  completedStep: {
    backgroundColor: '#F4E7F8',
    borderRadius: 16,
  },
  stepIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    color: '#3F2A4D',
    fontSize: 19,
    fontWeight: '700',
  },
  doneText: {
    color: '#E75480',
    textDecorationLine: 'line-through',
  },
  checkmark: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: '800',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  progressText: {
    color: '#4B1D7A',
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
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
  completeCard: {
    backgroundColor: '#FFF9F3',
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
  },
  completeTitle: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  completeText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
});