import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type HealingFocusCardProps = {
  title: string;
  encouragement: string;
};

export default function HealingFocusCard({
  title,
  encouragement,
}: HealingFocusCardProps) {
  if (!title) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="brain" size={28} color="#6A5ACD" />

        <View style={styles.headerText}>
          <Text style={styles.label}>Healing Focus</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <Text style={styles.encouragement}>{encouragement}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F5FF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6A5ACD',
    padding: 16,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6A5ACD',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4B1D7A',
    marginTop: 2,
  },
  encouragement: {
    fontSize: 15,
    lineHeight: 24,
    color: '#3F2A4D',
  },
});