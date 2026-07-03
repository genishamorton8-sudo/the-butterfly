import { StyleSheet, Text, View } from 'react-native';

import PrayerCard from './PrayerCard';
import RecommendationCard from './RecommendationCard';

type Recommendation = {
  title: string;
  description: string;
  route: string;
  icon: string;
};

type MessageBubbleProps = {
  sender: 'butterfly' | 'user';
  text: string;
  recommendation?: Recommendation;
  prayer?: string;
  shouldOfferPrayer?: boolean;
  onPray: (prayer: string) => void;
};

export default function MessageBubble({
  sender,
  text,
  recommendation,
  prayer,
  shouldOfferPrayer,
  onPray,
}: MessageBubbleProps) {
  const isUser = sender === 'user';

  return (
    <View
      style={[
        styles.messageBubble,
        isUser ? styles.userBubble : styles.butterflyBubble,
      ]}
    >
      <Text style={[styles.messageText, isUser ? styles.userText : styles.butterflyText]}>
        {text}
      </Text>

      {!isUser && shouldOfferPrayer && prayer && (
        <PrayerCard prayer={prayer} onPray={() => onPray(prayer)} />
      )}

      {!isUser && recommendation && (
        <RecommendationCard recommendation={recommendation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '90%',
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
  messageText: {
    fontSize: 16,
    lineHeight: 23,
  },
  butterflyText: {
    color: '#3F2A4D',
  },
  userText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});