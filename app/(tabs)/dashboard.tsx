import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth, db } from '../../lib/firebase';
import {
  createOrUpdateMyPartnerProfile,
  getMyPartnerProfile,
  PartnerProfile,
} from '../../lib/partners';

export default function DashboardScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [myProfile, setMyProfile] = useState<PartnerProfile | null>(null);
  const [butterflyPartner, setButterflyPartner] =
    useState<PartnerProfile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    await createOrUpdateMyPartnerProfile();

    const profile = await getMyPartnerProfile();
    setMyProfile(profile);

    if (profile?.role === 'admin') {
      setIsAdmin(true);
    }

    if (profile?.partnerUid) {
      const partnerRef = doc(db, 'users', profile.partnerUid);
      const partnerSnap = await getDoc(partnerRef);

      if (partnerSnap.exists()) {
        setButterflyPartner(partnerSnap.data() as PartnerProfile);
      }
    }
  }

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

      {isAdmin && (
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => router.push('/admin' as any)}
        >
          <Text style={styles.adminButtonText}>🦋 Butterfly Care</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => router.push('/emergency' as any)}
      >
        <Text style={styles.emergencyButtonText}>Need Immediate Support?</Text>
      </TouchableOpacity>

      <View style={styles.partnerCard}>
        <Text style={styles.partnerLabel}>Butterfly Connection</Text>

        <Text style={styles.partnerTitle}>🦋 My Butterfly Partner</Text>

        {butterflyPartner ? (
          <>
            <Text style={styles.partnerName}>
              {butterflyPartner.displayName || 'Butterfly Partner'}
            </Text>

            <Text style={styles.partnerText}>
              You are connected for encouragement, prayer, and growth.
            </Text>

            <View style={styles.partnerActions}>
              <TouchableOpacity style={styles.partnerActionButton}>
                <Text style={styles.partnerActionText}>💬 Encourage</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.partnerActionButton}>
                <Text style={styles.partnerActionText}>🙏 Pray Together</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.partnerName}>No Butterfly Partner Yet</Text>

            <Text style={styles.partnerText}>
              Once you are paired, your Butterfly Partner will appear here.
            </Text>

            <TouchableOpacity
              style={styles.partnerRequestButton}
              onPress={() => router.push('/(tabs)/accountability' as any)}
            >
              <Text style={styles.partnerRequestText}>
                Learn About Butterfly Partners
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
            <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Today’s Healing Journey</Text>

        <Text style={styles.heroText}>
          Start here. One gentle step at a time.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/(tabs)/daily-journey' as any)}
        >
          <Text style={styles.primaryButtonText}>Begin Today’s Journey</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featureCard}>
        <Text style={styles.featureLabel}>Foundation</Text>

        <Text style={styles.featureTitle}>🌿 Butterfly Healing Studio</Text>

        <Text style={styles.featureText}>
          Begin with Rewrite the Scene, a guided imagery rescripting exercise
          for healing painful memories with compassion, protection, truth, and hope.
        </Text>

        <TouchableOpacity
          style={styles.healingButton}
          onPress={() => router.push('/healing-exercises' as any)}
        >
          <Text style={styles.healingButtonText}>Open Healing Studio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <HomeButton title="Mood Check" emoji="😊" onPress={() => router.push('/(tabs)/mood' as any)} />
        <HomeButton title="Today’s Word" emoji="📖" onPress={() => router.push('/(tabs)/today-word' as any)} />
        <HomeButton title="Journal" emoji="📝" onPress={() => router.push('/(tabs)/journal' as any)} />
        <HomeButton title="Prayer" emoji="🙏" onPress={() => router.push('/prayer' as any)} />
        <HomeButton title="Garden" emoji="🌸" onPress={() => router.push('/(tabs)/garden' as any)} />
        <HomeButton title="My Transformation" emoji="📸" onPress={() => router.push('/(tabs)/upload-selfie' as any)} />
        <HomeButton title="Testimonials" emoji="🦋" onPress={() => router.push('/(tabs)/testimonials' as any)} />
        <HomeButton title="Butterfly Partners" emoji="🤝" onPress={() => router.push('/(tabs)/accountability' as any)} />
        <HomeButton title="Celebrate" emoji="🎉" onPress={() => router.push('/(tabs)/celebrate' as any)} />
        <HomeButton title="Emergency Help" emoji="💙" onPress={() => router.push('/emergency' as any)} />
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.sectionTitle}>Butterfly Progress</Text>

        <Text style={styles.progressStage}>🌱 Your Garden Is Growing</Text>

        <Text style={styles.progressText}>
          Every prayer, journal entry, mood check, scripture, and healing
          exercise helps your Butterfly Garden bloom.
        </Text>

        <TouchableOpacity
          style={styles.gardenButton}
          onPress={() => router.push('/(tabs)/garden' as any)}
        >
          <Text style={styles.gardenButtonText}>View My Butterfly Garden</Text>
        </TouchableOpacity>
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
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  content: {
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 130,
    alignItems: 'center',
  },
  butterfly: { fontSize: 56, marginBottom: 10 },
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
  adminButton: {
    backgroundColor: '#D4AF37',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  adminButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
  emergencyButton: {
    backgroundColor: '#4B1D7A',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 18,
  },
  emergencyButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  partnerCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 28,
    padding: 22,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 20,
  },
  partnerLabel: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  partnerTitle: {
    color: '#4B1D7A',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  partnerName: {
    color: '#E75480',
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  partnerText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 16,
  },
  partnerActions: {
    width: '100%',
  },
  partnerActionButton: {
    backgroundColor: '#4B1D7A',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 10,
  },
  partnerActionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  partnerRequestButton: {
    backgroundColor: '#E75480',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
  },
  partnerRequestText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 28,
    padding: 22,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 20,
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
  primaryButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  featureCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 28,
    padding: 22,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 22,
  },
  featureLabel: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    color: '#4B1D7A',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  featureText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 16,
  },
  healingButton: {
    backgroundColor: '#4B1D7A',
    paddingVertical: 15,
    borderRadius: 28,
    alignItems: 'center',
  },
  healingButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
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
  homeEmoji: { fontSize: 30, marginBottom: 8 },
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
  gardenButton: {
    backgroundColor: '#4B1D7A',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 16,
  },
  gardenButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  signOutButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  signOutButtonText: { color: '#4B1D7A', fontSize: 16, fontWeight: '900' },
});