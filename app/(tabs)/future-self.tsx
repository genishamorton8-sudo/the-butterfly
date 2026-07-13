import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { addJournalEntry } from '../../lib/journal';
import { completeExercise } from '../../lib/progress';

export default function FutureSelfScreen() {
  const [step, setStep] = useState(1);
  const [vision, setVision] = useState('');
  const [qualities, setQualities] = useState('');
  const [advice, setAdvice] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [promise, setPromise] = useState('');

  const totalSteps = 5;

  async function next() {
    Keyboard.dismiss();

    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    await addJournalEntry({
      id: Date.now().toString(),
      title: 'Future Self Reflection',
      exercise: 'Future Self',
      date: new Date().toISOString(),
      preview: promise || advice || vision || 'You took one step toward who you are becoming.',
      answers: {
        vision,
        qualities,
        advice,
        nextStep,
        promise,
      },
    });

    await completeExercise('Future Self');

    Alert.alert(
      'Hope restored',
      'Your Future Self reflection has been saved to your Healing Journal.'
    );
  }

  function back() {
    Keyboard.dismiss();
    if (step > 1) setStep(step - 1);
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Platform.OS === 'web' ? undefined : Keyboard.dismiss}>
        <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>🌸 Future Self</Text>
          <Text style={styles.progress}>Step {step} of {totalSteps}</Text>

          {step === 1 && (
            <Card title="Look Forward With Hope">
              <Text style={styles.body}>You are not only what happened to you.</Text>
              <Text style={styles.body}>You are still becoming.</Text>
              <Text style={styles.quote}>There is more life ahead.</Text>
            </Card>
          )}

          {step === 2 && (
            <Card title="Meet the You Who Is Healing">
              <Input placeholder="Describe the future version of you." value={vision} onChangeText={setVision} multiline />
              <Input placeholder="What qualities does this version of you carry?" value={qualities} onChangeText={setQualities} multiline />
            </Card>
          )}

          {step === 3 && (
            <Card title="Listen for Wisdom">
              <Input placeholder="What would your future self lovingly tell you today?" value={advice} onChangeText={setAdvice} multiline />
            </Card>
          )}

          {step === 4 && (
            <Card title="Take One Step">
              <Input placeholder="What is one small step you can take toward that version of you?" value={nextStep} onChangeText={setNextStep} multiline />
            </Card>
          )}

          {step === 5 && (
            <Card title="Make a Promise to Yourself">
              <Input placeholder="What promise do you want to make to the person you are becoming?" value={promise} onChangeText={setPromise} multiline />
              <Text style={styles.quote}>You are becoming, one Butterfly step at a time.</Text>
            </Card>
          )}

          <View style={styles.buttons}>
            {step > 1 && (
              <TouchableOpacity style={styles.backButton} onPress={back}>
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.nextButton} onPress={next}>
              <Text style={styles.nextText}>{step === totalSteps ? 'Finish' : 'Continue'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.homeButton} onPress={() => router.back()}>
            <Text style={styles.homeText}>Leave Exercise</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}

function Input(props: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}) {
  return (
    <TextInput
      style={[styles.input, props.multiline && styles.longInput]}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      multiline={props.multiline}
      textAlignVertical="top"
      returnKeyType="done"
      blurOnSubmit={!props.multiline}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  content: { padding: 24, paddingTop: 60, paddingBottom: 140 },
  title: { fontSize: 30, fontWeight: '900', color: '#4B1D7A', textAlign: 'center' },
  progress: { textAlign: 'center', color: '#E75480', fontSize: 18, fontWeight: '700', marginVertical: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 24, padding: 22, borderWidth: 2, borderColor: '#D4AF37', marginBottom: 24 },
  heading: { fontSize: 22, fontWeight: '900', color: '#4B1D7A', marginBottom: 16 },
  body: { fontSize: 17, color: '#555', lineHeight: 28, marginBottom: 10 },
  quote: { fontSize: 19, color: '#E75480', fontWeight: '800', textAlign: 'center', marginTop: 12 },
  input: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#DDD', padding: 16, marginBottom: 16, minHeight: 58, fontSize: 16 },
  longInput: { minHeight: 120 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  backButton: { flex: 1, borderWidth: 2, borderColor: '#4B1D7A', borderRadius: 30, padding: 16, alignItems: 'center', marginRight: 10 },
  backText: { color: '#4B1D7A', fontWeight: '800', fontSize: 16 },
  nextButton: { flex: 1, backgroundColor: '#E75480', borderRadius: 30, padding: 16, alignItems: 'center' },
  nextText: { color: '#FFF', fontWeight: '900', fontSize: 17 },
  homeButton: { marginTop: 18, alignItems: 'center' },
  homeText: { color: '#4B1D7A', fontWeight: '800' },
});