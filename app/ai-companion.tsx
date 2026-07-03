import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { addJournalEntry } from '../lib/journal';

type Message = {
  id: string;
  sender: 'butterfly' | 'user';
  text: string;
};

const starterMessages: Message[] = [
  {
    id: '1',
    sender: 'butterfly',
    text: "Good morning. I'm Butterfly. I'm here with you. What do you need help processing today?",
  },
];

export default function AICompanionScreen() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState('');

  function sendMessage() {
    const trimmed = input.trim();

    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
    };

    const butterflyReply: Message = {
      id: `${Date.now()}-butterfly`,
      sender: 'butterfly',
      text: createButterflyReply(trimmed),
    };

    setMessages((current) => [...current, userMessage, butterflyReply]);
    setInput('');
  }

  async function saveReflection() {
    const conversationText = messages
      .map((message) =>
        message.sender === 'user'
          ? `Me: ${message.text}`
          : `Butterfly: ${message.text}`
      )
      .join('\n\n');

    await addJournalEntry({
      id: Date.now().toString(),
      title: 'Butterfly Conversation',
      exercise: 'Butterfly AI',
      date: new Date().toISOString(),
      preview:
        messages[messages.length - 1]?.text ||
        'A saved conversation with Butterfly.',
      answers: {
        conversation: conversationText,
      },
    });

    Alert.alert(
      'Saved',
      'Your conversation with Butterfly has been saved to your Healing Journal.'
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/(tabs)/dashboard' as any)}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color="#4B1D7A" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <MaterialCommunityIcons name="butterfly" size={42} color="#E75480" />
          <Text style={styles.title}>Butterfly</Text>
          <Text style={styles.subtitle}>Your gentle healing companion</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.chat} contentContainerStyle={styles.chatContent}>
        <View style={styles.safetyCard}>
          <MaterialCommunityIcons name="heart-circle" size={30} color="#E75480" />
          <Text style={styles.safetyText}>
            Butterfly is here for reflection, grounding, prayer, and healing.
            If you are in immediate danger, please call emergency services or
            reach out to someone you trust right now.
          </Text>
        </View>

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user'
                ? styles.userBubble
                : styles.butterflyBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.sender === 'user'
                  ? styles.userText
                  : styles.butterflyText,
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.quickActions}>
        <QuickButton
          icon="weather-windy"
          label="Calm me"
          onPress={() =>
            setMessages((current) => [
              ...current,
              {
                id: Date.now().toString(),
                sender: 'butterfly',
                text: 'Pause with me. Take one slow breath in. Hold it gently. Now let it out. You are here. You are safe in this moment.',
              },
            ])
          }
        />

        <QuickButton
          icon="comment-question"
          label="Question"
          onPress={() =>
            setMessages((current) => [
              ...current,
              {
                id: Date.now().toString(),
                sender: 'butterfly',
                text: 'What feeling is the loudest right now, and what do you wish someone understood about it?',
              },
            ])
          }
        />

        <QuickButton icon="content-save" label="Save" onPress={saveReflection} />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Tell Butterfly what is on your heart..."
          value={input}
          onChangeText={setInput}
          multiline
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <MaterialCommunityIcons name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function createButterflyReply(text: string) {
  const lower = text.toLowerCase();

  if (
    lower.includes('panic') ||
    lower.includes('anxious') ||
    lower.includes('anxiety') ||
    lower.includes('overwhelmed')
  ) {
    return 'That sounds heavy. Let us slow this down together. Put both feet on the floor if you can. Name one thing you can see, one thing you can touch, and one thing your body needs right now.';
  }

  if (
    lower.includes('sad') ||
    lower.includes('cry') ||
    lower.includes('grief') ||
    lower.includes('miss')
  ) {
    return 'I hear tenderness in that. Grief and sadness can feel like waves. You do not have to fight the wave right now. What part of this hurts the most today?';
  }

  if (
    lower.includes('angry') ||
    lower.includes('mad') ||
    lower.includes('frustrated')
  ) {
    return 'Your anger may be trying to protect something important. Let us listen without judging it. What boundary, need, or truth might your anger be pointing to?';
  }

  if (
    lower.includes('worthless') ||
    lower.includes('not enough') ||
    lower.includes('failure')
  ) {
    return 'I am sorry that thought has been so loud. A painful thought is not the same thing as truth. What would you say to someone you loved if they were carrying that same thought?';
  }

  if (
    lower.includes('pray') ||
    lower.includes('god') ||
    lower.includes('jesus') ||
    lower.includes('scripture')
  ) {
    return 'We can bring this to God gently. Take a breath and say, “Lord, meet me right here.” What do you need from Him in this moment: peace, wisdom, comfort, courage, or strength?';
  }

  return 'Thank you for trusting me with that. Let us take it one piece at a time. What feeling is underneath what you just shared?';
}

function QuickButton({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.quickButton} onPress={onPress}>
      <MaterialCommunityIcons name={icon as any} size={20} color="#E75480" />
      <Text style={styles.quickButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF9F3' },
  header: {
    paddingTop: 58,
    paddingHorizontal: 18,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#F1D7A7',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerSpacer: { width: 42 },
  title: {
    color: '#4B1D7A',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 2,
  },
  subtitle: {
    color: '#6B4A78',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  chat: { flex: 1 },
  chatContent: { padding: 18, paddingBottom: 24 },
  safetyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
    flexDirection: 'row',
    gap: 12,
  },
  safetyText: {
    flex: 1,
    color: '#4B1D7A',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
  messageBubble: {
    maxWidth: '86%',
    borderRadius: 22,
    padding: 15,
    marginBottom: 12,
  },
  butterflyBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1D7A7',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#E75480',
    alignSelf: 'flex-end',
  },
  messageText: { fontSize: 16, lineHeight: 23 },
  butterflyText: { color: '#3F2A4D' },
  userText: { color: '#FFFFFF', fontWeight: '700' },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF9F3',
    gap: 8,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F1D7A7',
    borderRadius: 18,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 3,
  },
  quickButtonText: {
    color: '#4B1D7A',
    fontWeight: '900',
    fontSize: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 14,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2,
    borderTopColor: '#F1D7A7',
  },
  input: {
    flex: 1,
    maxHeight: 110,
    minHeight: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#FFF9F3',
    marginRight: 10,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E75480',
    alignItems: 'center',
    justifyContent: 'center',
  },
});