import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EggActivityScreen() {
  const [feeling, setFeeling] = useState('');
  const [hope, setHope] = useState('');
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <View style={styles.screen}>
        <Text style={styles.icon}>🥚✨</Text>
        <Text style={styles.title}>Egg Activity Complete</Text>
        <Text style={styles.message}>You showed up for yourself today.</Text>
        <Text style={styles.truth}>Pain lied. Purpose didn’t.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)/dashboard' as any)}
        >
          <Text style={styles.buttonText}>Go to My Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.icon}>🥚</Text>
      <Text style={styles.title}>Egg Activity</Text>
      <Text style={styles.subtitle}>Today is your beginning.</Text>

      <View style={styles.card}>
        <Text style={styles.scripture}>
          “Casting all your care upon him; for he careth for you.”
        </Text>
        <Text style={styles.reference}>1 Peter 5:7 KJV</Text>

        <Text style={styles.question}>How are you feeling today?</Text>

        <View style={styles.moodGrid}>
          {['Hopeful', 'Sad', 'Anxious', 'Angry', 'Numb', 'Tired'].map((mood) => (
            <TouchableOpacity
              key={mood}
              style={[styles.moodButton, feeling === mood && styles.selectedMood]}
              onPress={() => setFeeling(mood)}
            >
              <Text style={[styles.moodText, feeling === mood && styles.selectedMoodText]}>
                {mood}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.question}>Complete this sentence:</Text>
        <Text style={styles.prompt}>Today I hope...</Text>

        <TextInput
          style={styles.input}
          placeholder="Write your hope here..."
          placeholderTextColor="#9B8AA8"
          multiline
          value={hope}
          onChangeText={setHope}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setCompleted(true)}>
        <Text style={styles.buttonText}>Complete Egg Activity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3', paddingHorizontal: 24, paddingTop: 60, alignItems: 'center' },
  icon: { fontSize: 58, marginBottom: 10 },
  title: { color: '#4B1D7A', fontSize: 34, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#E75480', fontSize: 18, fontWeight: '700', marginBottom: 22 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 26, padding: 22, width: '100%', borderWidth: 2, borderColor: '#F1D7A7', marginBottom: 22 },
  scripture: { color: '#4B1D7A', fontSize: 17, lineHeight: 26, fontStyle: 'italic', textAlign: 'center', marginBottom: 8 },
  reference: { color: '#D4AF37', fontSize: 15, fontWeight: '800', textAlign: 'center', marginBottom: 24 },
  question: { color: '#3F2A4D', fontSize: 17, fontWeight: '800', marginBottom: 12 },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
  moodButton: { backgroundColor: '#F4E7F8', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20 },
  selectedMood: { backgroundColor: '#E75480' },
  moodText: { color: '#4B1D7A', fontWeight: '700' },
  selectedMoodText: { color: '#FFFFFF' },
  prompt: { color: '#E75480', fontSize: 18, fontWeight: '800', marginBottom: 10 },
  input: { backgroundColor: '#F4E7F8', minHeight: 100, borderRadius: 18, padding: 16, fontSize: 16, color: '#3F2A4D', textAlignVertical: 'top' },
  message: { color: '#3F2A4D', fontSize: 20, textAlign: 'center', lineHeight: 30, marginBottom: 10 },
  truth: { color: '#D4AF37', fontSize: 24, fontWeight: '800', textAlign: 'center', marginTop: 24, marginBottom: 40 },
  button: { backgroundColor: '#E75480', width: '100%', paddingVertical: 18, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
});