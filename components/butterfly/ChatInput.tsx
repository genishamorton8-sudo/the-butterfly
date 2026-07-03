import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type ChatInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
};

export default function ChatInput({
  value,
  onChangeText,
  onSend,
}: ChatInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tell Butterfly what is on your heart..."
        value={value}
        onChangeText={onChangeText}
        multiline
      />

      <TouchableOpacity
        style={styles.sendButton}
        onPress={onSend}
      >
        <MaterialCommunityIcons
          name="send"
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 14,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2,
    borderTopColor: '#F1D7A7',
  },

  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 110,
    backgroundColor: '#FFF9F3',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 10,
    fontSize: 15,
  },

  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E75480',
    alignItems: 'center',
    justifyContent: 'center',
  },
});