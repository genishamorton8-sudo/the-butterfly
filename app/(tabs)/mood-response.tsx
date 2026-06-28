import { router, useLocalSearchParams } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const responses: any = {
  Peaceful: {
    scripture: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee.',
    reference: 'Isaiah 26:3 KJV',
    prayer: 'Lord, thank You for peace. Help me carry this peace gently today and share it with someone who needs encouragement.',
    prompt: 'What is helping you feel peaceful today?',
    encouragement: 'Your peace is not small. It is a gift.',
  },
  Discouraged: {
    scripture: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God.',
    reference: 'Isaiah 41:10 KJV',
    prayer: 'Lord, meet me in this discouraged place. Strengthen my heart and help me take one small step today.',
    prompt: 'What burden are you carrying today?',
    encouragement: 'You are not finished. God is still working in you.',
  },
  Anxious: {
    scripture: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
    reference: 'Philippians 4:6 KJV',
    prayer: 'Lord, calm my heart. Help me breathe, slow down, and trust You with what I cannot control.',
    prompt: 'What is making your heart feel anxious?',
    encouragement: 'You do not have to solve everything right now.',
  },
  Hopeful: {
    scripture: 'Now the God of hope fill you with all joy and peace in believing.',
    reference: 'Romans 15:13 KJV',
    prayer: 'Lord, thank You for hope. Help me keep believing even while I wait.',
    prompt: 'What are you believing God for?',
    encouragement: 'Hope is evidence that something inside you is still reaching forward.',
  },
  Overwhelmed: {
    scripture: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
    reference: 'Matthew 11:28 KJV',
    prayer: 'Lord, I feel overwhelmed. Help me lay down what is too heavy and receive Your rest today.',
    prompt: 'What is one thing you can release today?',
    encouragement: 'You only need the next step, not the whole staircase.',
  },
};

export default function MoodResponseScreen() {
  const params = useLocalSearchParams();
  const mood = String(params.mood || 'Discouraged');
  const response = responses[mood] || responses.Discouraged;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.butterfly}>🦋</Text>

      <Text style={styles.title}>Today You Feel {mood}</Text>

      <Text style={styles.subtitle}>
        Let’s care for your heart one step at a time.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Scripture</Text>
        <Text style={styles.scripture}>“{response.scripture}”</Text>
        <Text style={styles.reference}>{response.reference}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Prayer</Text>
        <Text style={styles.text}>{response.prayer}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Journal Prompt</Text>
        <Text style={styles.text}>{response.prompt}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Encouragement</Text>
        <Text style={styles.text}>{response.encouragement}</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/(tabs)/journal' as any)}
      >
        <Text style={styles.primaryButtonText}>Continue to Journal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
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
    paddingHorizontal: 24,
    paddingTop: 65,
    paddingBottom: 110,
    alignItems: 'center',
  },
  butterfly: {
    fontSize: 54,
    marginBottom: 10,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 31,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 22,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 16,
  },
  cardLabel: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
  },
  scripture: {
    color: '#3F2A4D',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    fontWeight: '700',
  },
  reference: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 12,
  },
  text: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  secondaryButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});