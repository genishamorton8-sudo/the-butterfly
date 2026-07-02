import { router } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { butterflyBrain } from '../lib/butterfly-brain';

export default function CheckInScreen() {
  const [entry, setEntry] = useState('');

  const handleContinue = () => {
    const result = butterflyBrain(entry);

    router.push({
      pathname: '/brain-result' as any,
      params: {
        theme: result.theme,
        recommendation: result.recommendation,
        scripture: result.scripture,
        prayer: result.prayer,
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🦋 Daily Check-In</Text>

        <Text style={styles.subtitle}>
          Tell Butterfly what's on your heart today.
        </Text>

        <TextInput
          style={styles.input}
          multiline
          placeholder="How are you feeling today?"
          value={entry}
          onChangeText={setEntry}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  content: { padding: 24, paddingTop: 60, paddingBottom: 100 },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  input: {
    minHeight: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 16,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#E75480',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
});