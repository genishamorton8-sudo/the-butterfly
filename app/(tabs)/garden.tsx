import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getProgress } from '../../.claude/lib/progress';

export default function GardenScreen() {
  const [progress, setProgress] = useState(20);

  useFocusEffect(
    useCallback(() => {
      loadGarden();
    }, [])
  );

  async function loadGarden() {
    const savedProgress = await getProgress();
    setProgress(savedProgress);
  }

  function getGardenScene() {
    if (progress >= 100) return '☀️\n\n🦋  🦋\n\n🌳\n🌸 🌼 🌷 🌺';
    if (progress >= 80) return '☀️\n\n🦋\n\n🌱 🌸 🌷 🌼';
    if (progress >= 60) return '🌤️\n\n🌱 🌸 🌷';
    if (progress >= 40) return '🌤️\n\n🌱 🌸';
    if (progress >= 25) return '🌱\n\nA tiny flower is beginning to bloom.';
    return '🌱\n\nYour garden has begun.';
  }

  function getGardenMessage() {
    if (progress >= 100) return 'Your garden is flourishing. Look what God has grown in you.';
    if (progress >= 80) return 'A butterfly has arrived. Transformation is happening.';
    if (progress >= 60) return 'More flowers are blooming. Your healing is growing.';
    if (progress >= 40) return 'A flower has bloomed. Keep taking small faithful steps.';
    if (progress >= 25) return 'Something beautiful is starting to grow.';
    return 'Every garden begins with one small seed.';
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.icon}>🌸🦋🌿</Text>

      <Text style={styles.title}>My Butterfly Garden</Text>

      <Text style={styles.subtitle}>Your healing is growing here.</Text>

      <View style={styles.gardenCard}>
        <Text style={styles.scene}>{getGardenScene()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.progressText}>Progress: {progress}%</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.message}>{getGardenMessage()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.encouragementTitle}>Today’s Encouragement</Text>
        <Text style={styles.encouragement}>
          “Behold, I will do a new thing; now it shall spring forth.”
        </Text>
        <Text style={styles.reference}>Isaiah 43:19 KJV</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
    paddingHorizontal: 24,
    paddingTop: 55,
    alignItems: 'center',
  },
  icon: {
    fontSize: 46,
    marginBottom: 10,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 18,
    textAlign: 'center',
  },
  gardenCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 28,
    padding: 28,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
    minHeight: 190,
    justifyContent: 'center',
  },
  scene: {
    color: '#3F2A4D',
    fontSize: 34,
    textAlign: 'center',
    lineHeight: 48,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 18,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 16,
  },
  progressText: {
    color: '#E75480',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 14,
    backgroundColor: '#F4E7F8',
    borderRadius: 20,
    marginBottom: 14,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E75480',
    borderRadius: 20,
  },
  message: {
    color: '#3F2A4D',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
  },
  encouragementTitle: {
    color: '#4B1D7A',
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  encouragement: {
    color: '#4B1D7A',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 25,
  },
  reference: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
  },
});