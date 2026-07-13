import { router, useLocalSearchParams } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { HealingTheme } from '../lib/butterfly-brain';
import { getHealingPath } from '../lib/healing-paths';

export default function ButterflyPathScreen() {
  const params = useLocalSearchParams<{
    theme?: HealingTheme;
  }>();

  const theme = params.theme ?? 'none';
  const path = getHealingPath(theme);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🦋 {path.title}</Text>

        <Text style={styles.subtitle}>
          {path.message}
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Scripture</Text>
          <Text style={styles.infoText}>{path.scripture}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Prayer Focus</Text>
          <Text style={styles.infoText}>{path.prayer}</Text>
        </View>

        <Text style={styles.sectionTitle}>Your Suggested Steps</Text>

        {path.steps.map((step) => (
          <PathCard
            key={step.title}
            emoji={step.emoji}
            title={step.title}
            text={step.description}
            route={step.route}
          />
        ))}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/dashboard' as any)}
        >
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function PathCard({
  emoji,
  title,
  text,
  route,
}: {
  emoji: string;
  title: string;
  text: string;
  route: string;
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(route as any)}
    >
      <View style={styles.row}>
        <Text style={styles.emoji}>{emoji}</Text>

        <View style={styles.cardTextWrap}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardText}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    padding: 18,
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 17,
    color: '#555',
    lineHeight: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    padding: 18,
    marginBottom: 16,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  emoji: { fontSize: 34, marginRight: 14 },
  cardTextWrap: { flex: 1 },
  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  backButton: {
    borderWidth: 2,
    borderColor: '#4B1D7A',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});