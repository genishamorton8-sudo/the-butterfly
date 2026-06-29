import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { addGrowth } from '../lib/garden';

const REWRITE_SCENE_KEY = '@butterfly_rewrite_scene_entries';

type RewriteEntry = {
  id: string;
  date: string;
  memory: string;
  hotspot: string;
  need: string;
  adultSelf: string;
  newEnding: string;
  truth: string;
};

export default function RewriteSceneScreen() {
  const [step, setStep] = useState(0);

  const [memory, setMemory] = useState('');
  const [hotspot, setHotspot] = useState('');
  const [need, setNeed] = useState('');
  const [adultSelf, setAdultSelf] = useState('');
  const [newEnding, setNewEnding] = useState('');
  const [truth, setTruth] = useState('');

  const steps = [
    {
      title: 'Before You Begin',
      subtitle:
        'This is a gentle imagery rescripting exercise. If this feels too heavy, pause and return later with support.',
      prompt: '',
      value: '',
      setValue: null,
      placeholder: '',
    },
    {
      title: 'Name the Scene',
      subtitle: 'What memory or image is coming up?',
      prompt: 'Describe it briefly. You do not have to write every detail.',
      value: memory,
      setValue: setMemory,
      placeholder: 'A memory that keeps coming up is...',
    },
    {
      title: 'Find the Hotspot',
      subtitle: 'What is the hardest moment in the memory?',
      prompt: 'This is the moment that carries the strongest feeling.',
      value: hotspot,
      setValue: setHotspot,
      placeholder: 'The hardest part was...',
    },
    {
      title: 'Notice the Need',
      subtitle: 'What did you need in that moment?',
      prompt: 'Protection, comfort, truth, rescue, a voice, safety, love...',
      value: need,
      setValue: setNeed,
      placeholder: 'What I needed then was...',
    },
    {
      title: 'Enter as Adult You',
      subtitle: 'Imagine compassionate adult you entering the scene.',
      prompt: 'What do you say or do to protect, comfort, or help younger you?',
      value: adultSelf,
      setValue: setAdultSelf,
      placeholder: 'I step in and...',
    },
    {
      title: 'Rewrite the Ending',
      subtitle: 'How does the scene change now?',
      prompt: 'Give the memory a new ending with safety, support, and compassion.',
      value: newEnding,
      setValue: setNewEnding,
      placeholder: 'The scene changes because...',
    },
    {
      title: 'Carry the Truth',
      subtitle: 'What truth do you want to leave with?',
      prompt: 'Write the new meaning you want your heart to remember.',
      value: truth,
      setValue: setTruth,
      placeholder: 'The truth is...',
    },
  ];

  const currentStep = steps[step];

  function goNext() {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  }

  function goBack() {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.back();
    }
  }

  async function finishExercise() {
    const entry: RewriteEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      memory,
      hotspot,
      need,
      adultSelf,
      newEnding,
      truth,
    };

    const saved = await AsyncStorage.getItem(REWRITE_SCENE_KEY);
    const entries = saved ? JSON.parse(saved) : [];

    await AsyncStorage.setItem(
      REWRITE_SCENE_KEY,
      JSON.stringify([entry, ...entries])
    );

    await addGrowth(15);

    Alert.alert(
      'Exercise Saved',
      'You completed Rewrite the Scene. Your garden grew by 15 points.'
    );

    router.push('/(tabs)/garden' as any);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🌿</Text>

      <Text style={styles.title}>Rewrite the Scene</Text>

      <Text style={styles.stepText}>
        Step {step + 1} of {steps.length}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{currentStep.title}</Text>

        <Text style={styles.subtitle}>{currentStep.subtitle}</Text>

        {currentStep.prompt !== '' && (
          <Text style={styles.prompt}>{currentStep.prompt}</Text>
        )}

        {currentStep.setValue && (
          <TextInput
            style={styles.input}
            value={currentStep.value}
            onChangeText={currentStep.setValue}
            placeholder={currentStep.placeholder}
            placeholderTextColor="#9B8AA8"
            multiline
            textAlignVertical="top"
          />
        )}

        {step === 0 && (
          <View style={styles.safetyBox}>
            <Text style={styles.safetyTitle}>Safety Reminder</Text>
            <Text style={styles.safetyText}>
              You are in control. You can stop at any time. If this memory feels
              overwhelming, pause, breathe, pray, journal, or reach out to a
              trusted person or counselor.
            </Text>
          </View>
        )}
      </View>

      {step === steps.length - 1 && (
        <View style={styles.closingCard}>
          <Text style={styles.closingTitle}>Gentle Closing</Text>
          <Text style={styles.closingText}>
            You cannot change what happened, but today you changed how you carry
            it. You are not trapped in that moment anymore.
          </Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {step < steps.length - 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={goNext}>
            <Text style={styles.nextButtonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={finishExercise}>
            <Text style={styles.nextButtonText}>Save Exercise</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 120,
  },
  icon: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  stepText: {
    color: '#E75480',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 22,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 18,
  },
  cardTitle: {
    color: '#4B1D7A',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#3F2A4D',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 18,
  },
  prompt: {
    color: '#4B1D7A',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 12,
  },
  input: {
    minHeight: 150,
    backgroundColor: '#F4E7F8',
    borderRadius: 18,
    padding: 15,
    fontSize: 16,
    color: '#3F2A4D',
  },
  safetyBox: {
    backgroundColor: '#FFF9F3',
    borderRadius: 20,
    padding: 18,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginTop: 8,
  },
  safetyTitle: {
    color: '#4B1D7A',
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  safetyText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  closingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
  },
  closingTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  closingText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    borderColor: '#4B1D7A',
    borderWidth: 2,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#E75480',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});