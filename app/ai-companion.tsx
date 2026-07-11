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
import { addJournalEntry } from '../../lib/journal';

type Message = {
  id: number;
  sender: 'user' | 'butterfly';
  text: string;
};

export default function AICompanionScreen() {
  const gentleCheckIn = buildGentleCheckIn();

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'butterfly',
      text: 'I am here with you. Tell me what is on your heart today.',
    },
  ]);

  function buildResponse(input: string) {
    const text = input.toLowerCase();

    if (text.includes('anxious') || text.includes('anxiety')) {
      return 'Thank you for trusting me. Anxiety can feel overwhelming. Would you like to pray together, journal about it, or try a grounding exercise?';
    }

    if (text.includes('sad')) {
      return 'I am sorry you are carrying that sadness. You do not have to carry it alone. Would it help to write about what happened or spend a moment in prayer?';
    }

    if (text.includes('angry') || text.includes('mad')) {
      return 'It sounds like something has hurt or frustrated you. Let us understand what happened before deciding what to do next.';
    }

    if (text.includes('hurt')) {
      return 'Thank you for telling me. Being hurt can affect us deeply. Would it help to work through a healing exercise together?';
    }

    if (text.includes('fear') || text.includes('afraid')) {
      return 'Fear often grows when we feel alone. You are not alone. Let us take one small step together.';
    }

    if (text.includes('lonely')) {
      return 'Loneliness can feel heavy. Thank you for trusting me enough to share it. I am here with you.';
    }

    if (text.includes('depressed') || text.includes('depression')) {
      return 'Thank you for telling me. Even when today feels dark, your story is not over. Let us keep walking one Butterfly step at a time.';
    }

    return 'Thank you for sharing that with me. Tell me a little more so I can better understand what you are experiencing.';
  }

  async function sendMessage() {
    if (!message.trim()) return;

    const response = buildResponse(message);

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: message,
    };

    const butterflyMessage: Message = {
      id: Date.now() + 1,
      sender: 'butterfly',
      text: response,
    };

    setMessages((current) => [
      ...current,
      userMessage,
      butterflyMessage,
    ]);

    await addJournalEntry({
      id: Date.now().toString(),
      title: 'Healing Conversation',
      preview:
        message.length > 80
          ? message.substring(0, 80) + '...'
          : message,
      content:
        `Today I shared:\n\n${message}\n\n` +
        `Butterfly responded:\n\n${response}`,
      createdAt: new Date().toISOString(),
    });

    setMessage('');
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.hero}>
        <MaterialCommunityIcons
          name="butterfly"
          size={46}
          color="#E75480"
        />

        <Text style={styles.heroTitle}>
          Butterfly Companion
        </Text>

        <Text style={styles.heroText}>
          Welcome back. Healing happens one honest
          conversation at a time.
        </Text>
      </View>

      <HealingCard
        icon="heart-outline"
        title={gentleCheckIn.title}
        text={gentleCheckIn.message}
      />

      <HealingCard
        icon="leaf"
        title="Today's Healing Focus"
        text="Take one small step today. Healing grows through consistency, not perfection."
      />

      <HealingCard
        icon="book-open-page-variant"
        title="Today's Scripture"
        text="Philippians 1:6 — Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ."
      />

      <HealingCard
        icon="hands-pray"
        title="Prayer"
        text="Father, thank You for walking with me today. Give me courage, wisdom, peace, and strength for every Butterfly step. Amen."
      />

      <View style={styles.chatBox}>
        <Text style={styles.chatTitle}>
          Talk with Butterfly
        </Text>

        {messages.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageBubble,
              item.sender === 'user'
                ? styles.userBubble
                : styles.butterflyBubble,
            ]}
          >
            <Text style={styles.messageText}>
              {item.text}
            </Text>
          </View>
        ))}

        <TextInput
          style={styles.input}
          multiline
          placeholder="Tell Butterfly what's on your heart..."
          placeholderTextColor="#8B7A90"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={sendMessage}
        >
          <Text style={styles.buttonText}>
            Send
          </Text>
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

function HealingCard({
  icon,
  title,
  text,
}: HealingCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons
          name={icon}
          size={26}
          color="#4B1D7A"
        />

        <Text style={styles.cardTitle}>
          {title}
        </Text>
      </View>

      <Text style={styles.cardText}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  hero: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 22,
    borderWidth: 2,
    borderColor: '#E75480',
    alignItems: 'center',
    marginBottom: 20,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#4B1D7A',
    marginTop: 10,
  },

  heroText: {
    marginTop: 10,
    color: '#555',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E7DDF2',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  cardTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '900',
    color: '#4B1D7A',
  },

  cardText: {
    color: '#444',
    lineHeight: 23,
    fontSize: 15,
  },

  chatBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },

  chatTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 12,
  },

  messageBubble: {
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
  },

  butterflyBubble: {
    backgroundColor: '#F4EAF8',
  },

  userBubble: {
    backgroundColor: '#FFE4EC',
  },

  messageText: {
    fontSize: 15,
    color: '#3F2A4D',
    lineHeight: 22,
  },

  input: {
    backgroundColor: '#FFF9F3',
    borderRadius: 16,
    minHeight: 110,
    padding: 14,
    textAlignVertical: 'top',
    color: '#3F2A4D',
    marginTop: 10,
  },

  button: {
    backgroundColor: '#E75480',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 14,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
});