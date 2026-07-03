import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ChatHeader() {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(tabs)/dashboard' as any)}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
          color="#4B1D7A"
        />
      </TouchableOpacity>

      <View style={styles.center}>
        <MaterialCommunityIcons
          name="butterfly"
          size={42}
          color="#E75480"
        />

        <Text style={styles.title}>Butterfly</Text>

        <Text style={styles.subtitle}>
          Your gentle healing companion
        </Text>
      </View>

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
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

  center: {
    flex: 1,
    alignItems: 'center',
  },

  spacer: {
    width: 42,
  },

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
});