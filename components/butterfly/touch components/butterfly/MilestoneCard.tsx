import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type MilestoneCardProps = {
  title: string;
  description: string;
};

export default function MilestoneCard({
  title,
  description,
}: MilestoneCardProps) {
  if (!title) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="trophy-award"
          size={30}
          color="#D4AF37"
        />

        <View style={styles.headerText}>
          <Text style={styles.label}>
            Healing Milestone
          </Text>

          <Text style={styles.title}>
            {title}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFBEA',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#D4AF37',
    padding: 16,
    marginBottom: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  headerText: {
    flex: 1,
    marginLeft: 12,
  },

  label: {
    color: '#B8860B',
    fontWeight: '900',
    fontSize: 12,
  },

  title: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },

  description: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 22,
  },
});