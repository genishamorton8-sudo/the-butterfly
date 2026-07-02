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

export default function BrainResultScreen() {
  const params = useLocalSearchParams<{
    theme?: HealingTheme;
  }>();

  const theme = params.theme ?? 'none';
  const path = getHealingPath(theme);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🧠 Butterfly Brain</Text>

        <Text style={styles.subtitle}>
          Based on what you shared, Butterfly created a gentle path for today.
        </Text>

        <View style={styles.heroCard}>
          <Text style={styles.pathTitle}>{path.title}</Text>
          <Text style={styles.message}>{path.message}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Healing Theme</Text>
          <Text style={styles.value}>{theme}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Scripture</Text>
          <Text style={styles.value}>{path.scripture}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Prayer Focus</Text>
          <Text style={styles.value}>{path.prayer}</Text>
        </View>

        <Text style={styles.sectionTitle}>Today&apos;s Suggested Steps</Text>

        {path.steps.map((step) => (
          <TouchableOpacity
            key={step.title}
            style={styles.stepCard}
            onPress={() => router.push(step.route as any)}
          >
            <View style={styles.stepRow}>
              <Text style={styles.stepEmoji}>{step.emoji}</Text>

              <View style={styles.stepTextWrap}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepText}>{step.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/butterfly-path' as any)}
        >
          <Text style={styles.buttonText}>Open Full Butterfly Path</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
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
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#D4AF37',
    padding: 22,
    marginBottom: 18,
    alignItems: 'center',
  },
  pathTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#E75480',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#3F2A4D',
    lineHeight: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    padding: 18,
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    color: '#555',
    lineHeight: 26,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    padding: 18,
    marginBottom: 14,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepEmoji: {
    fontSize: 34,
    marginRight: 14,
  },
  stepTextWrap: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 6,
  },
  stepText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#E75480',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  secondaryButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});