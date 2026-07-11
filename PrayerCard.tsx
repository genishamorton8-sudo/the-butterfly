import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PrayerCardProps = {
  prayer: string;
  onPray: () => void;
};

export default function PrayerCard({
  prayer,
  onPray,
}: PrayerCardProps) {
  if (!prayer) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="hands-pray"
          size={28}
          color="#E75480"
        />

        <View style={styles.textContainer}>
          <Text style={styles.label}>Prayer Support</Text>
          <Text style={styles.title}>Pray With Me</Text>
        </View>
      </View>

      <Text style={styles.description}>
        Butterfly has prepared a prayer based on what you shared.
      </Text>

      <TouchableOpacity style={styles.button} onPress={onPray}>
        <Text style={styles.buttonText}>Pray With Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF9F3',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E75480',
    padding: 14,
    marginTop: 14,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  textContainer: {
    marginLeft: 10,
    flex: 1,
  },

  label: {
    color: '#D4AF37',
    fontWeight: '900',
    fontSize: 12,
  },

  title: {
    color: '#4B1D7A',
    fontWeight: '900',
    fontSize: 18,
    marginTop: 2,
  },

  description: {
    color: '#3F2A4D',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#E75480',
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
});