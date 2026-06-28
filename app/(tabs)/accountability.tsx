import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AccountabilityScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [prayerNeeds, setPrayerNeeds] = useState('');

  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');

  function submitNewPartnerRequest() {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing Info', 'Please enter your name and email.');
      return;
    }

    Alert.alert(
      'Request Received',
      'We received your request to build an accountability partnership.'
    );

    setName('');
    setEmail('');
    setCity('');
    setPrayerNeeds('');
  }

  function submitExistingPartnership() {
    if (!partnerName.trim() || !partnerEmail.trim()) {
      Alert.alert('Missing Info', 'Please enter your partner name and email.');
      return;
    }

    Alert.alert(
      'Partnership Added',
      'Your existing Sankofa partnership has been added.'
    );

    setPartnerName('');
    setPartnerEmail('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🤝 Accountability Partners</Text>

        <Text style={styles.subtitle}>
          You were never meant to heal alone.
        </Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Build a Partnership</Text>

          <TextInput
            placeholder="Your Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="City"
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />

          <TextInput
            placeholder="Prayer Needs"
            multiline
            style={[styles.input, styles.textArea]}
            value={prayerNeeds}
            onChangeText={setPrayerNeeds}
          />

          <TouchableOpacity style={styles.button} onPress={submitNewPartnerRequest}>
            <Text style={styles.buttonText}>Find Me a Partner</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Already Paired Through Sankofa?</Text>

          <Text style={styles.note}>
            Use this section if your accountability partnership is already formed.
          </Text>

          <TextInput
            placeholder="Partner's Name"
            style={styles.input}
            value={partnerName}
            onChangeText={setPartnerName}
          />

          <TextInput
            placeholder="Partner's Email"
            style={styles.input}
            value={partnerEmail}
            onChangeText={setPartnerEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={submitExistingPartnership}>
            <Text style={styles.buttonText}>Join Existing Partnership</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B1D7A',
    marginBottom: 10,
  },
  note: {
    color: '#666',
    marginBottom: 14,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#F4E7F8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#E75480',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
  },
});