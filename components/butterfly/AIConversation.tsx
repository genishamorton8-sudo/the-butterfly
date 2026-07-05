import { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { butterflyBrain } from '../../lib/butterfly-brain';
import {
  buildMemoryGreeting,
  updateCompanionMemory,
} from '../../lib/butterflyCompanion';
import { addTimelineEntry } from '../../lib/healingTimeline';

type Message = {
  id: number;
  sender: 'user' | 'butterfly';
  text: string;
  time: string;
  theme?: string;
  prayer?: string;
  scripture?: string;
  recommendation?: string;
};

function getTimeStamp() {
  return new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AIConversation() {
  const scrollRef = useRef<ScrollView>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'butterfly',
      text: buildMemoryGreeting(),
      time: getTimeStamp(),
    },
  ]);

  function scrollToBottom() {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }

  function sendMessage() {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const response = butterflyBrain(userText);

    updateCompanionMemory(response.theme);
    addTimelineEntry(
      response.theme,
      response.scripture,
      response.recommendation
    );

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: 'user',
        text: userText,
        time: getTimeStamp(),
      },
    ]);

    setInput('');
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'butterfly',
          text: 'Thank you for trusting me with that. Here is what I am noticing for your healing journey today.',
          time: getTimeStamp(),
          theme: response.theme,
          prayer: response.prayer,
          scripture: response.scripture,
          recommendation: response.recommendation,
        },
      ]);

      setIsTyping(false);
      scrollToBottom();
    }, 900);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Butterfly Companion</Text>

      <ScrollView
        ref={scrollRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.bubble,
              message.sender === 'user'
                ? styles.userBubble
                : styles.butterflyBubble,
            ]}
          >
            <Text style={styles.text}>{message.text}</Text>

            {message.theme && (
              <View style={styles.responseCard}>
                <Text style={styles.cardLabel}>Healing Focus</Text>
                <Text style={styles.cardText}>{message.theme}</Text>
              </View>
            )}

            {message.scripture && (
              <View style={styles.responseCard}>
                <Text style={styles.cardLabel}>Scripture</Text>
                <Text style={styles.cardText}>{message.scripture}</Text>
              </View>
            )}

            {message.prayer && (
              <View style={styles.responseCard}>
                <Text style={styles.cardLabel}>Prayer</Text>
                <Text style={styles.cardText}>{message.prayer}</Text>
              </View>
            )}

            {message.recommendation && (
              <View style={styles.responseCard}>
                <Text style={styles.cardLabel}>Next Step</Text>
                <Text style={styles.cardText}>{message.recommendation}</Text>
              </View>
            )}

            <Text style={styles.time}>{message.time}</Text>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.bubble, styles.butterflyBubble]}>
            <Text style={styles.typingText}>Butterfly is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <TextInput
        style={styles.input}
        multiline
        value={input}
        onChangeText={setInput}
        placeholder="Share what you're feeling..."
        placeholderTextColor="#8B7A90"
      />

      <TouchableOpacity
        style={[styles.button, isTyping ? styles.disabledButton : null]}
        onPress={sendMessage}
      >
        <Text style={styles.buttonText}>
          {isTyping ? 'Listening...' : 'Send'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 18,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4B1D7A',
    marginBottom: 18,
  },
  chatArea: {
    maxHeight: 430,
    marginBottom: 12,
  },
  chatContent: {
    paddingBottom: 10,
  },
  bubble: {
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  butterflyBubble: {
    backgroundColor: '#EFE7F7',
  },
  userBubble: {
    backgroundColor: '#FFE5EF',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#3F2A4D',
  },
  responseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
  },
  cardLabel: {
    color: '#4B1D7A',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  cardText: {
    color: '#3F2A4D',
    fontSize: 14,
    lineHeight: 20,
  },
  time: {
    color: '#8B7A90',
    fontSize: 11,
    marginTop: 8,
    textAlign: 'right',
  },
  typingText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#8B7A90',
  },
  input: {
    backgroundColor: '#FFF8F2',
    minHeight: 100,
    borderRadius: 18,
    padding: 14,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#E75480',
    marginTop: 15,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});