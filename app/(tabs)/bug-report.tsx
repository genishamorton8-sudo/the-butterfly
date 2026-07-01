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

export default function BugReportScreen() {
  const [title, setTitle] = useState('');
  const [whatHappened, setWhatHappened] = useState('');
  const [whereInApp, setWhereInApp] = useState('');
  const [steps, setSteps] = useState('');
  const [device, setDevice] = useState('');
  const [saving, setSaving] = useState(false);

  async function submitBugReport() {
    if (!title || !whatHappened || !whereInApp) {
      Alert.alert('Missing information', 'Please complete the title, location, and what happened.');
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, 'bugReports'), {
        uid: auth.currentUser?.uid || null,
        email: auth.currentUser?.email || '',
        title,
        whatHappened,
        whereInApp,
        steps,
        device,
        status: 'new',
        createdAt: serverTimestamp(),
      });

      Alert.alert('Bug Report Sent', 'Thank you. This helps us improve The Butterfly.');

      setTitle('');
      setWhatHappened('');
      setWhereInApp('');
      setSteps('');
      setDevice('');

      router.replace('/(tabs)/dashboard' as any);
    } catch {
      Alert.alert('Could not send report', 'Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🐞</Text>

      <Text style={styles.title}>Report a Bug</Text>

      <Text style={styles.subtitle}>
        Something not working right? Tell us what happened so we can fix it.
      </Text>

      <View style={styles.card}>
        <Input
          label="Bug Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Example: Profile button does not open"
        />

        <Input
          label="Where did it happen?"
          value={whereInApp}
          onChangeText={setWhereInApp}
          placeholder="Example: Dashboard, Profile, Journal"
        />

        <Input
          label="What happened?"
          value={whatHappened}
          onChangeText={setWhatHappened}
          placeholder="Tell us what went wrong"
          multiline
        />

        <Input
          label="Steps to repeat it"
          value={steps}
          onChangeText={setSteps}
          placeholder="Example: I tapped Dashboard, then Profile..."
          multiline
        />

        <Input
          label="Device / Browser"
          value={device}
          onChangeText={setDevice}
          placeholder="Example: iPhone, Safari, Chrome, Expo Go"
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={submitBugReport}
        disabled={saving}
      >
        <Text style={styles.submitButtonText}>
          {saving ? 'Sending...' : 'Send Bug Report'}
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
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        placeholderTextColor="#9B8AA8"
        multiline={multiline}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 130,
    alignItems: 'center',
  },
  icon: {
    fontSize: 58,
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