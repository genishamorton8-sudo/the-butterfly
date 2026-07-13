import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { auth } from '../lib/firebase';
import { createUserProfile } from '../lib/userProfile';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUp() {
    Keyboard.dismiss();

    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Almost there', 'Please enter your name, email, and password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Password too short',
        'Your password must be at least 6 characters.'
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await createUserProfile(
        userCredential.user.uid,
        email.trim(),
        name.trim()
      );

      Alert.alert('Success!', 'Your account has been created.');

      router.replace('/(tabs)/upload-selfie' as any);
    } catch (error: any) {
      Alert.alert(
        'Unable to create account',
        error.message || 'Please try again.'
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Platform.OS === 'web' ? undefined : Keyboard.dismiss}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.butterfly}>🦋</Text>

          <Text style={styles.title}>Create Your Account</Text>

          <Text style={styles.subtitle}>
            Your healing journey begins today.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#9B8AA8"
            autoComplete="off"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9B8AA8"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="off"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9B8AA8"
            secureTextEntry
            autoComplete="new-password"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => router.replace('/' as any)}
          >
            <Text style={styles.outlineButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 26,
    paddingTop: 90,
    paddingBottom: 80,
    alignItems: 'center',
  },
  butterfly: {
    fontSize: 64,
    marginBottom: 18,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F4E7F8',
    width: '100%',
    borderRadius: 18,
    padding: 16,
    fontSize: 17,
    color: '#3F2A4D',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  outlineButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#4B1D7A',
    fontSize: 17,
    fontWeight: '800',
  },
});