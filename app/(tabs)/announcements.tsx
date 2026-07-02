import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AnnouncementsScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.icon}>📢</Text>

      <Text style={styles.title}>
        Butterfly Announcements
      </Text>

      <Text style={styles.subtitle}>
        Welcome to the Butterfly beta. Important updates and news will appear here.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Welcome!
        </Text>

        <Text style={styles.cardText}>
          Thank you for helping test The Butterfly. As new healing exercises,
          features, and improvements are released, they'll be announced here.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.buttonText}>
          Back to Dashboard
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
    padding: 24,
    paddingTop: 70,
    paddingBottom: 120,
  },

  icon: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    padding: 20,
    marginBottom: 24,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },

  button: {
    backgroundColor: '#E75480',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
  },
});