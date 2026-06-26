import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
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

const JOURNAL_KEY = '@butterfly_journal_entries';

type JournalEntry = {
  id: string;
  date: string;
  text: string;
};

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  async function loadEntries() {
    const savedEntries = await AsyncStorage.getItem(JOURNAL_KEY);

    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }

  async function saveEntry() {
    Keyboard.dismiss();

    if (!entry.trim()) {
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      text: entry.trim(),
    };

    const updatedEntries = [newEntry, ...entries];

    await AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(updatedEntries));

    setEntries(updatedEntries);
    setEntry('');
    setSaved(true);
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.icon}>📝</Text>

          <Text style={styles.title}>My Journal</Text>

          <Text style={styles.subtitle}>
            Write what your heart needs to release.
          </Text>

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
                Saved. Your words matter.
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={saveEntry}>
            <Text style={styles.buttonText}>Save Journal Entry</Text>
          </TouchableOpacity>

          <Text style={styles.historyTitle}>Journal History</Text>

          {entries.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                No journal entries yet. Your story starts here.
              </Text>
            </View>
          ) : (
            entries.map((item) => (
              <View key={item.id} style={styles.entryCard}>
                <Text style={styles.entryDate}>{item.date}</Text>
                <Text style={styles.entryText}>{item.text}</Text>
              </View>
            ))
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
    color: '#E75480',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
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
    marginBottom: 28,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  historyTitle: {
    color: '#4B1D7A',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 16,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
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
  entryDate: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  entryText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
  },
});