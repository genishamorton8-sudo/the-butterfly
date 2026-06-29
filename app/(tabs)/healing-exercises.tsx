import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HealingExercisesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🌿</Text>

      <Text style={styles.title}>Butterfly Healing Studio</Text>

      <Text style={styles.subtitle}>
        Start gently. Imagery rescripting is the foundation of this healing space.
      </Text>

      <View style={styles.featureCard}>
        <Text style={styles.featureLabel}>Foundation Exercise</Text>
        <Text style={styles.featureTitle}>🌅 Rewrite the Scene</Text>
        <Text style={styles.featureText}>
          Revisit a painful memory with compassion, protection, truth, and hope.
          This guided practice helps you imagine what you needed then and carry
          a new meaning now.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/rewrite-scene' as any)}
        >
          <Text style={styles.primaryButtonText}>Begin Rewrite the Scene</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Healing Tools</Text>

      <View style={styles.grid}>
        <ToolCard
          title="Change the Thought"
          emoji="🧠"
          text="Cognitive restructuring for painful thoughts."
        />

        <ToolCard
          title="Meet Younger Me"
          emoji="👧"
          text="Comfort the part of you that needed care."
        />

        <ToolCard
          title="Letters Never Sent"
          emoji="💌"
          text="Release words you never got to say."
        />

        <ToolCard
          title="Mirror Truth"
          emoji="🪞"
          text="Replace lies with truth and compassion."
        />

        <ToolCard
          title="Safe Place"
          emoji="🏡"
          text="Imagine a place where your nervous system can rest."
        />

        <ToolCard
          title="Future Self"
          emoji="🌸"
          text="Picture the healed version of you walking forward."
        />
      </View>

      <View style={styles.safetyCard}>
        <Text style={styles.safetyTitle}>Gentle Reminder</Text>
        <Text style={styles.safetyText}>
          If an exercise feels too heavy, pause. You can pray, breathe, journal,
          return later, or reach out for support. Healing does not have to be rushed.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ToolCard({
  title,
  emoji,
  text,
}: {
  title: string;
  emoji: string;
  text: string;
}) {
  return (
    <View style={styles.toolCard}>
      <Text style={styles.toolEmoji}>{emoji}</Text>
      <Text style={styles.toolTitle}>{title}</Text>
      <Text style={styles.toolText}>{text}</Text>
      <Text style={styles.comingSoon}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 120,
    alignItems: 'center',
  },
  icon: {
    fontSize: 58,
    marginBottom: 10,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 33,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#3F2A4D',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 26,
    padding: 22,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 24,
  },
  featureLabel: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    color: '#4B1D7A',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  featureText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: '#E75480',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#4B1D7A',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    borderRadius: 22,
    padding: 16,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 14,
    alignItems: 'center',
  },
  toolEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  toolTitle: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  toolText: {
    color: '#3F2A4D',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 8,
  },
  comingSoon: {
    color: '#E75480',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
  safetyCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginTop: 10,
    marginBottom: 18,
  },
  safetyTitle: {
    color: '#4B1D7A',
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  safetyText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  secondaryButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});