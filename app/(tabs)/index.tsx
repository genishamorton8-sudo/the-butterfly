import { router } from 'expo-router';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.butterfly}>🦋</Text>

        <Text style={styles.title}>The Butterfly</Text>

        <Text style={styles.subtitle}>
          Healing. Hope. Transformation.
        </Text>

        <Text style={styles.description}>
          Every small step brings you closer to the woman God created you to be.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/(tabs)/upload-selfie' as any)}
        >
          <Text style={styles.primaryButtonText}>
            Create an Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/login' as any)}
        >
          <Text style={styles.secondaryButtonText}>
            I Already Have an Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  butterfly: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#4B1D7A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#D4AF37',
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    marginTop: 24,
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#E75480',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  secondaryButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4B1D7A',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '800',
  },
});