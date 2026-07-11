import { Link } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function AdminHomeScreen() {
  const greeting = getGreeting();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.greeting}>{greeting}, Admin</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Admin Dashboard
        </Text>

        <View style={styles.grid}>
          <AdminCard
            title="Members"
            text="View and manage member accounts."
            href="/admin/members"
          />

          <AdminCard
            title="Beta Control Center"
            text="Manage the 90-day beta program."
            href="/admin/beta-control"
          />

          <AdminCard
            title="Founding Butterflies"
            text="Review founding member applications."
            href="/admin/founding-butterflies"
          />

          <AdminCard
            title="Bug Reports"
            text="See reports submitted by users."
            href="/admin/bug-reports"
          />
        </View>
      </View>
    </ScrollView>
  );
}

type AdminCardProps = {
  title: string;
  text: string;
  href: string;
};

function AdminCard({
  title,
  text,
  href,
}: AdminCardProps) {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{text}</Text>
      </TouchableOpacity>
    </Link>
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

  greeting: {
    color: '#4B1D7A',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 16,
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