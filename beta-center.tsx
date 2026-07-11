import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BetaCenterScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🦋</Text>

      <Text style={styles.title}>Beta Center</Text>

      <Text style={styles.subtitle}>
        Thank you for helping shape The Butterfly.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome, Founding Butterfly</Text>
        <Text style={styles.cardText}>
          This is your beta home base. Use this space to report bugs, suggest
          ideas, and help us make The Butterfly better.
        </Text>
      </View>

      <BetaButton
        emoji="🐞"
        title="Report a Bug"
        subtitle="Tell us when something is not working."
        onPress={() => router.push('/(tabs)/bug-report' as any)}
      />

      <BetaButton
        emoji="💡"
        title="Suggest a Feature"
        subtitle="Share an idea that could make the app better."
        onPress={() => router.push('/(tabs)/feature-request' as any)}
      />

      <BetaButton
        emoji="📢"
        title="Announcements"
        subtitle="Updates from The Butterfly team."
        onPress={() => {}}
      />

      <BetaButton
        emoji="📜"
        title="Beta Agreement"
        subtitle="Review your NDA and beta agreement."
        onPress={() => {}}
      />

      <BetaButton
        emoji="🏆"
        title="Founding Butterfly Badge"
        subtitle="Your early member recognition."
        onPress={() => router.push('/(tabs)/dashboard' as any)}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Coming Next</Text>
        <Text style={styles.cardText}>⭐ Feature voting</Text>
        <Text style={styles.cardText}>📧 Welcome messages</Text>
        <Text style={styles.cardText}>📜 Founding Butterfly certificate</Text>
        <Text style={styles.cardText}>🌿 Beta tester announcements</Text>
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

function BetaButton({
  emoji,
  title,
  subtitle,
  onPress,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.buttonCard} onPress={onPress}>
      <Text style={styles.buttonEmoji}>{emoji}</Text>
      <View style={styles.buttonTextWrap}>
        <Text style={styles.buttonTitle}>{title}</Text>
        <Text style={styles.buttonSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 130,
    alignItems: 'center',
  },
  icon: { fontSize: 58, marginBottom: 10 },
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
  cardTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    color: '#3F2A4D',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 6,
  },
  buttonCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 18,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonEmoji: {
    fontSize: 34,
    marginRight: 14,
  },
  buttonTextWrap: {
    flex: 1,
  },
  buttonTitle: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  buttonSubtitle: {
    color: '#3F2A4D',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  backButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4B1D7A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});