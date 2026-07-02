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

export default function MirrorTruthScreen() {
  const [step, setStep] = useState(1);
  const [lie, setLie] = useState('');
  const [source, setSource] = useState('');
  const [truth, setTruth] = useState('');
  const [scripture, setScripture] = useState('');
  const [declaration, setDeclaration] = useState('');

  const totalSteps = 5;

  function next() {
    Keyboard.dismiss();

    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    Alert.alert('Truth received', 'You replaced a lie with truth today.');
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
          <Text style={styles.title}>🪞 Mirror Truth</Text>
          <Text style={styles.progress}>Step {step} of {totalSteps}</Text>

          {step === 1 && (
            <Card title="Look With Kindness">
              <Text style={styles.body}>
                This is not about criticizing yourself.
              </Text>
              <Text style={styles.body}>
                This is about noticing the words you have carried and choosing
                truth instead.
              </Text>
              <Text style={styles.quote}>You are allowed to see yourself gently.</Text>
            </Card>
          )}

          {step === 2 && (
            <Card title="Name the Lie">
              <Input
                placeholder="What lie have you been believing about yourself?"
                value={lie}
                onChangeText={setLie}
                multiline
              />
              <Input
                placeholder="Where do you think that lie came from?"
                value={source}
                onChangeText={setSource}
                multiline
              />
            </Card>
          )}

          {step === 3 && (
            <Card title="Choose the Truth">
              <Input
                placeholder="What is the truth instead?"
                value={truth}
                onChangeText={setTruth}
                multiline
              />
              <Text style={styles.helper}>
                Example: I am not rejected. I am loved, seen, and still becoming.
              </Text>
            </Card>
          )}

          {step === 4 && (
            <Card title="Anchor It in the Word">
              <Text style={styles.scripture}>
                “I will praise thee; for I am fearfully and wonderfully made.”
              </Text>
              <Text style={styles.reference}>Psalm 139:14</Text>

              <Input
                placeholder="What scripture or truth do you want to remember?"
                value={scripture}
                onChangeText={setScripture}
                multiline
              />
            </Card>
          )}

          {step === 5 && (
            <Card title="Speak It Over Yourself">
              <Input
                placeholder="Write your declaration: I am..."
                value={declaration}
                onChangeText={setDeclaration}
                multiline
              />
              <Text style={styles.quote}>Truth looks good on you.</Text>
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
  helper: { fontSize: 14, color: '#6B4A78', lineHeight: 22, marginTop: -4 },
  scripture: { fontSize: 18, color: '#3F2A4D', fontStyle: 'italic', lineHeight: 28, marginBottom: 8, textAlign: 'center' },
  reference: { color: '#4B1D7A', fontWeight: '900', textAlign: 'center', marginBottom: 16 },
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