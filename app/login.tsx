import { router } from 'expo-router';
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
    View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function signIn() {
    Keyboard.dismiss();

    if (!email || !password) {
      Alert.alert('Almost there', 'Please enter your email and password.');
      return;
    }

    router.push('/(tabs)/dashboard' as any);
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.butterfly}>🦋</Text>

          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.subtitle}>
            Your healing journey is still here.
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#9B8AA8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9B8AA8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => router.back()}
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
    paddingTop: 80,
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
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 28,
    padding: 24,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 24,
  },
  label: {
    color: '#4B1D7A',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F4E7F8',
    borderRadius: 18,
    padding: 16,
    fontSize: 17,
    color: '#3F2A4D',
    marginBottom: 18,
  },
  forgotText: {
    color: '#E75480',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
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