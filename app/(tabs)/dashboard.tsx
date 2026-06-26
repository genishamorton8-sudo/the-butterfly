import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getProgress } from '../../.claude/lib/progress';

const MOOD_STORAGE_KEY = '@butterfly_today_mood';

export default function DashboardScreen() {
  const [progress, setProgress] = useState(20);
  const [todayMood, setTodayMood] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [])
  );

  async function loadDashboard() {
    const savedProgress = await getProgress();
    const savedMood = await AsyncStorage.getItem(MOOD_STORAGE_KEY);

    setProgress(savedProgress);
    setTodayMood(savedMood ?? '');
  }

  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return '☀️ Good Morning, Genisha';
    if (hour < 18) return '🌤️ Good Afternoon, Genisha';
    return '🌙 Good Evening, Genisha';
  }

  function getStageName() {
    if (progress >= 100) return '🦋 Butterfly';
    if (progress >= 75) return '✨ Emerging Butterfly';
    if (progress >= 50) return '🪺 Cocoon';
    if (progress >= 25) return '🐛 Caterpillar';
    return '🥚 Egg';
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>{getGreeting()}</Text>

      <Text style={styles.butterfly}>🦋</Text>

      <Text style={styles.title}>Let's continue your healing journey.</Text>

      <Text style={styles.tagline}>Pain lied. Purpose didn’t.</Text>

      <View style={styles.card}>
        <Text style={styles.stage}>{getStageName()}</Text>

        <Text style={styles.progressText}>Progress: {progress}%</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.message}>
          Every step is proof that purpose is still speaking.
        </Text>
      </View>

      <View style={styles.moodCard}>
        <Text style={styles.moodTitle}>Today's Mood</Text>
        <Text style={styles.moodText}>
          {todayMood || 'Not checked in yet'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.scriptureCard}
        onPress={() => router.push('/(tabs)/today-word' as any)}
      >
        <Text style={styles.scriptureTitle}>📖 Today's Scripture</Text>
        <Text style={styles.scriptureText}>
          "For I know the thoughts that I think toward you..."
        </Text>
        <Text style={styles.tapHint}>Tap to continue →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/daily-journey' as any)}
      >
        <Text style={styles.buttonText}>🌱 Continue Today's Journey</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/mood' as any)}
      >
        <Text style={styles.buttonText}>😊 Mood Check</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/journal' as any)}
      >
        <Text style={styles.buttonText}>📝 Journal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/prayer' as any)}
      >
        <Text style={styles.buttonText}>🙏 Prayer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/celebrate' as any)}
      >
        <Text style={styles.buttonText}>🎉 Celebrate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/garden' as any)}
      >
        <Text style={styles.buttonText}>🌸 Butterfly Garden</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => router.replace('/' as any)}
      >
        <Text style={styles.outlineButtonText}>← Start Over</Text>
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
    paddingTop: 40,
    paddingBottom: 80,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    color: '#4B1D7A',
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  butterfly: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    color: '#4B1D7A',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 8,
  },
  tagline: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 5,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 15,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 10,
  },
  stage: {
    fontSize: 20,
    color: '#4B1D7A',
    fontWeight: '800',
    textAlign: 'center',
  },
  progressText: {
    color: '#E75480',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 14,
    backgroundColor: '#F4E7F8',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E75480',
    borderRadius: 20,
  },
  message: {
    color: '#3F2A4D',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  moodCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 14,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 10,
  },
  moodTitle: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  moodText: {
    color: '#E75480',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  scriptureCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 14,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 10,
  },
  scriptureTitle: {
    color: '#4B1D7A',
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
  },
  scriptureText: {
    color: '#4B1D7A',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  tapHint: {
    color: '#E75480',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 11,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  outlineButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  outlineButtonText: {
    color: '#4B1D7A',
    fontSize: 15,
    fontWeight: '800',
  },
});