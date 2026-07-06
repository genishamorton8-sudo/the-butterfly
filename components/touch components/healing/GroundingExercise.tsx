import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type GroundingExerciseProps = {
  onContinue: () => void;
  onExit: () => void;
};

export default function GroundingExercise({
  onContinue,
  onExit,
}: GroundingExerciseProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Grounding Exercise</Text>

      <Text style={styles.title}>Come back to now</Text>

      <Text style={styles.text}>
        Before we continue, let’s help your body remember that you are here, in
        this moment.
      </Text>

      <View style={styles.steps}>
        <GroundingStep number="5" text="Name five things you can see." />
        <GroundingStep number="4" text="Notice four things you can touch." />
        <GroundingStep number="3" text="Listen for three sounds." />
        <GroundingStep number="2" text="Notice two scents or smells." />
        <GroundingStep
          number="1"
          text="Take one slow breath and name one thing that reminds you you are safe today."
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
        <Text style={styles.primaryText}>I Feel Ready to Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onExit}>
        <Text style={styles.secondaryText}>Pause & Exit</Text>
      </TouchableOpacity>
    </View>
  );
}

function GroundingStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <View style={styles.step}>
      <View style={styles.numberCircle}>
        <Text style={styles.numberText}>{number}</Text>
      </View>

      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
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
    color: '#4B1D7A',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 12,
  },
  text: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  steps: {
    gap: 14,
    marginBottom: 24,
  },
  step: {
    backgroundColor: '#FFF8F2',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  numberCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFE7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: '#4B1D7A',
    fontWeight: '900',
    fontSize: 18,
  },
  stepText: {
    flex: 1,
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#E75480',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#EFE7F7',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryText: {
    color: '#4B1D7A',
    fontWeight: '900',
    fontSize: 16,
  },
});