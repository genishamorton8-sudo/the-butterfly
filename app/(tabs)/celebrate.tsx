import { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function CelebrateScreen() {
  const [post, setPost] = useState('');
  const [shared, setShared] = useState(false);

  function postCelebration() {
    Keyboard.dismiss();
    setShared(true);
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.icon}>🎉</Text>
          <Text style={styles.title}>Celebrate Progress</Text>
          <Text style={styles.subtitle}>Small wins still count.</Text>

          <View style={styles.card}>
            <Text style={styles.prompt}>Today I celebrate...</Text>

            <TextInput
              style={styles.input}
              placeholder="Write your win here..."
              placeholderTextColor="#9B8AA8"
              multiline
              value={post}
              onChangeText={(text) => {
                setPost(text);
                setShared(false);
              }}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.doneButton} onPress={Keyboard.dismiss}>
              <Text style={styles.doneButtonText}>Done Writing</Text>
            </TouchableOpacity>

            {shared && (
              <Text style={styles.sharedText}>
                Celebration posted. Pain lied. Purpose didn’t.
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={postCelebration}>
            <Text style={styles.buttonText}>Post Celebration</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 120,
    alignItems: 'center',
  },
  icon: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 26,
    padding: 22,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 22,
  },
  prompt: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 14,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F4E7F8',
    minHeight: 190,
    borderRadius: 18,
    padding: 16,
    fontSize: 17,
    color: '#3F2A4D',
  },
  doneButton: {
    marginTop: 14,
    borderColor: '#4B1D7A',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#4B1D7A',
    fontWeight: '800',
    fontSize: 16,
  },
  sharedText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});