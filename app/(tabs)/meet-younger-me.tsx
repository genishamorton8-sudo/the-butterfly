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

export default function MeetYoungerMeScreen() {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [feeling, setFeeling] = useState('');
  const [needed, setNeeded] = useState('');
  const [message, setMessage] = useState('');
  const [promise, setPromise] = useState('');

  const totalSteps = 5;

  function next() {
    Keyboard.dismiss();

    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    Alert.alert(
      'Beautiful work',
      'You showed kindness to younger you today.'
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>👧 Meet Younger Me</Text>
          <Text style={styles.progress}>Step {step} of {totalSteps}</Text>

          {step === 1 && (
            <Card title="Begin Gently">
              <Text style={styles.body}>
                This exercise helps you comfort the younger version of you who needed care.
              </Text>
              <Text style={styles.quote}>You do not have to rush.</Text>
            </Card>
          )}

          {step === 2 && (
            <Card title="Picture Younger You">
              <Input placeholder="How old is younger you?" value={age} onChangeText={setAge} />
              <Input placeholder="What does younger you seem to be feeling?" value={feeling} onChangeText={setFeeling} multiline />
            </Card>
          )}

          {step === 3 && (
            <Card title="Listen With Compassion">
              <Input placeholder="What did younger you need back then?" value={needed} onChangeText={setNeeded} multiline />
            </Card>
          )}

          {step === 4 && (
            <Card title="Speak Kindly">
              <Input placeholder="What loving words would you say to younger you?" value={message} onChangeText={setMessage} multiline />
            </Card>
          )}

          {step === 5 && (
            <Card title="Carry Them Forward">
              <Input placeholder="What promise do you want to make to younger you today?" value={promise} onChangeText={setPromise} multiline />
              <Text style={styles.quote}>You are not leaving yourself behind anymore.</Text>
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