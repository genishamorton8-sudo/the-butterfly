import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type JourneySummaryCardProps = {
  conversations: number;
  exercises: number;
  prayers: number;
  strongestTheme: string;
};

export default function JourneySummaryCard({
  conversations,
  exercises,
  prayers,
  strongestTheme,
}: JourneySummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="butterfly"
          size={32}
          color="#E75480"
        />

        <View style={styles.headerText}>
          <Text style={styles.label}>Healing Journey</Text>
          <Text style={styles.title}>Your Progress</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat
          icon="message-text"
          value={conversations}
          label="Conversations"
        />

        <Stat
          icon="meditation"
          value={exercises}
          label="Exercises"
        />

        <Stat
          icon="hands-pray"
          value={prayers}
          label="Prayers"
        />
      </View>

      <View style={styles.themeCard}>
        <Text style={styles.themeLabel}>
          Current Healing Focus
        </Text>

        <Text style={styles.themeValue}>
          {strongestTheme}
        </Text>
      </View>
    </View>
  );
}

type StatProps = {
  icon: string;
  value: number;
  label: string;
};

function Stat({
  icon,
  value,
  label,
}: StatProps) {
  return (
    <View style={styles.stat}>
      <MaterialCommunityIcons
        name={icon as any}
        size={26}
        color="#4B1D7A"
      />

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E75480',
    padding: 18,
    marginBottom: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  headerText: {
    marginLeft: 12,
    flex: 1,
  },

  label: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '900',
  },

  title: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  stat: {
    flex: 1,
    alignItems: 'center',
  },

  value: {
    color: '#4B1D7A',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 6,
  },

  statLabel: {
    color: '#6B4A78',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 2,
  },

  themeCard: {
    backgroundColor: '#FFF7EC',
    borderRadius: 16,
    padding: 14,
  },

  themeLabel: {
    color: '#B8860B',
    fontSize: 12,
    fontWeight: '900',
  },

  themeValue: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
});