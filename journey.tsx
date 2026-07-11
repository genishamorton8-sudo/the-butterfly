import { router } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function JourneyScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🦋 Healing Journey</Text>

        <Text style={styles.subtitle}>
          Choose one gentle step for today.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today&apos;s Path</Text>
          <Text style={styles.cardText}>
            You do not have to do everything. Just take the next faithful step.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/butterfly-path' as any)}
        >
          <Text style={styles.buttonText}>Open Butterfly Path</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => router.push('/rewrite-scene' as any)}
        >
          <Text style={styles.outlineButtonText}>Rewrite the Scene</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => router.push('/(tabs)/change-the-thought' as any)}
        >
          <Text style={styles.outlineButtonText}>Change the Thought</Text>
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
    marginBottom: 24,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 10,
  },
  cardText: { fontSize: 16, color: '#555', lineHeight: 24 },
  button: {
    backgroundColor: '#E75480',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#4B1D7A',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  outlineButtonText: { color: '#4B1D7A', fontSize: 16, fontWeight: '900' },
});