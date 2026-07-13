import { router } from 'expo-router';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// TODO: once the Sankofa Facebook group is created, paste its URL here
// (something like https://www.facebook.com/groups/123456789)
const SANKOFA_FACEBOOK_GROUP_URL = '';

export default function SankofaScreen() {
  function openSankofaLink() {
    Linking.openURL('https://payhip.com/b/rUd6M');
  }

  function openFacebookGroup() {
    if (SANKOFA_FACEBOOK_GROUP_URL) {
      Linking.openURL(SANKOFA_FACEBOOK_GROUP_URL);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>💜</Text>

      <Text style={styles.title}>Sankofa Community</Text>

      <Text style={styles.subtitle}>
        Healing happens better when women walk together.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What is Sankofa?</Text>
        <Text style={styles.cardText}>
          Sankofa is a healing community for women who are ready to grow,
          reflect, rebuild, and become whole through story, faith, connection,
          and accountability.
        </Text>
      </View>

      <View style={styles.priceCard}>
        <Text style={styles.priceTitle}>Membership Access</Text>

        <Text style={styles.priceText}>👑 VIP Members: Free app access</Text>
        <Text style={styles.priceText}>🌸 General Members: $2 app access</Text>
        <Text style={styles.priceText}>🦋 Public Users: $5 app access</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Why Join?</Text>
        <Text style={styles.cardText}>
          The Butterfly helps you heal daily. Sankofa gives you community,
          support, encouragement, and women who are walking the journey too.
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={openSankofaLink}>
        <Text style={styles.primaryButtonText}>Join Sankofa</Text>
      </TouchableOpacity>

      {SANKOFA_FACEBOOK_GROUP_URL ? (
        <TouchableOpacity
          style={styles.facebookButton}
          onPress={openFacebookGroup}
        >
          <Text style={styles.facebookButtonText}>Visit Our Facebook Group</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
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
    color: '#E75480',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
    lineHeight: 26,
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
  priceCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
  },
  priceTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  priceText: {
    color: '#3F2A4D',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  facebookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});