import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getGarden, getGardenStage } from '../../lib/garden';
import { loadData, saveData } from '../../lib/storage';

const TRANSFORMATION_KEY = '@butterfly_transformation_photos';

type TransformationPhoto = {
  id: string;
  uri: string;
  date: string;
  growth: number;
  stage: string;
};

export default function UploadSelfieScreen() {
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [photos, setPhotos] = useState<TransformationPhoto[]>([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    const savedPhotos = await loadData<TransformationPhoto[]>(TRANSFORMATION_KEY);

    if (savedPhotos) {
      setPhotos(savedPhotos);

      if (savedPhotos.length > 0) {
        setCurrentPhoto(savedPhotos[0].uri);
      }
    }
  }

  async function savePhoto(uri: string) {
    const garden = await getGarden();
    const stage = getGardenStage(garden.growth);

    const newPhoto: TransformationPhoto = {
      id: Date.now().toString(),
      uri,
      date: new Date().toLocaleDateString(),
      growth: garden.growth,
      stage: stage.title,
    };

    const updatedPhotos = [newPhoto, ...photos];

    await saveData(TRANSFORMATION_KEY, updatedPhotos);

    setPhotos(updatedPhotos);
    setCurrentPhoto(uri);

    Alert.alert(
      'Photo Saved',
      'Your transformation photo has been added to your journey.'
    );
  }

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
      await savePhoto(result.assets[0].uri);
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
      await savePhoto(result.assets[0].uri);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.butterfly}>🦋</Text>

      <Text style={styles.title}>My Transformation</Text>

      <Text style={styles.message}>
        Capture your growth as you heal, bloom, and become.
      </Text>

      {currentPhoto ? (
        <Image source={{ uri: currentPhoto }} style={styles.selfie} />
      ) : (
        <View style={styles.circle}>
          <Text style={styles.circleText}>
            Your first transformation photo will appear here
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={takeSelfie}>
        <Text style={styles.buttonText}>Take a New Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineButton} onPress={choosePhoto}>
        <Text style={styles.outlineButtonText}>Choose from Photos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.gardenButton}
        onPress={() => router.push('/(tabs)/garden' as any)}
      >
        <Text style={styles.gardenButtonText}>View My Butterfly Garden</Text>
      </TouchableOpacity>

      <Text style={styles.timelineTitle}>Transformation Timeline</Text>

      {photos.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            No photos yet. Start with your first transformation photo.
          </Text>
        </View>
      ) : (
        photos.map((photo, index) => (
          <View key={photo.id} style={styles.timelineCard}>
            <Image source={{ uri: photo.uri }} style={styles.timelineImage} />

            <View style={styles.timelineInfo}>
              <Text style={styles.timelineStage}>
                {index === 0 ? 'Current Photo' : 'Journey Photo'}
              </Text>

              <Text style={styles.timelineText}>
                Date: {photo.date}
              </Text>

              <Text style={styles.timelineText}>
                Growth Score: {photo.growth}
              </Text>

              <Text style={styles.timelineText}>
                Stage: {photo.stage}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    paddingHorizontal: 26,
    paddingTop: 70,
    paddingBottom: 130,
    alignItems: 'center',
  },
  butterfly: {
    fontSize: 56,
    marginBottom: 14,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
  },
  message: {
    color: '#3F2A4D',
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 28,
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
    marginBottom: 28,
  },
  circleText: {
    color: '#4B1D7A',
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  selfie: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 4,
    borderColor: '#D4AF37',
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  outlineButton: {
    borderColor: '#4B1D7A',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  outlineButtonText: {
    color: '#4B1D7A',
    fontSize: 17,
    fontWeight: '800',
  },
  gardenButton: {
    backgroundColor: '#4B1D7A',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 28,
  },
  gardenButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  timelineTitle: {
    color: '#4B1D7A',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
  },
  emptyText: {
    color: '#3F2A4D',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 22,
    padding: 16,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  timelineInfo: {
    flex: 1,
  },
  timelineStage: {
    color: '#E75480',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  timelineText: {
    color: '#3F2A4D',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
});