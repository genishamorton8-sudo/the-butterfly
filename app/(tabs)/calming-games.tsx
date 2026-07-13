import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const games = [
  {
    title: 'Word Garden',
    description: 'Unscramble gentle, calming words. Each one you solve grows a flower in your garden.',
    route: '/(tabs)/word-garden',
    icon: 'flower-tulip-outline',
  },
  {
    title: 'Bloom Match',
    description: 'A slow, soothing memory match game with flowers and butterflies. No timer, no pressure.',
    route: '/(tabs)/bloom-match',
    icon: 'cards-outline',
  },
];

export default function CalmingGamesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <MaterialCommunityIcons
        name="sprout"
        size={54}
        color="#E75480"
        style={styles.topIcon}
      />

      <Text style={styles.title}>Calming Games</Text>

      <Text style={styles.subtitle}>
        A gentle place to slow down, breathe, and let your mind rest.
      </Text>

      {games.map((game) => (
        <TouchableOpacity
          key={game.title}
          style={styles.card}
          onPress={() => router.push(game.route as any)}
        >
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name={game.icon as any}
              size={30}
              color="#E75480"
            />
          </View>

          <View style={styles.cardTextWrap}>
            <Text style={styles.cardTitle}>{game.title}</Text>
            <Text style={styles.cardText}>{game.description}</Text>
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
        onPress={() => router.push('/(tabs)/healing-exercises' as any)}
      >
        <Text style={styles.backText}>Back to Healing Studio</Text>
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