import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const exercises = [
  {
    title: 'Rewrite the Scene',
    description: 'Gently revisit a painful memory and rewrite it with safety, compassion, and hope.',
    route: '/(tabs)/rewrite-scene',
    icon: 'movie-edit',
  },
  {
    title: 'Change the Thought',
    description: 'Replace painful beliefs with healthier, truthful thoughts.',
    route: '/(tabs)/change-the-thought',
    icon: 'brain',
  },
  {
    title: 'Meet Younger Me',
    description: 'Comfort and reconnect with the younger version of yourself.',
    route: '/(tabs)/meet-younger-me',
    icon: 'human-child',
  },
  {
    title: 'Safe Place',
    description: 'Create a peaceful inner place you can return to anytime.',
    route: '/(tabs)/safe-place',
    icon: 'home-heart',
  },
  {
    title: 'Mirror Truth',
    description: 'Replace lies with truth and speak kindly over yourself.',
    route: '/(tabs)/mirror-truth',
    icon: 'mirror',
  },
  {
    title: 'Letters Never Sent',
    description: 'Write the words your heart has been carrying without pressure to send them.',
    route: '/(tabs)/letters-never-sent',
    icon: 'email-outline',
  },
  {
    title: 'Future Self',
    description: 'Meet the healed version of you and take one step toward her.',
    route: '/(tabs)/future-self',
    icon: 'star-four-points',
  },
];

export default function HealingExercisesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <MaterialCommunityIcons
        name="sprout"
        size={54}
        color="#E75480"
        style={styles.topIcon}
      />

      <Text style={styles.title}>Butterfly Healing Studio</Text>

      <Text style={styles.subtitle}>
        Choose the healing experience you need today.
      </Text>

      {exercises.map((exercise) => (
        <TouchableOpacity
          key={exercise.title}
          style={styles.card}
          onPress={() => router.push(exercise.route as any)}
        >
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name={exercise.icon as any}
              size={30}
              color="#E75480"
            />
          </View>

          <View style={styles.cardTextWrap}>
            <Text style={styles.cardTitle}>{exercise.title}</Text>
            <Text style={styles.cardText}>{exercise.description}</Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right-circle"
            size={30}
            color="#D4AF37"
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>
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
    paddingBottom: 120,
  },
  topIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  backButton: {
    borderWidth: 2,
    borderColor: '#4B1D7A',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  backText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});