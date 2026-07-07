import { StyleSheet, Text, View } from 'react-native';

type HomeHeroProps = {
  greeting: string;
  reflection: string;
};

export default function HomeHero({
  greeting,
  reflection,
}: HomeHeroProps) {
  return (
    <View style={styles.hero}>
      <Text style={styles.kicker}>The Butterfly</Text>

      <Text style={styles.title}>{greeting}</Text>

      <Text style={styles.subtitle}>
        How is your heart today? Take one gentle step toward healing.
      </Text>

      <View style={styles.reflectionCard}>
        <Text style={styles.reflectionLabel}>Today’s Reflection</Text>
        <Text style={styles.reflectionText}>{reflection}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: '#4B1D7A',
    borderRadius: 30,
    padding: 24,
    marginBottom: 18,
  },
  kicker: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: '#F7EFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18,
  },
  reflectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
  },
  reflectionLabel: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  reflectionText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
  },
});