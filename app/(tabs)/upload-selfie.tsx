import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function UploadSelfieScreen() {
  const [selfie, setSelfie] = useState<string | null>(null);

  async function choosePhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow photo access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelfie(result.assets[0].uri);
    }
  }

  async function takeSelfie() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Camera permission needed', 'Please allow camera access.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelfie(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.butterfly}>🦋</Text>

      <Text style={styles.title}>Upload Your Selfie</Text>

      <Text style={styles.message}>
        This is your beginning photo. One day, you will look back and see how far you have come.
      </Text>

      {selfie ? (
        <Image source={{ uri: selfie }} style={styles.selfie} />
      ) : (
        <View style={styles.circle}>
          <Text style={styles.circleText}>Your selfie will appear here</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={takeSelfie}>
        <Text style={styles.buttonText}>Take a Selfie</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineButton} onPress={choosePhoto}>
        <Text style={styles.outlineButtonText}>Choose from Photos</Text>
      </TouchableOpacity>

      {selfie && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/journey')}
        >
          <Text style={styles.continueButtonText}>Continue My Journey →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
    paddingHorizontal: 26,
    paddingTop: 80,
    alignItems: 'center',
  },
  butterfly: {
    fontSize: 56,
    marginBottom: 20,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 18,
  },
  message: {
    color: '#3F2A4D',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 35,
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#F4E7F8',
    borderWidth: 4,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
  circleText: {
    color: '#4B1D7A',
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  selfie: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 4,
    borderColor: '#D4AF37',
    marginBottom: 35,
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  outlineButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#4B1D7A',
    fontSize: 17,
    fontWeight: '700',
  },
  continueButton: {
    backgroundColor: '#4B1D7A',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 18,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});