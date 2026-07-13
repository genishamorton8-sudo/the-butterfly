import { router } from 'expo-router';
import { useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { addGrowth } from '../../lib/garden';

const WORDS = [
  'PEACE',
  'GRACE',
  'HOPE',
  'REST',
  'CALM',
  'TRUST',
  'FAITH',
  'LIGHT',
  'BRAVE',
  'GENTLE',
  'HEALED',
  'WORTHY',
];

function scramble(word: string): string {
  const letters = word.split('');

  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  const scrambled = letters.join('');

  return scrambled === word ? scramble(word) : scrambled;
}

function pickRound() {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 6);
}

export default function WordGardenScreen() {
  const [round] = useState(pickRound);
  const [index, setIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState(() => scramble(round[0]));
  const [guess, setGuess] = useState('');
  const [flowersGrown, setFlowersGrown] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);

  const currentWord = round[index];

  function checkGuess() {
    Keyboard.dismiss();

    if (guess.trim().toUpperCase() === currentWord) {
      setFeedback('correct');
      setFlowersGrown((count) => count + 1);

      setTimeout(() => {
        goToNext();
      }, 900);
    } else {
      setFeedback('wrong');

      setTimeout(() => {
        setFeedback(null);
      }, 900);
    }
  }

  async function goToNext() {
    const nextIndex = index + 1;

    if (nextIndex >= round.length) {
      await addGrowth(flowersGrown * 3 + 3);
      setFinished(true);
      return;
    }

    setIndex(nextIndex);
    setScrambledWord(scramble(round[nextIndex]));
    setGuess('');
    setFeedback(null);
  }

  function skipWord() {
    setGuess('');
    setFeedback(null);
    goToNext();
  }

  if (finished) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.finishedWrap}>
          <Text style={styles.finishedEmoji}>🌷🌼🌸</Text>

          <Text style={styles.finishedTitle}>
            You grew {flowersGrown} {flowersGrown === 1 ? 'flower' : 'flowers'} today.
          </Text>

          <Text style={styles.finishedText}>
            Every word you found is a small piece of peace planted in your garden.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace('/(tabs)/word-garden' as any)}
          >
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(tabs)/calming-games' as any)}
          >
            <Text style={styles.secondaryButtonText}>Back to Calming Games</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>🌸 Word Garden</Text>

          <Text style={styles.subtitle}>
            Unscramble the word below. Take your time.
          </Text>

          <Text style={styles.progressText}>
            Word {index + 1} of {round.length} · 🌼 {flowersGrown} grown
          </Text>

          <View style={styles.card}>
            <Text style={styles.scrambled}>{scrambledWord}</Text>

            <TextInput
              style={styles.input}
              placeholder="Type your answer..."
              placeholderTextColor="#B3A2C2"
              value={guess}
              onChangeText={setGuess}
              autoCapitalize="characters"
              autoCorrect={false}
              onSubmitEditing={checkGuess}
            />

            {feedback === 'correct' && (
              <Text style={styles.correctText}>🌸 Beautiful. That's right.</Text>
            )}

            {feedback === 'wrong' && (
              <Text style={styles.wrongText}>Not quite — take another breath and try again.</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={checkGuess}>
              <Text style={styles.buttonText}>Check My Answer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} onPress={skipWord}>
              <Text style={styles.skipText}>Skip this word</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '800',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 26,
    padding: 26,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    alignItems: 'center',
  },
  scrambled: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 6,
    color: '#E75480',
    marginBottom: 26,
  },
  input: {
    backgroundColor: '#F4E7F8',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#3F2A4D',
    letterSpacing: 3,
    marginBottom: 16,
  },
  correctText: {
    color: '#3E8E5A',
    fontWeight: '800',
    fontSize: 15,
    marginBottom: 14,
  },
  wrongText: {
    color: '#B3492A',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 26,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  skipButton: {
    marginTop: 14,
  },
  skipText: {
    color: '#8B7A90',
    fontSize: 14,
    fontWeight: '700',
  },
  finishedWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  finishedEmoji: {
    fontSize: 46,
    marginBottom: 20,
  },
  finishedTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 14,
  },
  finishedText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  secondaryButton: {
    marginTop: 14,
    borderWidth: 2,
    borderColor: '#4B1D7A',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 26,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 15,
    fontWeight: '900',
  },
});