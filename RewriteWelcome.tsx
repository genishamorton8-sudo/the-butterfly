import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RewriteWelcomeProps = {
  onBegin: () => void;
  onExit: () => void;
};

export default function RewriteWelcome({ onBegin, onExit }: RewriteWelcomeProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Guided Healing Session</Text>
      <Text style={styles.title}>Rewrite the Scene</Text>
      <Text style={styles.text}>You are in control of this experience. You can pause, leave, or come back later.</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onBegin}>
        <Text style={styles.primaryText}>Begin Safely</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onExit}>
        <Text style={styles.secondaryText}>Pause & Exit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 26, padding: 24 },
  kicker: { color: '#D4AF37', fontSize: 13, fontWeight: '900', marginBottom: 8 },
  title: { color: '#4B1D7A', fontSize: 32, fontWeight: '900', marginBottom: 18 },
  text: { color: '#3F2A4D', fontSize: 16, lineHeight: 25, marginBottom: 18 },
  primaryButton: { backgroundColor: '#E75480', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  secondaryButton: { backgroundColor: '#EFE7F7', borderRadius: 18, paddingVertical: 16, alignItems: 'center', marginTop: 12 },
  secondaryText: { color: '#4B1D7A', fontSize: 16, fontWeight: '900' },
});
