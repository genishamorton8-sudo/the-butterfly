import { StyleSheet, Text, TextInput, View } from 'react-native';

type GuidedQuestionProps = {
  title: string;
  guidance: string;
  affirmation?: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
};

export default function GuidedQuestion({
  title,
  guidance,
  affirmation,
  value,
  placeholder,
  onChangeText,
}: GuidedQuestionProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Butterfly Guidance</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.guidance}>{guidance}</Text>

      {affirmation ? (
        <View style={styles.affirmationBox}>
          <Text style={styles.affirmationText}>{affirmation}</Text>
        </View>
      ) : null}

      <TextInput
        multiline
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8B7A90"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
  },
  kicker: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 12,
    lineHeight: 34,
  },
  guidance: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  affirmationBox: {
    backgroundColor: '#EFE7F7',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },
  affirmationText: {
    color: '#4B1D7A',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#FFF8F2',
    minHeight: 180,
    borderRadius: 18,
    padding: 16,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#3F2A4D',
  },
});