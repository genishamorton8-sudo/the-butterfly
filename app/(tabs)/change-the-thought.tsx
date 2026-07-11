import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { addJournalEntry } from '../../lib/journal';
import { completeExercise } from '../../lib/progress';

export default function ChangeTheThoughtScreen() {
  const [step, setStep] = useState(1);

  const [whatHappened, setWhatHappened] = useState('');
  const [painfulThought, setPainfulThought] = useState('');
  const [truth, setTruth] = useState('');

  async function finishExercise() {
    await addJournalEntry({
      id: Date.now().toString(),
      title: 'Change the Thought Reflection',
      exercise: 'Change the Thought',
      date: new Date().toISOString(),
      preview: truth || painfulThought || whatHappened || 'One thought changed today.',
      answers: {
        whatHappened,
        painfulThought,
        truth,
      },
    });

    await completeExercise('Change the Thought');

    Alert.alert(
      'Thought changed',
      'Your new truth has been saved to your Healing Journal.'
    );

    setStep(5);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🧠 Change the Thought</Text>

        {step === 1 && (
          <>
            <Text style={styles.question}>What brings you here today?</Text>

            <TouchableOpacity style={styles.choice} onPress={() => setStep(2)}>
              <Text style={styles.choiceTitle}>🌧 Something happened today</Text>
              <Text style={styles.choiceText}>
                Help me process something that happened today.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.choice} onPress={() => setStep(100)}>
              <Text style={styles.choiceTitle}>
                🦋 Something today reminded me of an older hurt
              </Text>
              <Text style={styles.choiceText}>
                Help me understand why this affected me so deeply.
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.question}>Tell me what happened.</Text>

            <TextInput
              style={styles.input}
              multiline
              placeholder="I'm listening..."
              value={whatHappened}
              onChangeText={setWhatHappened}
            />

            <TouchableOpacity style={styles.button} onPress={() => setStep(3)}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.question}>What thought hurt the most?</Text>

            <TextInput
              style={styles.input}
              multiline
              placeholder="Example: I'm not enough."
              value={painfulThought}
              onChangeText={setPainfulThought}
            />

            <TouchableOpacity style={styles.button} onPress={() => setStep(4)}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.question}>
              What is a healthier truth you can choose today?
            </Text>

            <TextInput
              style={styles.input}
              multiline
              placeholder="Write your new thought..."
              value={truth}
              onChangeText={setTruth}
            />

            <TouchableOpacity style={styles.button} onPress={finishExercise}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 5 && (
          <>
            <Text style={styles.finish}>🦋 One thought changed today.</Text>

            <Text style={styles.finishText}>
              Every healthier thought is another step toward healing.
            </Text>
          </>
        )}

        {step === 100 && (
          <>
            <Text style={styles.question}>
              This sounds like an older wound may have been triggered.
            </Text>

            <Text style={styles.finishText}>
              In the next step we'll gently guide you into Rewrite the Scene.
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.continueButton]}
              onPress={() => router.push('/(tabs)/rewrite-scene' as any)}
            >
              <Text style={styles.buttonText}>Continue to Rewrite the Scene</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  content: { padding: 24, paddingTop: 60, paddingBottom: 100 },
  title: { fontSize: 30, fontWeight: '900', color: '#4B1D7A', textAlign: 'center', marginBottom: 30 },
  question: { fontSize: 22, fontWeight: '800', color: '#4B1D7A', marginBottom: 20 },
  choice: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 2, borderColor: '#D4AF37' },
  choiceTitle: { fontSize: 18, fontWeight: '800', color: '#4B1D7A', marginBottom: 8 },
  choiceText: { fontSize: 15, color: '#555' },
  input: { backgroundColor: '#FFFFFF', borderRadius: 18, minHeight: 180, padding: 16, textAlignVertical: 'top', marginBottom: 25, borderWidth: 1, borderColor: '#DDD' },
  button: { backgroundColor: '#E75480', padding: 18, borderRadius: 30, alignItems: 'center' },
  continueButton: { marginTop: 30 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  finish: { fontSize: 28, color: '#4B1D7A', fontWeight: '900', textAlign: 'center', marginTop: 40 },
  finishText: { fontSize: 17, color: '#555', textAlign: 'center', marginTop: 18, lineHeight: 26 },
});