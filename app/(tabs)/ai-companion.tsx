import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { buildGentleCheckIn } from '../../lib/gentleCheckIns';

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

  function sendMessage() {
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
      text: 'Thank you for sharing that with me. Let’s slow down and take this one step at a time.',
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
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 10,
  },
  cardText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
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
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 22,
  },
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});