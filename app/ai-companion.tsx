import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import ChatHeader from '../components/butterfly/ChatHeader';
import ChatInput from '../components/butterfly/ChatInput';
import MemoryCard from '../components/butterfly/MemoryCard';
import MessageBubble from '../components/butterfly/MessageBubble';
import QuickActions from '../components/butterfly/QuickActions';

import {
    buildWelcomeBackMessage,
    getButterflyMemory,
    updateButterflyMemory,
} from '../lib/butterflyMemory';
import { createButterflyPrayer, shouldOfferPrayer } from '../lib/butterflyPrayer';
import { detectEmotion } from '../lib/emotionDetector';
import { addJournalEntry } from '../lib/journal';

type ExerciseRecommendation = {
  title: string;
  description: string;
  route: string;
  icon: string;
};

type Message = {
  id: string;
  sender: 'butterfly' | 'user';
  text: string;
  recommendation?: ExerciseRecommendation;
  prayer?: string;
  shouldOfferPrayer?: boolean;
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
  const [memoryMessage] = useState(() => {
    const memory = getButterflyMemory();

    if (memory.conversationCount === 0) {
      return '';
    }

    return buildWelcomeBackMessage();
  });

  function sendMessage() {
    const trimmed = input.trim();

    if (!trimmed) return;

    const recommendation = getExerciseRecommendation(trimmed);
    const emotion = detectEmotion(trimmed);
    const offerPrayer = shouldOfferPrayer(trimmed);

    updateButterflyMemory({
      lastConversation: trimmed,
      lastEmotion: emotion === 'unknown' ? undefined : emotion,
      lastExercise: recommendation?.title,
      lastPrayerTopic: offerPrayer ? trimmed : undefined,
    });

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
    };

    const butterflyReply: Message = {
      id: `${Date.now()}-butterfly`,
      sender: 'butterfly',
      text: createButterflyReply(trimmed, recommendation, offerPrayer, emotion),
      recommendation,
      shouldOfferPrayer: offerPrayer,
      prayer: offerPrayer ? createButterflyPrayer(trimmed) : undefined,
    };

    setMessages((current) => [...current, userMessage, butterflyReply]);
    setInput('');
  }

  function addPrayerToChat(prayer: string) {
    if (!prayer) return;

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-prayer`,
        sender: 'butterfly',
        text: prayer,
      },
    ]);
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
  }

  function calmMe() {
    const prayer = createButterflyPrayer('I feel overwhelmed and need peace.');

    updateButterflyMemory({
      lastEmotion: 'overwhelmed',
      lastExercise: 'Safe Place',
      lastPrayerTopic: 'peace and calm',
    });

    setMessages((current) => [
      ...current,
      {
        id: Date.now().toString(),
        sender: 'butterfly',
        text: 'Pause with me. Take one slow breath in. Hold it gently. Now let it out. You are here. You are safe in this moment.',
        recommendation: {
          title: 'Safe Place',
          description:
            'This exercise helps you create a peaceful inner place you can return to when life feels heavy.',
          route: '/(tabs)/safe-place',
          icon: 'home-heart',
        },
        shouldOfferPrayer: true,
        prayer,
      },
    ]);
  }

  function askQuestion() {
    setMessages((current) => [
      ...current,
      {
        id: Date.now().toString(),
        sender: 'butterfly',
        text: 'What feeling is the loudest right now, and what do you wish someone understood about it?',
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ChatHeader />

      <ScrollView style={styles.chat} contentContainerStyle={styles.chatContent}>
        {memoryMessage ? <MemoryCard message={memoryMessage} /> : null}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            sender={message.sender}
            text={message.text}
            recommendation={message.recommendation}
            prayer={message.prayer}
            shouldOfferPrayer={message.shouldOfferPrayer}
            onPray={addPrayerToChat}
          />
        ))}
      </ScrollView>

      <QuickActions
        onCalmMe={calmMe}
        onQuestion={askQuestion}
        onSave={saveReflection}
      />

      <ChatInput value={input} onChangeText={setInput} onSend={sendMessage} />
    </KeyboardAvoidingView>
  );
}

function getExerciseRecommendation(text: string): ExerciseRecommendation | undefined {
  const lower = text.toLowerCase();

  if (
    lower.includes('panic') ||
    lower.includes('anxious') ||
    lower.includes('anxiety') ||
    lower.includes('overwhelmed') ||
    lower.includes('scared') ||
    lower.includes('afraid') ||
    lower.includes('unsafe')
  ) {
    return {
      title: 'Safe Place',
      description:
        'This may help your body and mind slow down by creating a peaceful place you can return to anytime.',
      route: '/(tabs)/safe-place',
      icon: 'home-heart',
    };
  }

  if (
    lower.includes('childhood') ||
    lower.includes('younger') ||
    lower.includes('little me') ||
    lower.includes('when i was a child') ||
    lower.includes('inner child')
  ) {
    return {
      title: 'Meet Younger Me',
      description:
        'This exercise helps you comfort and reconnect with the younger version of yourself.',
      route: '/(tabs)/meet-younger-me',
      icon: 'human-child',
    };
  }

  if (
    lower.includes('memory') ||
    lower.includes('reminded me') ||
    lower.includes('triggered') ||
    lower.includes('old hurt') ||
    lower.includes('past') ||
    lower.includes('trauma')
  ) {
    return {
      title: 'Rewrite the Scene',
      description:
        'This exercise can help you revisit an older painful memory with safety, compassion, truth, and hope.',
      route: '/(tabs)/rewrite-scene',
      icon: 'movie-edit',
    };
  }

  if (
    lower.includes('not enough') ||
    lower.includes('worthless') ||
    lower.includes('failure') ||
    lower.includes('rejected') ||
    lower.includes('unlovable') ||
    lower.includes('hate myself') ||
    lower.includes('i am nothing')
  ) {
    return {
      title: 'Mirror Truth',
      description:
        'This exercise helps you notice a painful lie and replace it with truth.',
      route: '/(tabs)/mirror-truth',
      icon: 'mirror',
    };
  }

  if (
    lower.includes('never said') ||
    lower.includes('letter') ||
    lower.includes('i wish i could tell') ||
    lower.includes('unsaid') ||
    lower.includes('closure') ||
    lower.includes('apology')
  ) {
    return {
      title: 'Letters Never Sent',
      description:
        'This exercise gives your heart room to say what it has been carrying without pressure to send it.',
      route: '/(tabs)/letters-never-sent',
      icon: 'email-outline',
    };
  }

  if (
    lower.includes('future') ||
    lower.includes('become') ||
    lower.includes('better version') ||
    lower.includes('hope') ||
    lower.includes('next step') ||
    lower.includes('purpose')
  ) {
    return {
      title: 'Future Self',
      description:
        'This exercise helps you meet the healed version of you and take one step toward her.',
      route: '/(tabs)/future-self',
      icon: 'star-four-points',
    };
  }

  if (
    lower.includes('thinking') ||
    lower.includes('thought') ||
    lower.includes('can’t stop thinking') ||
    lower.includes("can't stop thinking") ||
    lower.includes('spiraling') ||
    lower.includes('overthinking')
  ) {
    return {
      title: 'Change the Thought',
      description:
        'This exercise helps you name the painful thought and choose a healthier truth.',
      route: '/(tabs)/change-the-thought',
      icon: 'brain',
    };
  }

  return undefined;
}

function createButterflyReply(
  text: string,
  recommendation?: ExerciseRecommendation,
  offerPrayer?: boolean,
  emotion?: string
) {
  const lower = text.toLowerCase();

  if (
    lower.includes('panic') ||
    lower.includes('anxious') ||
    lower.includes('anxiety') ||
    lower.includes('overwhelmed')
  ) {
    return 'That sounds heavy. Let us slow this down together. I have support for your body, your thoughts, and your spirit below.';
  }

  if (emotion === 'grieving') {
    return 'I hear grief in what you shared. You do not have to rush your healing. Let us hold this gently together.';
  }

  if (emotion === 'lonely') {
    return 'Feeling alone can be so heavy. I am here with you in this moment. Let us take this one piece at a time.';
  }

  if (emotion === 'ashamed') {
    return 'Shame can make pain feel louder than truth. You are not your worst moment, and you are not beyond healing.';
  }

  if (
    lower.includes('sad') ||
    lower.includes('cry') ||
    lower.includes('grief') ||
    lower.includes('miss')
  ) {
    return offerPrayer
      ? 'I hear tenderness in that. Grief and sadness can feel like waves. I can sit with you here, and I can pray with you below.'
      : 'I hear tenderness in that. Grief and sadness can feel like waves. You do not have to fight the wave right now. What part of this hurts the most today?';
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
    return 'I am sorry that thought has been so loud. A painful thought is not the same thing as truth. I have support below that may help.';
  }

  if (
    lower.includes('pray') ||
    lower.includes('prayer') ||
    lower.includes('god') ||
    lower.includes('jesus') ||
    lower.includes('scripture') ||
    lower.includes('lord') ||
    lower.includes('faith')
  ) {
    return 'We can bring this to God gently. Tap Pray With Me below, and I will pray with you right here.';
  }

  if (recommendation && offerPrayer) {
    return 'Thank you for trusting me with that. I hear something important underneath what you shared. I have a gentle exercise and prayer support below.';
  }

  if (recommendation) {
    return 'Thank you for trusting me with that. I have a gentle exercise suggestion that may help.';
  }

  if (offerPrayer) {
    return 'Thank you for trusting me with that. I can hold this gently with you, and I can pray with you below.';
  }

  return 'Thank you for trusting me with that. Let us take it one piece at a time. What feeling is underneath what you just shared?';
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  chat: {
    flex: 1,
  },
  chatContent: {
    padding: 18,
    paddingBottom: 24,
  },
})