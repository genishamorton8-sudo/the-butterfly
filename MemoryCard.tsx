import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type MemoryCardProps = {
  message: string;
};

export default function MemoryCard({
  message,
}: MemoryCardProps) {
  if (!message) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="brain"
          size={28}
          color="#6A5ACD"
        />

        <View style={styles.textContainer}>
          <Text style={styles.label}>Butterfly Memory</Text>
          <Text style={styles.title}>Welcome Back</Text>
        </View>
      </View>

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F5FF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6A5ACD',
    padding: 14,
    marginBottom: 16,
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
    color: '#6A5ACD',
    fontSize: 12,
    fontWeight: '900',
  },

  title: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },

  message: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 22,
  },
});