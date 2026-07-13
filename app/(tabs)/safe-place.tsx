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

export default function SafePlaceScreen() {
  const [step, setStep] = useState(1);

  const [place, setPlace] = useState('');
  const [sights, setSights] = useState('');
  const [sounds, setSounds] = useState('');
  const [smells, setSmells] = useState('');
  const [safeFeeling, setSafeFeeling] = useState('');
  const [companion, setCompanion] = useState('');
  const [message, setMessage] = useState('');

  const totalSteps = 6;

  async function next() {
    Keyboard.dismiss();

    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    await addJournalEntry({
      id: Date.now().toString(),
      title: 'Safe Place Reflection',
      exercise: 'Safe Place',
      date: new Date().toISOString(),
      preview: message || safeFeeling || place || 'You created a safe place to return to.',
      answers: {
        place,
        sights,
        sounds,
        smells,
        safeFeeling,
        companion,
        message,
      },
    });

    await completeExercise('Safe Place');

    Alert.alert(
      'Peace Found',
      'Your Safe Place has been saved to your Healing Journal.'
    );
  }

  function back() {
    Keyboard.dismiss();
    if (step > 1) setStep(step - 1);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Platform.OS === 'web' ? undefined : Keyboard.dismiss}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>🏡 Safe Place</Text>
          <Text style={styles.progress}>
            Step {step} of {totalSteps}
          </Text>

          {step === 1 && (
            <Card title="Welcome">
              <Text style={styles.body}>Close your eyes for a moment if you feel comfortable.</Text>
              <Text style={styles.body}>Imagine a place where you feel completely safe.</Text>
              <Text style={styles.body}>There is no danger here.</Text>
              <Text style={styles.body}>No pressure.</Text>
              <Text style={styles.body}>No expectations.</Text>
              <Text style={styles.quote}>You are safe here.</Text>
            </Card>
          )}

          {step === 2 && (
            <Card title="Where Are You?">
              <Input placeholder="Describe your safe place..." value={place} onChangeText={setPlace} multiline />
              <Input placeholder="What do you see?" value={sights} onChangeText={setSights} multiline />
            </Card>
          )}

          {step === 3 && (
            <Card title="Use Your Senses">
              <Input placeholder="What do you hear?" value={sounds} onChangeText={setSounds} multiline />
              <Input placeholder="What do you smell?" value={smells} onChangeText={setSmells} multiline />
            </Card>
          )}

          {step === 4 && (
            <Card title="Feel the Peace">
              <Input placeholder="What makes this place feel completely safe?" value={safeFeeling} onChangeText={setSafeFeeling} multiline />
            </Card>
          )}

          {step === 5 && (
            <Card title="Who Is With You?">
              <Text style={styles.body}>Someone may be with you here...</Text>
              <Text style={styles.body}>Jesus.</Text>
              <Text style={styles.body}>A loved one.</Text>
              <Text style={styles.body}>A trusted friend.</Text>
              <Text style={styles.body}>A pet.</Text>
              <Text style={styles.body}>Or no one at all.</Text>

              <Input placeholder="Who is here with you?" value={companion} onChangeText={setCompanion} />
              <Input placeholder="What do they want you to know?" value={message} onChangeText={setMessage} multiline />
            </Card>
          )}

          {step === 6 && (
            <Card title="Return Anytime">
              <Text style={styles.body}>Take one slow breath.</Text>
              <Text style={styles.body}>Feel your shoulders relax.</Text>
              <Text style={styles.body}>Notice the peace you've created.</Text>
              <Text style={styles.body}>Whenever life feels overwhelming...</Text>
              <Text style={styles.body}>You can come back here.</Text>
              <Text style={styles.quote}>This place belongs to you.</Text>
            </Card>
          )}

          <View style={styles.buttons}>
            {step > 1 && (
              <TouchableOpacity style={styles.backButton} onPress={back}>
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.nextButton} onPress={next}>
              <Text style={styles.nextText}>
                {step === totalSteps ? 'Finish' : 'Continue'}
              </Text>
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

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
  quote: { fontSize: 20, color: '#E75480', fontWeight: '800', textAlign: 'center', marginTop: 12 },
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