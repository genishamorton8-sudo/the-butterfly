import { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RewriteSceneScreen() {
  const [step, setStep] = useState(1);

  const [age, setAge] = useState('');
  const [memory, setMemory] = useState('');
  const [emotion, setEmotion] = useState('');
  const [belief, setBelief] = useState('');
  const [needed, setNeeded] = useState('');
  const [protector, setProtector] = useState('');
  const [words, setWords] = useState('');
  const [changes, setChanges] = useState('');

  function next() {
    if (step < 5) {
      setStep(step + 1);
      return;
    }

    Alert.alert(
      'Beautiful Work',
      'You have completed the first half of Rewrite the Scene.'
    );
  }

  function back() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>🌅 Rewrite the Scene</Text>

        <Text style={styles.progress}>
          Step {step} of 5
        </Text>

        {step === 1 && (
          <View style={styles.card}>
            <Text style={styles.heading}>Prepare</Text>

            <Text style={styles.body}>
              Before we begin, remember you are in control.
            </Text>

            <Text style={styles.body}>
              You may stop at any time.
            </Text>

            <Text style={styles.body}>
              This exercise is about healing, not reliving pain.
            </Text>

            <Text style={styles.quote}>
              "You are safe right now."
            </Text>
          </View>
        )}

        {step === 2 && (
          <View style={styles.card}>
            <Text style={styles.heading}>Ground Yourself</Text>

            <Text style={styles.body}>Take one slow breath.</Text>
            <Text style={styles.body}>Notice five things you can see.</Text>
            <Text style={styles.body}>Notice four things you can feel.</Text>
            <Text style={styles.body}>
              Remind yourself:
            </Text>

            <Text style={styles.quote}>
              I am safe.
            </Text>
          </View>
        )}

        {step === 3 && (
          <View style={styles.card}>

            <Text style={styles.heading}>Meet Younger You</Text>

            <TextInput
              style={styles.input}
              placeholder="How old were you?"
              value={age}
              onChangeText={setAge}
            />

            <TextInput
              style={styles.input}
              placeholder="What happened?"
              multiline
              value={memory}
              onChangeText={setMemory}
            />

            <TextInput
              style={styles.input}
              placeholder="What emotion stands out?"
              value={emotion}
              onChangeText={setEmotion}
            />

            <TextInput
              style={styles.input}
              placeholder="What did you believe about yourself?"
              multiline
              value={belief}
              onChangeText={setBelief}
            />

          </View>
        )}

        {step === 4 && (
          <View style={styles.card}>

            <Text style={styles.heading}>
              What Did You Need?
            </Text>

            <TextInput
              style={styles.input}
              placeholder="What did younger you need?"
              multiline
              value={needed}
              onChangeText={setNeeded}
            />

          </View>
        )}

        {step === 5 && (
          <View style={styles.card}>

            <Text style={styles.heading}>
              Rewrite the Scene
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Who enters the memory?"
              value={protector}
              onChangeText={setProtector}
            />

            <TextInput
              style={styles.input}
              placeholder="What do they say?"
              multiline
              value={words}
              onChangeText={setWords}
            />

            <TextInput
              style={styles.input}
              placeholder="What changes?"
              multiline
              value={changes}
              onChangeText={setChanges}
            />

          </View>
        )}

        <View style={styles.buttons}>

          {step > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={back}
            >
              <Text style={styles.backText}>
                Back
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={next}
          >
            <Text style={styles.nextText}>
              {step === 5 ? 'Finish' : 'Continue'}
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 10,
  },
  progress: {
    textAlign: 'center',
    color: '#E75480',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 16,
  },
  body: {
    fontSize: 17,
    color: '#555',
    lineHeight: 28,
    marginBottom: 10,
  },
  quote: {
    fontSize: 20,
    color: '#E75480',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 16,
    marginBottom: 16,
    minHeight: 60,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#4B1D7A',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginRight: 10,
  },
  backText: {
    color: '#4B1D7A',
    fontWeight: '800',
    fontSize: 16,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#E75480',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
  },
  nextText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 17,
  },
});