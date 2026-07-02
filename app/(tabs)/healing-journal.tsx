import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { getJournal } from '../../lib/journal';
import { JournalEntry } from '../../types/healing';

export default function HealingJournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    loadJournal();
  }, []);

  async function loadJournal() {
    const journal = await getJournal();
    setEntries(journal);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.icon}>📖</Text>

      <Text style={styles.title}>
        My Healing Journal
      </Text>

      <Text style={styles.subtitle}>
        Every healing step you've taken is safely gathered here.
      </Text>

      {entries.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            Your journal is waiting.
          </Text>

          <Text style={styles.emptyText}>
            Complete one of the Butterfly healing exercises and your
            reflections will appear here automatically.
          </Text>
        </View>
      ) : (
        entries.map((entry) => (
          <View key={entry.id} style={styles.card}>
            <Text style={styles.exercise}>
              {entry.exercise}
            </Text>

            <Text style={styles.entryTitle}>
              {entry.title}
            </Text>

            <Text style={styles.date}>
              {new Date(entry.date).toLocaleDateString()}
            </Text>

            <Text style={styles.preview}>
              {entry.preview}
            </Text>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>
          Back
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
    padding: 24,
    paddingTop: 70,
    paddingBottom: 120,
  },

  icon: {
    fontSize: 54,
    textAlign: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginTop: 12,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 14,
    marginBottom: 30,
    lineHeight: 24,
  },

  emptyCard: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 24,
    borderWidth: 2,
    borderColor: '#F1D7A7',
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 14,
  },

  emptyText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#555',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#F1D7A7',
  },

  exercise: {
    color: '#E75480',
    fontWeight: '800',
    marginBottom: 6,
  },

  entryTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4B1D7A',
  },

  date: {
    color: '#777',
    marginVertical: 8,
  },

  preview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },

  button: {
    backgroundColor: '#E75480',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 18,
  },
});