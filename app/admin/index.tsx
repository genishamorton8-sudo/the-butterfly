import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import HealingDashboard from '../../components/butterfly/HealingDashboard';
export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>The Butterfly</Text>
        <Text style={styles.title}>Welcome Home</Text>
        <Text style={styles.subtitle}>
          A gentle space to check in, pray, reflect, and keep healing one step at a time.
        </Text>
      </View>

      <HealingDashboard />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What do you need today?</Text>

        <Link href="/ai-companion" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Talk to Butterfly</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.grid}>
          <HomeCard title="Healing Journey" text="See your growth." />
          <HomeCard title="Prayer" text="Pause and pray." />
          <HomeCard title="Scripture" text="Hold onto truth." />
          <HomeCard title="Garden" text="Grow with care." />
        </View>
      </View>
    </ScrollView>
  );
}

type HomeCardProps = {
  title: string;
  text: string;
};

function HomeCard({ title, text }: HomeCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: '#4B1D7A',
    borderRadius: 30,
    padding: 24,
    marginBottom: 18,
  },
  kicker: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: '#F7EFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
  },
  sectionTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#E75480',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  grid: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFF8F2',
    borderRadius: 18,
    padding: 15,
  },
  cardTitle: {
    color: '#3F2A4D',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 4,
  },
  cardText: {
    color: '#8B7A90',
    fontSize: 14,
  },
});