import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth, db } from '../lib/firebase';
import { statusEmoji, statusLabel } from '../lib/betaStatus';

type ApplicationSummary = {
  status: string;
};

export default function BetaPendingScreen() {
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<ApplicationSummary | null>(null);

  useEffect(() => {
    loadApplication();
  }, []);

  async function loadApplication() {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, 'betaApplications'),
        where('uid', '==', uid),
        orderBy('submittedAt', 'desc')
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setApplication(snapshot.docs[0].data() as ApplicationSummary);
      }
    } catch {
      setApplication(null);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#E75480" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🦋</Text>

      <Text style={styles.title}>The Butterfly is in Beta</Text>

      <Text style={styles.subtitle}>
        Access is currently limited to approved Founding Butterflies.
      </Text>

      {!application ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>You haven&apos;t applied yet</Text>
          <Text style={styles.cardText}>
            Apply to become a Founding Butterfly to join the beta.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/apply' as any)}
          >
            <Text style={styles.primaryButtonText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {statusEmoji(application.status)} {statusLabel(application.status)}
          </Text>

          <Text style={styles.cardText}>
            {application.status === 'rejected'
              ? 'Your application was not approved for this round of the beta.'
              : 'Thank you for applying. We will let you know as soon as your application has been reviewed.'}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 24,
    paddingTop: 90,
    paddingBottom: 90,
    alignItems: 'center',
  },
  icon: {
    fontSize: 58,
    marginBottom: 10,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 22,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 22,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    color: '#3F2A4D',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
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
