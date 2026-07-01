import { router } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth, db } from '../../lib/firebase';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteScripture, setFavoriteScripture] = useState('');
  const [prayerInterests, setPrayerInterests] = useState('');
  const [church, setChurch] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();

        setDisplayName(data.displayName || '');
        setBirthday(data.birthday || '');
        setFavoriteScripture(data.favoriteScripture || '');
        setPrayerInterests(data.prayerInterests || '');
        setChurch(data.church || '');
        setCity(data.city || '');
        setBio(data.bio || '');
      }
    } catch {
      Alert.alert('Could not load profile', 'Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile() {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Not signed in', 'Please sign in again.');
      return;
    }

    try {
      setSaving(true);

      await setDoc(
        doc(db, 'users', user.uid),
        {
          displayName,
          birthday,
          favoriteScripture,
          prayerInterests,
          church,
          city,
          bio,
        },
        { merge: true }
      );

      Alert.alert('Saved', 'Your profile has been updated.');
      router.replace('/(tabs)/dashboard' as any);
    } catch {
      Alert.alert('Could not save profile', 'Please try again.');
    } finally {
      setSaving(false);
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
      <Text style={styles.icon}>👤</Text>

      <Text style={styles.title}>My Profile</Text>

      <Text style={styles.subtitle}>
        Tell The Butterfly a little about you so your experience can feel more
        personal.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          placeholderTextColor="#9B8AA8"
          value={displayName}
          onChangeText={setDisplayName}
        />

        <Text style={styles.label}>Birthday</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: April 4"
          placeholderTextColor="#9B8AA8"
          value={birthday}
          onChangeText={setBirthday}
        />

        <Text style={styles.label}>Favorite Scripture</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: Philippians 1:6"
          placeholderTextColor="#9B8AA8"
          value={favoriteScripture}
          onChangeText={setFavoriteScripture}
        />

        <Text style={styles.label}>Prayer Interests</Text>
        <TextInput
          style={styles.input}
          placeholder="Healing, family, purpose, peace..."
          placeholderTextColor="#9B8AA8"
          value={prayerInterests}
          onChangeText={setPrayerInterests}
        />

        <Text style={styles.label}>Church / Community</Text>
        <TextInput
          style={styles.input}
          placeholder="Optional"
          placeholderTextColor="#9B8AA8"
          value={church}
          onChangeText={setChurch}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Optional"
          placeholderTextColor="#9B8AA8"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>About Me</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="A short note about you..."
          placeholderTextColor="#9B8AA8"
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveProfile}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Profile'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
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
    paddingTop: 60,
    paddingBottom: 120,
    alignItems: 'center',
  },
  icon: {
    fontSize: 56,
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
    fontSize: 16,
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
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 20,
  },
  label: {
    color: '#4B1D7A',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFF9F3',
    borderWidth: 2,
    borderColor: '#F1D7A7',
    borderRadius: 18,
    padding: 14,
    color: '#3F2A4D',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#E75480',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  backButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4B1D7A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});