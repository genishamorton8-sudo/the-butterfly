import { Link } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import HealingDashboard from '../../components/butterfly/HealingDashboard';
import HomeHero from '../../components/home/HomeHero';
import { getDailyButterflyReflection } from '../../lib/butterflyReflection';

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function AdminHomeScreen() {
  const greeting = getGreeting();

  const reflection = getDailyButterflyReflection('Admin');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <HomeHero
        greeting={greeting}
        reflection={reflection}
      />

      <HealingDashboard />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Admin Dashboard
        </Text>

        <Link href="/ai-companion" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              Continue Conversation
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.grid}>
          <HomeCard
            title="Healing Journey"
            text="See your growth."
          />

          <HomeCard
            title="Prayer Room"
            text="Pause and pray."
          />

          <HomeCard
            title="Scripture Vault"
            text="Hold onto truth."
          />

          <HomeCard
            title="Healing Garden"
            text="Grow with care."
          />
        </View>
      </View>
    </ScrollView>
  );
}

type HomeCardProps = {
  title: string;
  text: string;
};

function HomeCard({
  title,
  text,
}: HomeCardProps) {
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