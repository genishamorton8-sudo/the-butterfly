import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

function AdminCard({
  title,
  subtitle,
  emoji,
  onPress,
}: {
  title: string;
  subtitle: string;
  emoji: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

export default function AdminHome() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>🦋 Butterfly Care</Text>

      <Text style={styles.subtitle}>
        Welcome to your administrative dashboard.
      </Text>

      <AdminCard
        emoji="👥"
        title="Members"
        subtitle="View and manage community members."
        onPress={() => router.push('/admin/members')}
      />

      <AdminCard
        emoji="🤝"
        title="Assign Butterfly Partner"
        subtitle="Match members with prayer partners."
        onPress={() => router.push('/admin/assign-partner')}
      />

      <AdminCard
        emoji="🦋"
        title="Founding Butterflies"
        subtitle="Review and approve beta applications."
        onPress={() => router.push('/admin/founding-butterflies')}
      />
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
    paddingTop: 60,
    paddingBottom: 100,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#E75480',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#D4AF37',
    padding: 20,
    marginBottom: 18,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 42,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
});