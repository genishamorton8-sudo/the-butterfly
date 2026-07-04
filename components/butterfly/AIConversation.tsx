import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { butterflyBrain } from '../../lib/butterfly-brain';

type Message = {
  id: number;
  sender: 'user' | 'butterfly';
  text: string;
};

export default function AIConversation() {
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'butterfly',
      text: 'Welcome back. I am glad you are here today. Tell me what is on your heart.',
    },
  ]);

  function sendMessage() {
    if (!input.trim()) return;

    const userText = input.trim();
    const result = butterflyBrain(userText);

    const butterflyMessage = `${result.recommendation}

📖 ${result.scripture}

🙏 ${result.prayer}`;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: 'user',
        text: userText,
      },
      {
        id: Date.now() + 1,
        sender: 'butterfly',
        text: butterflyMessage,
      },
    ]);

    setInput('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversation</Text>

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
        </View>
      ))}

      <TextInput
        style={styles.input}
        multiline
        value={input}
        onChangeText={setInput}
        placeholder="Share what you're feeling..."
        placeholderTextColor="#8B7A90"
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4B1D7A',
    marginBottom: 18,
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
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#3F2A4D',
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

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});