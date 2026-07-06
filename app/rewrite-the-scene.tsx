import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import ChoiceSelector from '../components/healing/ChoiceSelector';
import CompletionScreen from '../components/healing/CompletionScreen';
import GroundingExercise from '../components/healing/GroundingExercise';
import GuidedQuestion from '../components/healing/GuidedQuestion';
import RewriteWelcome from '../components/healing/RewriteWelcome';
import SafetyCheck from '../components/healing/SafetyCheck';

type Screen = 'welcome' | 'safety' | 'grounding' | 'session' | 'complete';

type RewriteResponses = {
  memory: string;
  age: string;
  emotions: string[];
  needs: string[];
  supportPerson: string;
  rewrittenEnding: string;
};

const emotions = [
  'Fear',
  'Shame',
  'Anger',
  'Sadness',
  'Confusion',
  'Rejected',
  'Alone',
];

const needs = [
  'Safety',
  'Protection',
  'Comfort',
  'To be believed',
  'Love',
  'Justice',
  'To be rescued',
];

const supportOptions = [
  'Jesus',
  'My current self',
  'A trusted adult',
  'Someone safe',
];

export default function RewriteTheSceneScreen() {
  const router = useRouter();

  const [screen, setScreen] = useState<Screen>('welcome');
  const [step, setStep] = useState(0);
  const [safetyLevel, setSafetyLevel] = useState<number | null>(null);

  const [responses, setResponses] = useState<RewriteResponses>({
    memory: '',
    age: '',
    emotions: [],
    needs: [],
    supportPerson: '',
    rewrittenEnding: '',
  });

  const totalSteps = 6;

  function toggleList(key: 'emotions' | 'needs', value: string) {
    setResponses((current) => {
      const list = current[key];

      return {
        ...current,
        [key]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      };
    });
  }

  function nextStep() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
      return;
    }

    setScreen('complete');
  }

  function previousStep() {
    if (step > 0) {
      setStep(step - 1);
      return;
    }

    setScreen('safety');
  }

  function primaryEmotion() {
    return responses.emotions[0] ?? 'Not selected';
  }

  function primaryNeed() {
    return responses.needs[0] ?? 'Not selected';
  }

  function buildReflection() {
    const emotion = primaryEmotion();
    const need = primaryNeed();

    if (emotion === 'Fear' || need === 'Safety') {
      return 'It seems like safety mattered deeply in this memory. Thank you for noticing what your heart needed. We can continue helping that part of you feel protected and cared for.';
    }

    if (emotion === 'Shame' || need === 'To be believed') {
      return 'Being believed matters. Your story matters. Today you gave your heart space to be heard instead of hidden.';
    }

    if (emotion === 'Alone' || need === 'Comfort') {
      return 'It sounds like that younger part of you needed comfort and presence. Today you practiced showing up for that part with care.';
    }

    return 'Today you slowed down, listened to your heart, and gave yourself space to imagine safety, truth, and care. That is a meaningful healing step.';
  }

  function renderSessionStep() {
    if (step === 0) {
      return (
        <GuidedQuestion
          title="Choose one memory"
          guidance="Do not choose the biggest wound first. Choose something your heart feels ready to revisit."
          affirmation="You are not reliving this alone. Butterfly is walking with you one gentle step at a time."
          value={responses.memory}
          onChangeText={(text) =>
            setResponses((current) => ({ ...current, memory: text }))
          }
          placeholder="What memory came to mind?"
        />
      );
    }

    if (step === 1) {
      return (
        <GuidedQuestion
          title="About how old were you?"
          guidance="You do not have to be exact. Even an estimate is enough."
          affirmation="This helps us notice the younger part of you that needed care, safety, and protection."
          value={responses.age}
          onChangeText={(text) =>
            setResponses((current) => ({ ...current, age: text }))
          }
          placeholder="I was about..."
        />
      );
    }

    if (step === 2) {
      return (
        <ChoiceSelector
          title="What emotions were present?"
          guidance="Choose anything that fits. Nothing is wrong with you for feeling it."
          options={emotions}
          selected={responses.emotions}
          onToggle={(value) => toggleList('emotions', value)}
        />
      );
    }

    if (step === 3) {
      return (
        <ChoiceSelector
          title="What did you need?"
          guidance="Think about what your younger self needed most in that moment."
          options={needs}
          selected={responses.needs}
          onToggle={(value) => toggleList('needs', value)}
        />
      );
    }

    if (step === 4) {
      return (
        <ChoiceSelector
          title="Who would you want beside you?"
          guidance="Imagine that younger version of you is no longer alone."
          options={supportOptions}
          selected={
            responses.supportPerson ? [responses.supportPerson] : []
          }
          multiple={false}
          onToggle={(value) =>
            setResponses((current) => ({
              ...current,
              supportPerson: value,
            }))
          }
        />
      );
    }

    return (
      <GuidedQuestion
        title="Rewrite the ending"
        guidance="You are not pretending it never happened. You are giving your heart what it deserved: safety, truth, and care."
        affirmation="You are allowed to imagine protection. You are allowed to imagine comfort. You are allowed to imagine a different ending for your heart."
        value={responses.rewrittenEnding}
        onChangeText={(text) =>
          setResponses((current) => ({
            ...current,
            rewrittenEnding: text,
          }))
        }
        placeholder="Describe what happens now..."
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>Healing Studio</Text>
        <Text style={styles.title}>Rewrite the Scene</Text>

        {screen === 'welcome' && (
          <RewriteWelcome
            onBegin={() => setScreen('safety')}
            onExit={() => router.back()}
          />
        )}

        {screen === 'safety' && (
          <SafetyCheck
            selectedLevel={safetyLevel}
            onSelectLevel={setSafetyLevel}
            onContinue={() => setScreen('session')}
            onGrounding={() => setScreen('grounding')}
          />
        )}

        {screen === 'grounding' && (
          <GroundingExercise
            onContinue={() => setScreen('session')}
            onExit={() => router.back()}
          />
        )}

        {screen === 'session' && (
          <>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${((step + 1) / totalSteps) * 100}%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.stepText}>
              Step {step + 1} of {totalSteps}
            </Text>

            {renderSessionStep()}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={previousStep}
              >
                <Text style={styles.secondaryText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={nextStep}
              >
                <Text style={styles.primaryText}>
                  {step === totalSteps - 1 ? 'Complete' : 'Continue'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => router.back()}
            >
              <Text style={styles.exitText}>Pause & Exit</Text>
            </TouchableOpacity>
          </>
        )}

        {screen === 'complete' && (
          <CompletionScreen
            primaryEmotion={primaryEmotion()}
            primaryNeed={primaryNeed()}
            supportPerson={responses.supportPerson || 'Not selected'}
            reflection={buildReflection()}
            onPray={() => {}}
            onJournal={() => {}}
            onSave={() => {}}
            onHome={() => router.push('/')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 18,
  },
  progressBackground: {
    height: 10,
    backgroundColor: '#E9E2EC',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E75480',
  },
  stepText: {
    color: '#8B7A90',
    fontSize: 14,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#E9E2EC',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#E75480',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#4B1D7A',
    fontWeight: '900',
    fontSize: 16,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  exitButton: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  exitText: {
    color: '#8B7A90',
    fontWeight: '800',
    fontSize: 15,
  },
});