import { router } from 'expo-router';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EmergencyScreen() {
  function call988() {
    Linking.openURL('tel:988');
  }

  function text988() {
    Linking.openURL('sms:988');
  }

  function open988Website() {
    Linking.openURL('https://988lifeline.org');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>💙</Text>

      <Text style={styles.title}>Immediate Support</Text>

      <Text style={styles.subtitle}>
        You are not alone. If you feel unsafe or may hurt yourself, please reach
        out for help now.
      </Text>

      <View style={styles.crisisCard}>
        <Text style={styles.crisisTitle}>If this is an emergency</Text>
        <Text style={styles.crisisText}>
          Call 911 or go to the nearest emergency room.
        </Text>
      </View>

      <TouchableOpacity style={styles.dangerButton} onPress={call988}>
        <Text style={styles.dangerButtonText}>Call 988 Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={text988}>
        <Text style={styles.primaryButtonText}>Text 988</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineButton} onPress={open988Website}>
        <Text style={styles.outlineButtonText}>Open 988 Lifeline Website</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pause and Breathe</Text>
        <Text style={styles.cardText}>
          Take one slow breath in. Hold it for a moment. Now breathe out slowly.
          You only have to get through this next moment.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>A Gentle Prayer</Text>
        <Text style={styles.cardText}>
          Lord, meet me right here. Help me stay safe. Send comfort, help,
          wisdom, and the right person to support me now.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Truth for This Moment</Text>
        <Text style={styles.cardText}>
          You matter. Your life matters. This feeling is real, but it does not
          get the final word.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.secondaryButtonText}>Return to Dashboard</Text>
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
    color: '#3F2A4D',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 22,
  },
  crisisCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E75480',
    marginBottom: 18,
  },
  crisisTitle: {
    color: '#E75480',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  crisisText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '700',
  },
  dangerButton: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  primaryButton: {
    backgroundColor: '#4B1D7A',
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
  outlineButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  outlineButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 16,
  },
  cardTitle: {
    color: '#4B1D7A',
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  secondaryButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});