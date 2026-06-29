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

const moodSections = [
  {
    title: '🌞 Feeling Good',
    moods: [
      { emoji: '😊', name: 'Happy' },
      { emoji: '😄', name: 'Joyful' },
      { emoji: '🥹', name: 'Grateful' },
      { emoji: '😌', name: 'Peaceful' },
      { emoji: '💪', name: 'Strong' },
      { emoji: '🌟', name: 'Hopeful' },
      { emoji: '😎', name: 'Confident' },
      { emoji: '❤️', name: 'Loved' },
      { emoji: '🙌', name: 'Encouraged' },
      { emoji: '🎉', name: 'Excited' },
    ],
  },
  {
    title: '🌤 Mixed Feelings',
    moods: [
      { emoji: '😐', name: 'Meh' },
      { emoji: '🤔', name: 'Confused' },
      { emoji: '😕', name: 'Unsure' },
      { emoji: '😩', name: 'Tired' },
      { emoji: '😮', name: 'Overwhelmed' },
      { emoji: '😬', name: 'Nervous' },
      { emoji: '😶', name: 'Numb' },
    ],
  },
  {
    title: '🌧 Having a Hard Day',
    moods: [
      { emoji: '😔', name: 'Sad' },
      { emoji: '😢', name: 'Heartbroken' },
      { emoji: '😰', name: 'Scared' },
      { emoji: '😟', name: 'Anxious' },
      { emoji: '💔', name: 'Rejected' },
      { emoji: '🫥', name: 'Invisible' },
      { emoji: '😞', name: 'Lonely' },
      { emoji: '😡', name: 'Angry' },
      { emoji: '😣', name: 'Stressed' },
      { emoji: '😖', name: 'Frustrated' },
      { emoji: '😔', name: 'Discouraged' },
      { emoji: '😭', name: 'Grieving' },
      { emoji: '😥', name: 'Ashamed' },
      { emoji: '😓', name: 'Guilty' },
      { emoji: '🥀', name: 'Hopeless' },
    ],
  },
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
      Alert.alert('Choose a mood', 'Please select how your heart feels today.');
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
      <Text style={styles.butterfly}>🦋</Text>

      <Text style={styles.title}>How is your heart today?</Text>

      <Text style={styles.subtitle}>
        There is no wrong answer. God meets you where you are.
      </Text>

      {moodSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>

          <View style={styles.moodGrid}>
            {section.moods.map((mood) => (
              <TouchableOpacity
                key={mood.name}
                style={[
                  styles.moodButton,
                  selectedMood === mood.name && styles.selectedButton,
                ]}
                onPress={() => setSelectedMood(mood.name)}
              >
                <Text style={styles.emoji}>{mood.emoji}</Text>

                <Text
                  style={[
                    styles.moodText,
                    selectedMood === mood.name && styles.selectedMoodText,
                  ]}
                >
                  {mood.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {selectedMood !== '' && (
        <View style={styles.card}>
          <Text style={styles.selectedLabel}>Today’s Heart Check</Text>
          <Text style={styles.bigMood}>{selectedMood}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={saveMood}>
        <Text style={styles.saveButtonText}>
          Save and Receive Encouragement
        </Text>
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
    padding: 22,
    paddingTop: 60,
    paddingBottom: 130,
  },
  butterfly: {
    fontSize: 54,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 28,
    color: '#555555',
    lineHeight: 24,
  },
  section: {
    marginBottom: 26,
  },
  sectionTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#E75480',
    borderColor: '#E75480',
  },
  emoji: {
    fontSize: 26,
    marginBottom: 6,
  },
  moodText: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    color: '#4B1D7A',
  },
  selectedMoodText: {
    color: '#FFFFFF',
  },
  card: {
    marginTop: 6,
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
    fontWeight: '800',
  },
  bigMood: {
    textAlign: 'center',
    fontSize: 30,
    color: '#E75480',
    fontWeight: '900',
    marginTop: 12,
  },
  saveButton: {
    backgroundColor: '#4B1D7A',
    paddingVertical: 17,
    borderRadius: 30,
    marginTop: 22,
  },
  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
  },
});