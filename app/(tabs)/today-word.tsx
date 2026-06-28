import { router } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { addGrowth } from '../../lib/garden';

export default function TodayWordScreen() {
  async function continueJourney() {
    await addGrowth(5);
    router.push('/(tabs)/daily-journey' as any);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.butterfly}>🦋</Text>

      <Text style={styles.title}>Today’s Word</Text>

      <Text style={styles.subtitle}>
        A scripture to help you breathe, focus, and keep going.
      </Text>

      <View style={styles.card}>
        <Text style={styles.scripture}>
          “For I know the thoughts that I think toward you, saith the Lord,
          thoughts of peace, and not of evil, to give you an expected end.”
        </Text>

        <Text style={styles.reference}>Jeremiah 29:11 KJV</Text>
      </View>

      <View style={styles.reflectionCard}>
        <Text style={styles.reflectionTitle}>Reflection</Text>

        <Text style={styles.reflectionText}>
          God has not forgotten you. Even when the path feels unclear, He still
          has a plan, a purpose, and an expected end for your life.
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={continueJourney}>
        <Text style={styles.primaryButtonText}>
          Continue Today’s Journey +5
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 90,
    alignItems: 'center',
  },
  butterfly: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 26,
    padding: 22,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 18,
  },
  scripture: {
    color: '#3F2A4D',
    fontSize: 20,
    lineHeight: 31,
    textAlign: 'center',
    fontWeight: '700',
  },
  reference: {
    color: '#D4AF37',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 16,
  },
  reflectionCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 20,
  },
  reflectionTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  reflectionText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  secondaryButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});