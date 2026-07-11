import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type GroundingExerciseProps = {
  onContinue: () => void;
  onExit: () => void;
};

export default function GroundingExercise({ onContinue, onExit }: GroundingExerciseProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Grounding Exercise</Text>
      <Text style={styles.title}>Come back to now</Text>
      <Text style={styles.text}>Name 5 things you see, 4 things you touch, 3 sounds, 2 scents, and 1 thing that reminds you you are safe today.</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
        <Text style={styles.primaryText}>I Feel Ready to Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onExit}>
        <Text style={styles.secondaryText}>Pause & Exit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24 },
  kicker: { color: '#D4AF37', fontSize: 13, fontWeight: '900', marginBottom: 8 },
  title: { color: '#4B1D7A', fontSize: 30, fontWeight: '900', marginBottom: 12 },
  text: { color: '#3F2A4D', fontSize: 16, lineHeight: 24, marginBottom: 20 },
  primaryButton: { backgroundColor: '#E75480', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  primaryText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },
  secondaryButton: { backgroundColor: '#EFE7F7', borderRadius: 18, paddingVertical: 16, alignItems: 'center', marginTop: 12 },
  secondaryText: { color: '#4B1D7A', fontWeight: '900', fontSize: 16 },
});
