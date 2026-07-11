import { router } from 'expo-router';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth, db } from '../../lib/firebase';
import { getMyPartnerProfile } from '../../lib/partners';

export default function ConnectPartnerScreen() {
  const [partnerCode, setPartnerCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function connectPartner() {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Not signed in', 'Please sign in first.');
      return;
    }

    const code = partnerCode.trim().toUpperCase();

    if (!code) {
      Alert.alert('Partner Code Needed', 'Please enter your partner code.');
      return;
    }

    try {
      setLoading(true);

      const myProfile = await getMyPartnerProfile();

      if (!myProfile) {
        Alert.alert('Profile Error', 'Could not find your partner profile.');
        return;
      }

      if (code === myProfile.partnerCode) {
        Alert.alert('Oops', 'You cannot connect to your own partner code.');
        return;
      }

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('partnerCode', '==', code));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert(
          'Partner Not Found',
          'Please check the code and try again.'
        );
        return;
      }

      const partnerDoc = querySnapshot.docs[0];
      const partnerData = partnerDoc.data();

      const myRef = doc(db, 'users', user.uid);
      const partnerRef = doc(db, 'users', partnerDoc.id);

      await updateDoc(myRef, {
        partnerUid: partnerDoc.id,
      });

      await updateDoc(partnerRef, {
        partnerUid: user.uid,
      });

      Alert.alert(
        'Partner Connected',
        `You are now connected with ${
          partnerData.displayName || 'your Sankofa partner'
        }.`
      );

      router.replace('/(tabs)/accountability' as any);
    } catch {
      Alert.alert('Connection Failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🤝</Text>

      <Text style={styles.title}>Connect Partner</Text>

      <Text style={styles.subtitle}>
        Enter your Sankofa accountability partner’s code to connect your journeys.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Partner Code</Text>

        <Text style={styles.cardText}>
          Ask your partner for their code. Once connected, you will be able to
          see daily progress, milestones, and send encouragement.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter partner code"
          placeholderTextColor="#9B8AA8"
          value={partnerCode}
          onChangeText={setPartnerCode}
          autoCapitalize="characters"
        />
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={connectPartner}
        disabled={loading}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? 'Connecting...' : 'Connect Partner'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace('/(tabs)/accountability' as any)}
      >
        <Text style={styles.secondaryButtonText}>
          Back to Accountability
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
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 120,
    alignItems: 'center',
  },
  icon: {
    fontSize: 58,
    marginBottom: 10,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
    lineHeight: 26,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 18,
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
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F4E7F8',
    borderRadius: 18,
    padding: 16,
    fontSize: 18,
    color: '#3F2A4D',
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 2,
  },
  primaryButton: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  secondaryButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});