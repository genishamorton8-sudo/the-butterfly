import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TodayWordScreen() {
  const [completed, setCompleted] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>📖 Today's Word</Text>

      <View style={styles.card}>
        <Text style={styles.reference}>Jeremiah 29:11 KJV</Text>
        <Text style={styles.scripture}>
          "For I know the thoughts that I think toward you, saith the LORD,
          thoughts of peace, and not of evil, to give you an expected end."
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>💭 Reflection</Text>
        <Text style={styles.body}>
          God's plans for your life have not changed because your circumstances
          have changed. His purpose still stands.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>🙏 Today's Prayer</Text>
        <Text style={styles.body}>
          Lord, help me trust Your plans even when I cannot see what You are
          doing. Strengthen my faith today and remind me that You are always
          working for my good. Amen.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>✍️ Journal Prompt</Text>
        <Text style={styles.body}>
          Where do you need to trust God more today?
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>🌱 Today's Healing Step</Text>
        <Text style={styles.body}>
          Spend five quiet minutes thanking God for one thing He has already
          done in your life.
        </Text>
      </View>

      {completed && (
        <View style={styles.completeCard}>
          <Text style={styles.completeTitle}>🦋 Today's Word Complete</Text>
          <Text style={styles.completeText}>
            You took another step today. Pain lied. Purpose didn’t.
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => setCompleted(true)}>
        <Text style={styles.buttonText}>✅ Mark Today's Word Complete</Text>
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
    padding: 20,
    paddingTop: 55,
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#F1D7A7',
  },
  reference: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  scripture: {
    fontSize: 17,
    color: '#4B1D7A',
    textAlign: 'center',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  heading: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  body: {
    color: '#555',
    fontSize: 16,
    lineHeight: 25,
  },
  completeCard: {
    backgroundColor: '#F4E7F8',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  completeTitle: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  completeText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E75480',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});