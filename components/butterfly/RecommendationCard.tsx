import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Recommendation = {
  title: string;
  description: string;
  route: string;
  icon: string;
};

type RecommendationCardProps = {
  recommendation: Recommendation;
};

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name={recommendation.icon as any}
          size={30}
          color="#E75480"
        />

        <View style={styles.textContainer}>
          <Text style={styles.label}>Gentle Suggestion</Text>
          <Text style={styles.title}>{recommendation.title}</Text>
        </View>
      </View>

      <Text style={styles.description}>{recommendation.description}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(recommendation.route as any)}
      >
        <Text style={styles.buttonText}>Open Exercise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF9F3',
    borderRadius: 20,
    padding: 14,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginTop: 14,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  textContainer: {
    flex: 1,
    marginLeft: 10,
  },

  label: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 2,
  },

  title: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '900',
  },

  description: {
    color: '#3F2A4D',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#4B1D7A',
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});