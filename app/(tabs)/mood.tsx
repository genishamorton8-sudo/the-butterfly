import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { addGrowth } from '../../lib/garden';

const moods = [
  { emoji: '😊', name: 'Hopeful' },
  { emoji: '😔', name: 'Discouraged' },
  { emoji: '😟', name: 'Anxious' },
  { emoji: '😡', name: 'Angry' },
  { emoji: '😌', name: 'Peaceful' },
  { emoji: '🥹', name: 'Grateful' },
];

const MOOD_STORAGE_KEY = '@butterfly_today_mood';

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState('');

  useEffect(() => {
    loadSavedMood();
  }, []);

  async function loadSavedMood() {
    try {
      const savedMood = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
      if (savedMood) setSelectedMood(savedMood);
    } catch {
      Alert.alert('Unable to load mood', 'Please try again.');
    }
  }

  async function saveMood() {
    if (!selectedMood) {
      Alert.alert('Choose a mood', 'Please select how you are feeling first.');
      return;
    }

    try {
      await AsyncStorage.setItem(MOOD_STORAGE_KEY, selectedMood);
      await addGrowth(5);

      router.push({
        pathname: '/(tabs)/mood-response',
        params: { mood: selectedMood },
      } as any);
    } catch {
      Alert.alert('Unable to save mood', 'Please try again.');
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>How are you feeling today?</Text>

      <Text style={styles.subtitle}>
        Your feelings matter. God meets you where you are.
      </Text>

      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.name}
          style={[
            styles.moodButton,
            selectedMood === mood.name && styles.selectedButton,
          ]}
          onPress={() => setSelectedMood(mood.name)}
        >
          <Text
            style={[
              styles.moodText,
              selectedMood === mood.name && styles.selectedMoodText,
            ]}
          >
            {mood.emoji} {mood.name}
          </Text>
        </TouchableOpacity>
      ))}

      {selectedMood !== '' && (
        <View style={styles.card}>
          <Text style={styles.selectedLabel}>Today’s Mood</Text>
          <Text style={styles.bigMood}>{selectedMood}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={saveMood}>
        <Text style={styles.saveButtonText}>Save and Receive Encouragement</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 130,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#4B1D7A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    color: '#555555',
  },
  moodButton: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F1D7A7',
  },
  selectedButton: {
    backgroundColor: '#E75480',
  },
  moodText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#4B1D7A',
  },
  selectedMoodText: {
    color: '#FFFFFF',
  },
  card: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#F1D7A7',
  },
  selectedLabel: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4B1D7A',
    fontWeight: '700',
  },
  bigMood: {
    textAlign: 'center',
    fontSize: 30,
    color: '#E75480',
    fontWeight: '800',
    marginTop: 12,
  },
  saveButton: {
    backgroundColor: '#4B1D7A',
    paddingVertical: 17,
    borderRadius: 30,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
});