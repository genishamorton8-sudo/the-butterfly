import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EggCompleteScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.icon}>🥚✨</Text>

      <Text style={styles.title}>Egg Activity Complete</Text>

      <Text style={styles.message}>
        You showed up for yourself today.
      </Text>

      <Text style={styles.message}>
        That matters.
      </Text>

      <Text style={styles.truth}>
        Pain lied. Purpose didn’t.
      </Text>

      <Link href="/journey" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Return to My Journey</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
    paddingHorizontal: 26,
    paddingTop: 100,
    alignItems: 'center',
  },
  icon: {
    fontSize: 78,
    marginBottom: 24,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 24,
  },
  message: {
    color: '#3F2A4D',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 10,
  },
  truth: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});