import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../../lib/firebase';

export default function DashboardScreen() {
  const [mood, setMood] = useState('');

  async function handleSignOut() {
    try {
      await signOut(auth);
      router.replace('/login' as any);
    } catch {
      Alert.alert('Sign out failed', 'Please try again.');
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.butterfly}>🦋</Text>

      <Text style={styles.title}>Welcome back, friend</Text>
      <Text style={styles.subtitle}>Your healing home base.</Text>

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => router.push('/(tabs)/emergency' as any)}
      >
        <Text style={styles.emergencyButtonText}>Need Immediate Support?</Text>
      </TouchableOpacity>

      <View style={styles.checkInCard}>
        <Text style={styles.checkInTitle}>How are you today?</Text>

        <View style={styles.moodGrid}>
          {['Peaceful', 'Discouraged', 'Anxious', 'Hopeful', 'Overwhelmed'].map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.moodButton,
                  mood === item && styles.selectedMoodButton,
                ]}
                onPress={() => {
                  setMood(item);
                  router.push({
                    pathname: '/(tabs)/mood-response',
                    params: { mood: item },
                  } as any);
                }}
              >
                <Text
                  style={[
                    styles.moodButtonText,
                    mood === item && styles.selectedMoodButtonText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Today’s Healing Journey</Text>
        <Text style={styles.heroText}>
          Start here. One step at a time. No pressure. Just progress.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/(tabs)/daily-journey' as any)}
        >
          <Text style={styles.primaryButtonText}>Begin Today’s Journey</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <HomeButton title="Today’s Word" emoji="📖" onPress={() => router.push('/(tabs)/today-word' as any)} />
        <HomeButton title="Mood Check" emoji="😊" onPress={() => router.push('/(tabs)/mood' as any)} />
        <HomeButton title="Journal" emoji="📝" onPress={() => router.push('/(tabs)/journal' as any)} />
        <HomeButton title="Prayer" emoji="🙏" onPress={() => router.push('/prayer' as any)} />
        <HomeButton title="Celebrate" emoji="🎉" onPress={() => router.push('/(tabs)/celebrate' as any)} />
        <HomeButton title="Garden" emoji="🌸" onPress={() => router.push('/(tabs)/garden' as any)} />
        <HomeButton title="Upload Selfie" emoji="📸" onPress={() => router.push('/(tabs)/upload-selfie' as any)} />
        <HomeButton title="Emergency Help" emoji="💙" onPress={() => router.push('/(tabs)/emergency' as any)} />
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.sectionTitle}>Butterfly Progress</Text>
        <Text style={styles.progressStage}>🥚 Beginning Stage</Text>
        <Text style={styles.progressText}>
          Your transformation has started. Keep showing up.
        </Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function HomeButton({
  title,
  emoji,
  onPress,
}: {
  title: string;
  emoji: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.homeButton} onPress={onPress}>
      <Text style={styles.homeEmoji}>{emoji}</Text>
      <Text style={styles.homeButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 120,
    alignItems: 'center',
  },
  butterfly: {
    fontSize: 56,
    marginBottom: 10,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  emergencyButton: {
    backgroundColor: '#4B1D7A',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 18,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  checkInCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 26,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 22,
  },
  checkInTitle: {
    color: '#4B1D7A',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    backgroundColor: '#F4E7F8',
    width: '48%',
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedMoodButton: {
    backgroundColor: '#E75480',
  },
  moodButtonText: {
    color: '#4B1D7A',
    fontSize: 14,
    fontWeight: '800',
  },
  selectedMoodButtonText: {
    color: '#FFFFFF',
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 28,
    padding: 22,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 22,
  },
  heroTitle: {
    color: '#4B1D7A',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
  },
  heroText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: '#E75480',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 12,
  },
  homeEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  homeButtonText: {
    color: '#4B1D7A',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  progressStage: {
    color: '#E75480',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
  },
  progressText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 8,
  },
  signOutButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});