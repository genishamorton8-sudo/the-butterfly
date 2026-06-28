import { router } from 'expo-router';
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EmergencyScreen() {
  function openLink(url: string) {
    Linking.openURL(url).catch(() => {
      Alert.alert('Unable to open', 'Please try again or dial directly.');
    });
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>💙</Text>

      <Text style={styles.title}>You Are Not Alone</Text>

      <Text style={styles.subtitle}>
        If you are thinking about hurting yourself or feel like you cannot keep going,
        please reach out right now.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Before anything else...</Text>
        <Text style={styles.cardText}>
          Stay with us for this moment. Take one slow breath. You do not have to
          solve everything today. Help is available right now.
        </Text>
      </View>

      <TouchableOpacity style={styles.emergencyButton} onPress={() => openLink('tel:988')}>
        <Text style={styles.emergencyButtonText}>Call 988 Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink('sms:988')}>
        <Text style={styles.buttonText}>Text 988</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink('sms:741741&body=HOME')}>
        <Text style={styles.buttonText}>Text HOME to 741741</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink('https://988lifeline.org/chat/')}>
        <Text style={styles.buttonText}>Chat with 988 Online</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dangerButton} onPress={() => openLink('tel:911')}>
        <Text style={styles.dangerButtonText}>Call 911 if in Immediate Danger</Text>
      </TouchableOpacity>

      <View style={styles.prayerCard}>
        <Text style={styles.cardTitle}>Prayer for This Moment</Text>
        <Text style={styles.cardText}>
          Lord, help me stay. Help me breathe. Help me reach for support.
          Remind me that my life matters and that this moment is not the end of my story.
        </Text>
      </View>

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
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 120,
    alignItems: 'center',
  },
  icon: {
    fontSize: 56,
    marginBottom: 12,
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
    marginTop: 12,
    marginBottom: 22,
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
  prayerCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginTop: 8,
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
  },
  emergencyButton: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  button: {
    backgroundColor: '#4B1D7A',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  dangerButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E75480',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  dangerButtonText: {
    color: '#E75480',
    fontSize: 16,
    fontWeight: '900',
  },
  backButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});