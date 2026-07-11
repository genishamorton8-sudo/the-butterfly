import { router } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
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

export default function FeatureRequestScreen() {
  const [title, setTitle] = useState('');
  const [whyHelpful, setWhyHelpful] = useState('');
  const [details, setDetails] = useState('');
  const [saving, setSaving] = useState(false);

  async function submitFeatureRequest() {
    if (!title || !whyHelpful) {
      Alert.alert('Missing information', 'Please complete the title and why it would help.');
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, 'featureRequests'), {
        uid: auth.currentUser?.uid || null,
        email: auth.currentUser?.email || '',
        title,
        whyHelpful,
        details,
        status: 'new',
        votes: 0,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Feature Request Sent', 'Thank you for helping shape The Butterfly.');

      router.replace('/(tabs)/dashboard' as any);
    } catch {
      Alert.alert('Could not send request', 'Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>💡</Text>
      <Text style={styles.title}>Feature Request</Text>
      <Text style={styles.subtitle}>
        Have an idea for The Butterfly? Share it with us.
      </Text>

      <View style={styles.card}>
        <Input label="Feature Idea" value={title} onChangeText={setTitle} />
        <Input
          label="Why would this help?"
          value={whyHelpful}
          onChangeText={setWhyHelpful}
          multiline
        />
        <Input
          label="Extra Details"
          value={details}
          onChangeText={setDetails}
          multiline
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={submitFeatureRequest}
        disabled={saving}
      >
        <Text style={styles.submitButtonText}>
          {saving ? 'Sending...' : 'Send Feature Request'}
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

function Input({
  label,
  value,
  onChangeText,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor="#9B8AA8"
        multiline={multiline}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 130,
    alignItems: 'center',
  },
  icon: { fontSize: 58, marginBottom: 10 },
  title: {
    color: '#4B1D7A',
    fontSize: 32,
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
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
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
  submitButton: {
    width: '100%',
    backgroundColor: '#E75480',
    borderRadius: 30,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: 14,
  },
  submitButtonText: {
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