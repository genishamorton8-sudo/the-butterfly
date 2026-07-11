import { router } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth, db } from '../../lib/firebase';

const representationOptions = [
  {
    label: 'Default',
    value: 'default',
    emoji: '👋',
    description: 'Use standard emoji and neutral visuals.',
  },
  {
    label: 'Light',
    value: 'light',
    emoji: '👋🏻',
    description: 'Use light skin tone for emojis and avatar details.',
  },
  {
    label: 'Medium Light',
    value: 'mediumLight',
    emoji: '👋🏼',
    description: 'Use medium-light skin tone for emojis and avatar details.',
  },
  {
    label: 'Medium',
    value: 'medium',
    emoji: '👋🏽',
    description: 'Use medium skin tone for emojis and avatar details.',
  },
  {
    label: 'Medium Dark',
    value: 'mediumDark',
    emoji: '👋🏾',
    description: 'Use medium-dark skin tone for emojis and avatar details.',
  },
  {
    label: 'Dark',
    value: 'dark',
    emoji: '👋🏿',
    description: 'Use dark skin tone for emojis and avatar details.',
  },
];

export default function SkinToneScreen() {
  const [selectedTone, setSelectedTone] = useState('default');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPreference();
  }, []);

  async function loadPreference() {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        setSelectedTone(data.emojiSkinTone || 'default');
      }
    } catch {
      setSelectedTone('default');
    } finally {
      setLoading(false);
    }
  }

  async function savePreference() {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Not signed in', 'Please sign in again.');
      return;
    }

    try {
      setSaving(true);

      await setDoc(
        doc(db, 'users', user.uid),
        {
          emojiSkinTone: selectedTone,
          representationTone: selectedTone,
        },
        { merge: true }
      );

      Alert.alert('Saved', 'Your representation preference has been saved.');

      router.replace('/(tabs)/dashboard' as any);
    } catch {
      Alert.alert('Could not save', 'Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#E75480" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🦋</Text>

      <Text style={styles.title}>Choose Your Representation</Text>

      <Text style={styles.subtitle}>
        Choose how you want to be reflected in The Butterfly. This helps your
        emojis, avatar details, and future visuals feel more personal.
      </Text>

      <View style={styles.previewCard}>
        <Text style={styles.previewLabel}>Preview</Text>

        <Text style={styles.previewEmoji}>
          {representationOptions.find((option) => option.value === selectedTone)
            ?.emoji || '👋'}
        </Text>

        <Text style={styles.previewText}>
          This is how your selected tone will appear in supported parts of the app.
        </Text>
      </View>

      <View style={styles.card}>
        {representationOptions.map((option) => {
          const isSelected = selectedTone === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedTone(option.value)}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>

              <View style={styles.optionTextBox}>
                <Text style={styles.optionTitle}>{option.label}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>

              {isSelected && <Text style={styles.selectedText}>Selected</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={savePreference}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Preference'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 120,
    alignItems: 'center',
  },
  icon: {
    fontSize: 56,
    marginBottom: 10,
  },
  title: {
    fontSize: 31,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E75480',
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  previewCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    alignItems: 'center',
    marginBottom: 18,
  },
  previewLabel: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 8,
  },
  previewEmoji: {
    fontSize: 52,
    marginBottom: 8,
  },
  previewText: {
    color: '#3F2A4D',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#FFF9F3',
    borderWidth: 2,
    borderColor: '#F1D7A7',
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
  },
  optionButtonSelected: {
    borderColor: '#E75480',
    backgroundColor: '#FFF0F5',
  },
  optionEmoji: {
    fontSize: 38,
    textAlign: 'center',
    marginBottom: 8,
  },
  optionTextBox: {
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    color: '#4B1D7A',
    fontWeight: '900',
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 14,
    color: '#3F2A4D',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  selectedText: {
    fontSize: 13,
    color: '#E75480',
    fontWeight: '900',
    marginTop: 8,
    textAlign: 'center',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#E75480',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  backButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4B1D7A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});