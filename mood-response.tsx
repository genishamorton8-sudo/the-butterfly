import { router, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const responses: Record<string, any> = {
  Happy: {
    scripture: 'The joy of the Lord is your strength.',
    reference: 'Nehemiah 8:10 KJV',
    prayer: 'Lord, thank You for joy. Help me carry it with gratitude and share it with someone else today.',
    prompt: 'What is bringing you joy today?',
    encouragement: 'Your joy matters. Let it breathe today.',
  },
  Joyful: {
    scripture: 'Rejoice in the Lord alway: and again I say, Rejoice.',
    reference: 'Philippians 4:4 KJV',
    prayer: 'Lord, thank You for moments of joy. Teach me to recognize Your goodness in them.',
    prompt: 'Where do you see God’s goodness today?',
    encouragement: 'Joy is strength rising inside you.',
  },
  Grateful: {
    scripture: 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.',
    reference: '1 Thessalonians 5:18 KJV',
    prayer: 'Lord, thank You for what I have, what You have kept me through, and what You are still doing.',
    prompt: 'What are three things you are thankful for?',
    encouragement: 'Gratitude helps your heart notice what is still good.',
  },
  Peaceful: {
    scripture: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee.',
    reference: 'Isaiah 26:3 KJV',
    prayer: 'Lord, help me protect this peace and keep my mind stayed on You.',
    prompt: 'What is helping you feel peaceful today?',
    encouragement: 'Peace is a gift. Let it settle in your heart.',
  },
  Strong: {
    scripture: 'I can do all things through Christ which strengtheneth me.',
    reference: 'Philippians 4:13 KJV',
    prayer: 'Lord, thank You for strength. Help me use it with wisdom, grace, and humility.',
    prompt: 'Where have you noticed strength in yourself lately?',
    encouragement: 'You are stronger than the moment trying to discourage you.',
  },
  Hopeful: {
    scripture: 'Now the God of hope fill you with all joy and peace in believing.',
    reference: 'Romans 15:13 KJV',
    prayer: 'Lord, keep hope alive in me. Help me believe while I wait.',
    prompt: 'What are you hoping for today?',
    encouragement: 'Hope means something in you is still reaching forward.',
  },
  Confident: {
    scripture: 'Being confident of this very thing, that he which hath begun a good work in you will perform it.',
    reference: 'Philippians 1:6 KJV',
    prayer: 'Lord, help my confidence rest in You and not in pressure to be perfect.',
    prompt: 'What good work do you believe God is doing in you?',
    encouragement: 'Confidence grows when you remember who is walking with you.',
  },
  Loved: {
    scripture: 'Yea, I have loved thee with an everlasting love.',
    reference: 'Jeremiah 31:3 KJV',
    prayer: 'Lord, help me receive Your love without fear, doubt, or resistance.',
    prompt: 'Where do you need to receive love today?',
    encouragement: 'You are deeply loved, even on the days you forget.',
  },
  Encouraged: {
    scripture: 'Wherefore comfort yourselves together, and edify one another.',
    reference: '1 Thessalonians 5:11 KJV',
    prayer: 'Lord, thank You for encouragement. Help me be strengthened and strengthen someone else.',
    prompt: 'Who or what encouraged you recently?',
    encouragement: 'Encouragement is fuel for the next step.',
  },
  Excited: {
    scripture: 'This is the Lord’s doing; it is marvellous in our eyes.',
    reference: 'Psalm 118:23 KJV',
    prayer: 'Lord, thank You for expectation. Help me enjoy what You are doing without fear.',
    prompt: 'What are you excited about?',
    encouragement: 'Excitement can be a sign that hope is waking up.',
  },

  Meh: {
    scripture: 'My grace is sufficient for thee: for my strength is made perfect in weakness.',
    reference: '2 Corinthians 12:9 KJV',
    prayer: 'Lord, meet me in the middle place. I may not feel much today, but I still need You.',
    prompt: 'What is one small thing you can do for your heart today?',
    encouragement: 'You do not have to feel amazing to still be growing.',
  },
  Confused: {
    scripture: 'For God is not the author of confusion, but of peace.',
    reference: '1 Corinthians 14:33 KJV',
    prayer: 'Lord, bring clarity to my mind and peace to my heart.',
    prompt: 'What feels unclear right now?',
    encouragement: 'You can take one step before you understand the whole path.',
  },
  Unsure: {
    scripture: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding.',
    reference: 'Proverbs 3:5 KJV',
    prayer: 'Lord, help me trust You when I do not have all the answers.',
    prompt: 'Where do you need guidance today?',
    encouragement: 'Uncertainty is not failure. It is a place where trust can grow.',
  },
  Tired: {
    scripture: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
    reference: 'Matthew 11:28 KJV',
    prayer: 'Lord, restore my strength. Help me rest without guilt.',
    prompt: 'What kind of rest do you need today?',
    encouragement: 'Rest is not quitting. Rest is wisdom.',
  },
  Overwhelmed: {
    scripture: 'When my heart is overwhelmed: lead me to the rock that is higher than I.',
    reference: 'Psalm 61:2 KJV',
    prayer: 'Lord, lead me higher than what is weighing me down.',
    prompt: 'What is one thing you can release today?',
    encouragement: 'You do not have to carry everything at once.',
  },
  Nervous: {
    scripture: 'What time I am afraid, I will trust in thee.',
    reference: 'Psalm 56:3 KJV',
    prayer: 'Lord, steady my heart and help me trust You step by step.',
    prompt: 'What is making you nervous?',
    encouragement: 'You can be nervous and still move forward.',
  },
  Numb: {
    scripture: 'The Lord is nigh unto them that are of a broken heart.',
    reference: 'Psalm 34:18 KJV',
    prayer: 'Lord, meet me even when I do not know what I feel.',
    prompt: 'What is one thing on your mind right now?',
    encouragement: 'Numb is still a feeling. You are still here, and that matters.',
  },

  Sad: {
    scripture: 'They that sow in tears shall reap in joy.',
    reference: 'Psalm 126:5 KJV',
    prayer: 'Lord, hold me in this sadness and remind me joy can come again.',
    prompt: 'What is your sadness trying to say?',
    encouragement: 'Your tears are not wasted.',
  },
  Heartbroken: {
    scripture: 'He healeth the broken in heart, and bindeth up their wounds.',
    reference: 'Psalm 147:3 KJV',
    prayer: 'Lord, touch the places in me that feel broken.',
    prompt: 'What part of your heart needs care today?',
    encouragement: 'A broken heart can still be held by God.',
  },
  Scared: {
    scripture: 'Fear thou not; for I am with thee.',
    reference: 'Isaiah 41:10 KJV',
    prayer: 'Lord, calm my fear and remind me I am not alone.',
    prompt: 'What are you afraid of right now?',
    encouragement: 'Fear is loud, but God is near.',
  },
  Anxious: {
    scripture: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
    reference: 'Philippians 4:6 KJV',
    prayer: 'Lord, calm my thoughts and help me breathe through this moment.',
    prompt: 'What is making your heart feel anxious?',
    encouragement: 'You do not have to solve everything right now.',
  },
  Rejected: {
    scripture: 'He hath made us accepted in the beloved.',
    reference: 'Ephesians 1:6 KJV',
    prayer: 'Lord, remind me that rejection does not define me.',
    prompt: 'Where do you need to feel accepted today?',
    encouragement: 'You are accepted by God, even when people mishandle you.',
  },
  Invisible: {
    scripture: 'I have called thee by thy name; thou art mine.',
    reference: 'Isaiah 43:1 KJV',
    prayer: 'Lord, remind me that You see me fully.',
    prompt: 'Where have you felt unseen lately?',
    encouragement: 'You are seen. You are known. You matter.',
  },
  Lonely: {
    scripture: 'I will never leave thee, nor forsake thee.',
    reference: 'Hebrews 13:5 KJV',
    prayer: 'Lord, meet me in my loneliness and help me feel Your nearness.',
    prompt: 'What kind of connection do you need today?',
    encouragement: 'Lonely does not mean forgotten.',
  },
  Angry: {
    scripture: 'Be ye angry, and sin not.',
    reference: 'Ephesians 4:26 KJV',
    prayer: 'Lord, help me understand my anger and respond with wisdom.',
    prompt: 'What is underneath your anger?',
    encouragement: 'Your anger may be pointing to something that needs care.',
  },
  Stressed: {
    scripture: 'Cast thy burden upon the Lord, and he shall sustain thee.',
    reference: 'Psalm 55:22 KJV',
    prayer: 'Lord, help me release what is too heavy for me.',
    prompt: 'What burden needs to be handed over today?',
    encouragement: 'You were not designed to carry everything alone.',
  },
  Frustrated: {
    scripture: 'Let patience have her perfect work.',
    reference: 'James 1:4 KJV',
    prayer: 'Lord, give me patience, clarity, and peace when things feel difficult.',
    prompt: 'What is frustrating you most right now?',
    encouragement: 'Frustration does not mean you are failing.',
  },
  Discouraged: {
    scripture: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God.',
    reference: 'Isaiah 41:10 KJV',
    prayer: 'Lord, strengthen my heart and help me take one small step.',
    prompt: 'What burden are you carrying today?',
    encouragement: 'You are not finished. God is still working in you.',
  },
  Grieving: {
    scripture: 'Blessed are they that mourn: for they shall be comforted.',
    reference: 'Matthew 5:4 KJV',
    prayer: 'Lord, comfort me in this grief and help me breathe through the ache.',
    prompt: 'What do you miss, need, or wish you could say?',
    encouragement: 'Grief is love looking for a place to go.',
  },
  Ashamed: {
    scripture: 'They looked unto him, and were lightened: and their faces were not ashamed.',
    reference: 'Psalm 34:5 KJV',
    prayer: 'Lord, lift shame off my heart and remind me I can come to You.',
    prompt: 'What shame are you ready to release?',
    encouragement: 'Shame does not get the final word over your life.',
  },
  Guilty: {
    scripture: 'If we confess our sins, he is faithful and just to forgive us our sins.',
    reference: '1 John 1:9 KJV',
    prayer: 'Lord, help me receive forgiveness and walk forward in grace.',
    prompt: 'What do you need to confess, release, or make right?',
    encouragement: 'Conviction can lead to healing. Guilt does not have to trap you.',
  },
  Hopeless: {
    scripture: 'Why art thou cast down, O my soul? hope thou in God.',
    reference: 'Psalm 42:11 KJV',
    prayer: 'Lord, breathe hope into the places that feel empty.',
    prompt: 'What is one reason to stay today?',
    encouragement: 'Hope can start small. Stay for the next breath.',
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
