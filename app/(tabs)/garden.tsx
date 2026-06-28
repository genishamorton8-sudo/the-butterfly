import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  getGarden,
  getGardenStage,
  resetGarden,
} from '../../lib/garden';

export default function GardenScreen() {
  const [growth, setGrowth] = useState(0);

  async function loadGarden() {
    const garden = await getGarden();
    setGrowth(garden.growth);
  }

  useFocusEffect(
    useCallback(() => {
      loadGarden();
    }, [])
  );

  const stage = getGardenStage(growth);
  const nextMilestone =
    growth < 25 ? 25 : growth < 75 ? 75 : growth < 150 ? 150 : growth < 300 ? 300 : null;

  const pointsToNext = nextMilestone ? nextMilestone - growth : 0;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🦋 Butterfly Garden</Text>

      <Text style={styles.subtitle}>
        Every healthy choice helps your garden bloom.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current Stage</Text>

        <Text style={styles.stage}>{stage.title}</Text>

        <Text style={styles.artwork}>{stage.artwork}</Text>

        <View style={styles.stats}>
          <Text style={styles.stat}>🌸 Flowers: {stage.flowers}</Text>
          <Text style={styles.stat}>🦋 Butterflies: {stage.butterflies}</Text>
          <Text style={styles.stat}>🌳 Trees: {stage.trees}</Text>
        </View>

        <Text style={styles.message}>{stage.message}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Growth Score</Text>

        <Text style={styles.score}>{growth}</Text>

        {nextMilestone ? (
          <Text style={styles.nextBloom}>
            {pointsToNext} points until your next bloom.
          </Text>
        ) : (
          <Text style={styles.nextBloom}>
            Your garden is flourishing beautifully.
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>What Helps You Grow</Text>

        <Text style={styles.progress}>😊 Mood Check: +5</Text>
        <Text style={styles.progress}>📖 Today’s Word: +5</Text>
        <Text style={styles.progress}>🙏 Prayer: +5</Text>
        <Text style={styles.progress}>📝 Journal: +10</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await resetGarden();
          loadGarden();
        }}
      >
        <Text style={styles.buttonText}>Reset Garden</Text>
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
    paddingBottom: 90,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#4B1D7A',
    marginBottom: 12,
  },
  stage: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 18,
  },
  artwork: {
    textAlign: 'center',
    fontSize: 34,
    lineHeight: 48,
    marginBottom: 16,
  },
  stats: {
    marginTop: 10,
    alignItems: 'center',
  },
  stat: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B1D7A',
    marginVertical: 4,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 18,
    lineHeight: 24,
  },
  score: {
    textAlign: 'center',
    fontSize: 52,
    fontWeight: '900',
    color: '#E75480',
    marginVertical: 10,
  },
  nextBloom: {
    textAlign: 'center',
    color: '#4B1D7A',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 10,
  },
  progress: {
    fontSize: 17,
    marginVertical: 8,
    color: '#4B1D7A',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#E75480',
    padding: 18,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
  },
});