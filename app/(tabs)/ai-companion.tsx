import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { buildGentleCheckIn } from '../../lib/gentleCheckIns';

type Message = {
  id: number;
  sender: 'user' | 'butterfly';
  text: string;
};

export default function AICompanionScreen() {
  const gentleCheckIn = buildGentleCheckIn();

  const [message, setMessage] = useState('');
  const [lastEmotion, setLastEmotion] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'butterfly',
      text: 'I am here with you. Tell me what is on your heart today.',
    },
  ]);

  function detectEmotion(input: string) {
    const text = input.toLowerCase();

    if (text.includes('anxious') || text.includes('anxiety') || text.includes('worried') || text.includes('overthinking') || text.includes('nervous')) return 'anxiety';
    if (text.includes('sad') || text.includes('depress') || text.includes('down') || text.includes('cry')) return 'sadness';
    if (text.includes('angry') || text.includes('mad') || text.includes('resent') || text.includes('frustrat')) return 'anger';
    if (text.includes('hurt') || text.includes('pain') || text.includes('wound')) return 'hurt';
    if (text.includes('afraid') || text.includes('fear') || text.includes('scared') || text.includes('terrified')) return 'fear';
    if (text.includes('grief') || text.includes('loss') || text.includes('died') || text.includes('miss') || text.includes('passed away')) return 'grief';
    if (text.includes('ashamed') || text.includes('shame') || text.includes('worthless') || text.includes('not enough') || text.includes('guilty')) return 'shame';
    if (text.includes('alone') || text.includes('lonely') || text.includes('rejected') || text.includes('isolated')) return 'loneliness';
    if (text.includes('purpose') || text.includes('calling') || text.includes('direction') || text.includes('lost') || text.includes('confused')) return 'purpose';
    if (text.includes('forgive') || text.includes('betray')) return 'forgiveness';
    if (text.includes('hope') || text.includes('grateful') || text.includes('thankful') || text.includes('blessed')) return 'hope';
    if (text.includes('tired') || text.includes('exhausted') || text.includes('overwhelm') || text.includes('burnt out') || text.includes('burned out')) return 'weary';

    return null;
  }

  const fallbackResponses = [
    'Thank you for sharing that with me. What feels most present for you right now — a thought, a memory, or a feeling?',
    'I hear you. Would it help to put this into words in your journal, or talk it through a bit more here?',
    'I am still here with you. Is there a specific moment today that brought this up?',
    'That matters, and so do you. What do you think your heart needs most right now?',
    'Thank you for trusting me with this. Would prayer, journaling, or a healing exercise feel right for this?',
  ];

  function buildResponse(input: string) {
    const emotion = detectEmotion(input);

    if (emotion) {
      setLastEmotion(emotion);
    }

    if (emotion === 'anxiety') {
      return 'Thank you for trusting me with that. Anxiety can feel overwhelming. Would you like to pray together, journal about it, or try a grounding exercise?';
    }

    if (emotion === 'sadness') {
      return 'I am sorry you are carrying that sadness. You do not have to carry it alone. Would you like to write about what happened or spend a moment in prayer?';
    }

    if (emotion === 'anger') {
      return 'It sounds like something has hurt or frustrated you. Let’s understand what happened before we decide what to do next.';
    }

    if (emotion === 'hurt') {
      return 'Thank you for telling me. Being hurt can affect us deeply. Would it help to work through a healing exercise together?';
    }

    if (emotion === 'fear') {
      return 'Fear often grows when we feel alone. I am here with you. Let’s take one small step together.';
    }

    if (emotion === 'grief') {
      return 'Grief can feel heavy because love was real. You do not have to rush your heart through this. Would writing about what you miss most feel right today?';
    }

    if (emotion === 'shame') {
      return 'Shame tries to make your worst moment feel like your whole identity. It is not. Would Rewrite the Scene or Mirror Truth feel like a good next step?';
    }

    if (emotion === 'loneliness') {
      return 'Feeling alone can make the heart feel invisible, but your presence and your story still matter. Is there a safe person you could reach out to today?';
    }

    if (emotion === 'purpose') {
      return 'Searching for direction does not mean you are lost. Purpose often unfolds one step at a time. What is one thing you feel drawn toward right now?';
    }

    if (emotion === 'forgiveness') {
      return 'Forgiveness is its own kind of healing, and it can take time. You do not have to have it all resolved today. What feels most true for you right now?';
    }

    if (emotion === 'hope') {
      return 'I love hearing that. Gratitude and hope are proof that healing is already taking root in you. What has been helping you feel this way?';
    }

    if (emotion === 'weary') {
      return 'It sounds like you are running on empty. Rest is not giving up, it is part of healing. What would feel most restful for you right now?';
    }

    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
  }

  async function sendMessage() {

    if (!message.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: message.trim(),
    };

    const butterflyMessage: Message = {
      id: Date.now() + 1,
      sender: 'butterfly',
      text: buildResponse(message),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      butterflyMessage,
    ]);

    setMessage('');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <MaterialCommunityIcons name="butterfly" size={42} color="#E75480" />
        <Text style={styles.heroTitle}>Butterfly Companion</Text>
        <Text style={styles.heroText}>
          Welcome back. Let’s continue your healing journey one honest step at a time.
        </Text>
      </View>

      <HealingCard
        icon="heart-outline"
        title={gentleCheckIn.title}
        text={gentleCheckIn.message}
      />

      <HealingCard
        icon="leaf"
        title="Today’s Healing Focus"
        text="Slow down, breathe, and notice what your heart needs before you push forward."
      />

      <HealingCard
        icon="book-open-page-variant"
        title="Scripture"
        text="Philippians 1:6 — God is still working in you."
      />

      <HealingCard
        icon="hands-pray"
        title="Prayer"
        text="Father, guide my healing today. Help me feel safe, seen, and strengthened. Amen."
      />

      {lastEmotion && (
        <View style={styles.memoryCard}>
          <Text style={styles.memoryTitle}>Butterfly remembers</Text>
          <Text style={styles.memoryText}>
            Today, your heart has been carrying {lastEmotion}.
          </Text>
        </View>
      )}

      <View style={styles.chatBox}>
        <Text style={styles.chatTitle}>Continue Conversation</Text>

        {messages.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageBubble,
              item.sender === 'user' ? styles.userBubble : styles.butterflyBubble,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        ))}

        <TextInput
          style={styles.input}
          placeholder="Tell Butterfly what’s on your heart..."
          placeholderTextColor="#8B7A90"
          multiline
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send to Butterfly</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

type HealingCardProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  text: string;
};

function HealingCard({ icon, title, text }: HealingCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={26} color="#4B1D7A" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>

      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  content: { padding: 20, paddingBottom: 40 },
  hero: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#E75480',
    alignItems: 'center',
  },
  heroTitle: {
    color: '#4B1D7A',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 10,
    textAlign: 'center',
  },
  heroText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E8DFF0',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardTitle: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 10,
  },
  cardText: { color: '#3F2A4D', fontSize: 15, lineHeight: 23 },
  memoryCard: {
    backgroundColor: '#FFF3D6',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  memoryTitle: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  memoryText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 22,
  },
  chatBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginTop: 6,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  chatTitle: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
  },
  messageBubble: { borderRadius: 18, padding: 12, marginBottom: 10 },
  butterflyBubble: { backgroundColor: '#F4EAF8' },
  userBubble: { backgroundColor: '#FFE4EC' },
  messageText: { color: '#3F2A4D', fontSize: 15, lineHeight: 22 },
  input: {
    backgroundColor: '#FFF9F3',
    borderRadius: 16,
    minHeight: 110,
    padding: 14,
    color: '#3F2A4D',
    fontSize: 15,
    textAlignVertical: 'top',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#E75480',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});