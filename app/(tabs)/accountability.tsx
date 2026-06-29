import { router } from 'expo-router';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SANKOFA_LINK = 'https://payhip.com/b/rUd6M';

export default function AccountabilityScreen() {
  function joinSankofa() {
    Linking.openURL(SANKOFA_LINK);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🤝</Text>

      <Text style={styles.title}>Accountability Partners</Text>

      <Text style={styles.subtitle}>
        Healing is easier when you do not walk alone.
      </Text>

      <View style={styles.partnerCard}>
        <Text style={styles.cardTitle}>Already Paired Through Sankofa?</Text>

        <Text style={styles.cardText}>
          Connect with your Sankofa accountability partner inside The Butterfly.
          You will be able to see progress, send encouragement, and celebrate
          growth together.
        </Text>

        <Text style={styles.privacyText}>
          Private journals, prayers, and healing exercise responses are not shared.
          Your partner only sees progress and milestones.
        </Text>

        <TouchableOpacity
          style={styles.partnerButton}
          onPress={() => router.push('/connect-partner' as any)}
        >
          <Text style={styles.partnerButtonText}>
            Connect With My Sankofa Partner
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Need an Accountability Partner?</Text>

        <Text style={styles.cardText}>
          Not everyone begins their healing journey with someone beside them.
          Sankofa gives women a place to find encouragement, prayer, community,
          and accountability.
        </Text>
      </View>

      <View style={styles.sankofaCard}>
        <Text style={styles.sankofaTitle}>💜 Join the Sankofa Community</Text>

        <Text style={styles.cardText}>
          Sankofa is a Christ-centered community of women committed to healing,
          faith, accountability, and becoming who God created them to be.
        </Text>

        <View style={styles.benefits}>
          <Text style={styles.benefit}>🤝 Accountability Partners</Text>
          <Text style={styles.benefit}>🙏 Prayer Partners</Text>
          <Text style={styles.benefit}>📖 Bible Studies</Text>
          <Text style={styles.benefit}>🌿 Healing Challenges</Text>
          <Text style={styles.benefit}>🎥 Zoom Gatherings</Text>
          <Text style={styles.benefit}>❤️ Encouragement and support</Text>
        </View>
      </View>

      <View style={styles.priceCard}>
        <Text style={styles.priceTitle}>Membership Access</Text>

        <Text style={styles.priceText}>
          👑 VIP Members: The Butterfly App is included.
        </Text>

        <Text style={styles.priceText}>
          🌸 General Members: The Butterfly App is $2.
        </Text>

        <Text style={styles.priceText}>
          🦋 Public Users: The Butterfly App is $5.
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={joinSankofa}>
        <Text style={styles.primaryButtonText}>💜 Join Sankofa</Text>
      </TouchableOpacity>

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
    fontSize: 33,
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
  partnerCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
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
  privacyText: {
    color: '#E75480',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '800',
    marginTop: 14,
    marginBottom: 18,
  },
  partnerButton: {
    backgroundColor: '#4B1D7A',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  partnerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  sankofaCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
  },
  sankofaTitle: {
    color: '#4B1D7A',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  benefits: {
    marginTop: 18,
  },
  benefit: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
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
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
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