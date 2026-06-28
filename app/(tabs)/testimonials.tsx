import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TestimonialsScreen() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [testimonials, setTestimonials] = useState([
    {
      name: 'A Butterfly Sister',
      title: 'I felt seen again.',
      message:
        'This space reminded me that healing does not have to happen alone. I could breathe, reflect, and keep going.',
    },
    {
      name: 'A Woman in Process',
      title: 'One small step mattered.',
      message:
        'The daily journey helped me slow down and pay attention to what God was doing in me.',
    },
  ]);

  function addTestimony() {
    if (!name.trim() || !title.trim() || !message.trim()) return;

    setTestimonials([
      {
        name,
        title,
        message,
      },
      ...testimonials,
    ]);

    setName('');
    setTitle('');
    setMessage('');
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.butterfly}>🦋</Text>

      <Text style={styles.heading}>Stories of Hope</Text>

      <Text style={styles.subheading}>
        Every testimony reminds someone that healing is possible.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.message]}
          placeholder="Share your testimony..."
          multiline
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={addTestimony}
        >
          <Text style={styles.buttonText}>
            Add My Testimony
          </Text>
        </TouchableOpacity>
      </View>

      {testimonials.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>

          <Text style={styles.cardMessage}>
            "{item.message}"
          </Text>

          <Text style={styles.cardName}>
            — {item.name}
          </Text>
        </View>
      ))}
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
    paddingBottom: 80,
  },

  butterfly: {
    fontSize: 55,
    textAlign: 'center',
    marginTop: 30,
  },

  heading: {
    fontSize: 32,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginTop: 10,
  },

  subheading: {
    textAlign: 'center',
    color: '#E75480',
    marginBottom: 25,
    marginTop: 10,
    fontSize: 16,
  },

  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#F4E7F8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },

  message: {
    height: 120,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#E75480',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
  },

  card: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4B1D7A',
  },

  cardMessage: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },

  cardName: {
    marginTop: 14,
    textAlign: 'right',
    color: '#E75480',
    fontWeight: '700',
  },
});