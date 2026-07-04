import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type PersonalizedHealingCardProps = {
  exercise: string;
  scripture: string;
  prayerFocus: string;
  encouragement: string;
};

export default function PersonalizedHealingCard({
  exercise,
  scripture,
  prayerFocus,
  encouragement,
}: PersonalizedHealingCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="heart-plus"
          size={32}
          color="#E75480"
        />

        <View style={styles.headerText}>
          <Text style={styles.label}>
            Personalized Healing
          </Text>

          <Text style={styles.title}>
            Your Healing Plan
          </Text>
        </View>
      </View>

      <Section
        icon="meditation"
        title="Recommended Exercise"
        value={exercise}
      />

      <Section
        icon="book-open-page-variant"
        title="Today's Scripture"
        value={scripture}
      />

      <Section
        icon="hands-pray"
        title="Prayer Focus"
        value={prayerFocus}
      />

      <View style={styles.encouragement}>
        <Text style={styles.encouragementTitle}>
          Butterfly Encouragement
        </Text>

        <Text style={styles.encouragementText}>
          {encouragement}
        </Text>
      </View>
    </View>
  );
}

type SectionProps = {
  icon: string;
  title: string;
  value: string;
};

function Section({
  icon,
  title,
  value,
}: SectionProps) {
  return (
    <View style={styles.section}>
      <MaterialCommunityIcons
        name={icon as any}
        size={22}
        color="#4B1D7A"
      />

      <View style={styles.sectionText}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        <Text style={styles.sectionValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF9F3',
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

  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  sectionText: {
    marginLeft: 12,
    flex: 1,
  },

  sectionTitle: {
    color: '#6B4A78',
    fontSize: 12,
    fontWeight: '900',
  },

  sectionValue: {
    color: '#3F2A4D',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },

  encouragement: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
  },

  encouragementTitle: {
    color: '#E75480',
    fontWeight: '900',
    fontSize: 13,
    marginBottom: 6,
  },

  encouragementText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 22,
  },
});