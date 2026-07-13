import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
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

import { addGrowth } from '../../lib/garden';
import { getJournal } from '../../lib/journal';
import { loadData, saveData } from '../../lib/storage';
import { JournalEntry as HealingJournalEntry } from '../../types/healing';

const REFLECTIONS_KEY = '@butterfly_journal_entries';

type ReflectionEntry = {
  id: string;
  date: string;
  text: string;
};

type JournalTab = 'reflect' | 'healing';

export default function JournalScreen() {
  const params = useLocalSearchParams<{ tab?: string }>();
  const initialTab: JournalTab = params.tab === 'healing' ? 'healing' : 'reflect';

  const [activeTab, setActiveTab] = useState<JournalTab>(initialTab);

  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [healingEntries, setHealingEntries] = useState<HealingJournalEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadReflections();
      loadHealingJournal();
    }, [])
  );

  async function loadReflections() {
    const savedEntries = await loadData<ReflectionEntry[]>(REFLECTIONS_KEY);

    if (savedEntries) {
      setReflections(savedEntries);
    }
  }

  async function loadHealingJournal() {
    const journal = await getJournal();
    setHealingEntries(journal);
  }

  async function saveReflection() {
    Keyboard.dismiss();

    if (!entry.trim()) {
      return;
    }

    const newEntry: ReflectionEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      text: entry.trim(),
    };

    const updatedEntries = [newEntry, ...reflections];

    await saveData(REFLECTIONS_KEY, updatedEntries);
    await addGrowth(10);

    setReflections(updatedEntries);
    setEntry('');
    setSaved(true);
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Platform.OS === 'web' ? undefined : Keyboard.dismiss}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.icon}>📖</Text>

          <Text style={styles.title}>Journal</Text>

          <Text style={styles.subtitle}>
            Everything your heart has written and healed is here.
          </Text>

          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'reflect' && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab('reflect')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'reflect' && styles.tabButtonTextActive,
                ]}
              >
                My Reflections
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'healing' && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab('healing')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'healing' && styles.tabButtonTextActive,
                ]}
              >
                Healing Journey
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'reflect' && (
            <>
              <View style={styles.card}>
                <Text style={styles.prompt}>Today I am learning...</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Write your journal entry here..."
                  placeholderTextColor="#9B8AA8"
                  multiline
                  value={entry}
                  onChangeText={(text) => {
                    setEntry(text);
                    setSaved(false);
                  }}
                  textAlignVertical="top"
                />

                <TouchableOpacity style={styles.doneButton} onPress={Keyboard.dismiss}>
                  <Text style={styles.doneButtonText}>Done Writing</Text>
                </TouchableOpacity>

                {saved && (
                  <Text style={styles.savedText}>
                    Saved. 🌸 Your garden grew by 10 points.
                  </Text>
                )}
              </View>

              <TouchableOpacity style={styles.button} onPress={saveReflection}>
                <Text style={styles.buttonText}>Save Journal Entry</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => router.push('/(tabs)/celebrate' as any)}
              >
                <Text style={styles.continueButtonText}>Continue to Celebrate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace('/(tabs)/dashboard' as any)}
              >
                <Text style={styles.backButtonText}>Back to Dashboard</Text>
              </TouchableOpacity>

              <Text style={styles.historyTitle}>Journal History</Text>

              {reflections.length === 0 ? (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyText}>
                    No journal entries yet. Your story starts here.
                  </Text>
                </View>
              ) : (
                reflections.map((item) => (
                  <View key={item.id} style={styles.entryCard}>
                    <Text style={styles.entryDate}>{item.date}</Text>
                    <Text style={styles.entryText}>{item.text}</Text>
                  </View>
                ))
              )}
            </>
          )}

          {activeTab === 'healing' && (
            <>
              {healingEntries.length === 0 ? (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyTitle}>
                    Your healing journey is waiting.
                  </Text>

                  <Text style={styles.emptyText}>
                    Complete one of the Butterfly healing exercises and your
                    reflections will appear here automatically.
                  </Text>
                </View>
              ) : (
                healingEntries.map((item) => (
                  <View key={item.id} style={styles.entryCard}>
                    <Text style={styles.exercise}>{item.exercise}</Text>

                    <Text style={styles.entryTitle}>{item.title}</Text>

                    <Text style={styles.entryDate}>
                      {new Date(item.date).toLocaleDateString()}
                    </Text>

                    <Text style={styles.entryText}>{item.preview}</Text>
                  </View>
                ))
              )}
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 120,
    alignItems: 'center',
  },
  icon: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#8B7A90',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 22,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F1E4EC',
    borderRadius: 30,
    padding: 4,
    width: '100%',
    marginBottom: 22,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 26,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#E75480',
  },
  tabButtonText: {
    color: '#4B1D7A',
    fontWeight: '800',
    fontSize: 13,
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 26,
    padding: 22,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 22,
  },
  prompt: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 14,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F4E7F8',
    minHeight: 180,
    borderRadius: 18,
    padding: 16,
    fontSize: 17,
    color: '#3F2A4D',
  },
  doneButton: {
    marginTop: 14,
    borderColor: '#4B1D7A',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#4B1D7A',
    fontWeight: '800',
    fontSize: 16,
  },
  savedText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  continueButton: {
    backgroundColor: '#4B1D7A',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  backButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 28,
  },
  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '800',
  },
  historyTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 24,
    borderWidth: 2,
    borderColor: '#F1D7A7',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    color: '#3F2A4D',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 18,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 14,
  },
  exercise: {
    color: '#E75480',
    fontWeight: '800',
    marginBottom: 6,
    fontSize: 13,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 4,
  },
  entryDate: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  entryText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
  },
});
