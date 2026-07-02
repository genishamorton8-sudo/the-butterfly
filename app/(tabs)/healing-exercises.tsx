import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function HealingExercisesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🌿</Text>
      <Text style={styles.title}>Butterfly Healing Studio</Text>
      <Text style={styles.subtitle}>Choose the healing experience you need today.</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/rewrite-scene' as any)}>
        <Text style={styles.cardTitle}>🌅 Rewrite the Scene</Text>
        <Text style={styles.cardText}>Gently revisit a painful memory and rewrite it with safety, compassion, and hope.</Text>
        <Text style={styles.open}>Open</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/change-the-thought' as any)}>
        <Text style={styles.cardTitle}>🧠 Change the Thought</Text>
        <Text style={styles.cardText}>Replace painful beliefs with healthier, truthful thoughts.</Text>
        <Text style={styles.open}>Open</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/meet-younger-me' as any)}>
        <Text style={styles.cardTitle}>👧 Meet Younger Me</Text>
        <Text style={styles.cardText}>Comfort and reconnect with the younger version of yourself.</Text>
        <Text style={styles.open}>Open</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/safe-place' as any)}>
        <Text style={styles.cardTitle}>🏡 Safe Place</Text>
        <Text style={styles.cardText}>Create a peaceful inner place you can return to anytime.</Text>
        <Text style={styles.open}>Open</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/mirror-truth' as any)}>
        <Text style={styles.cardTitle}>🪞 Mirror Truth</Text>
        <Text style={styles.cardText}>Replace lies with truth and speak kindly over yourself.</Text>
        <Text style={styles.open}>Open</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/letters-never-sent' as any)}>
        <Text style={styles.cardTitle}>💌 Letters Never Sent</Text>
        <Text style={styles.cardText}>Write the words your heart has been carrying without pressure to send them.</Text>
        <Text style={styles.open}>Open</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/future-self' as any)}>
        <Text style={styles.cardTitle}>🌸 Future Self</Text>
        <Text style={styles.cardText}>Meet the healed version of you and take one step toward her.</Text>
        <Text style={styles.open}>Open</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/dashboard' as any)}>
        <Text style={styles.backText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  content: { padding: 24, paddingTop: 70, paddingBottom: 120 },
  icon: { fontSize: 58, textAlign: 'center', marginBottom: 10 },
  title: { color: '#4B1D7A', fontSize: 32, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: '#555', fontSize: 16, textAlign: 'center', marginTop: 10, marginBottom: 24, lineHeight: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 20, borderWidth: 2, borderColor: '#F1D7A7', marginBottom: 16 },
  cardTitle: { color: '#4B1D7A', fontSize: 21, fontWeight: '900', marginBottom: 8 },
  cardText: { color: '#3F2A4D', fontSize: 15, lineHeight: 22 },
  open: { color: '#E75480', fontSize: 14, fontWeight: '900', marginTop: 12 },
  backButton: { borderColor: '#4B1D7A', borderWidth: 2, padding: 16, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  backText: { color: '#4B1D7A', fontSize: 16, fontWeight: '900' },
});