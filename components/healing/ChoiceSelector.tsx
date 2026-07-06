import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ChoiceSelectorProps = {
  title: string;
  guidance: string;
  options: string[];
  selected: string[];
  multiple?: boolean;
  onToggle: (value: string) => void;
};

export default function ChoiceSelector({
  title,
  guidance,
  options,
  selected,
  multiple = true,
  onToggle,
}: ChoiceSelectorProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Butterfly Guidance</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.guidance}>{guidance}</Text>

      <View style={styles.chipContainer}>
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <TouchableOpacity
              key={option}
              onPress={() => onToggle(option)}
              style={[styles.chip, active && styles.activeChip]}
            >
              <Text style={[styles.chipText, active && styles.activeChipText]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.footer}>
        {multiple ? 'Choose as many as feel true.' : 'Choose the one that feels most true.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24 },
  kicker: { color: '#D4AF37', fontWeight: '900', fontSize: 13, marginBottom: 8 },
  title: { color: '#4B1D7A', fontSize: 26, fontWeight: '900', marginBottom: 10 },
  guidance: { color: '#3F2A4D', fontSize: 16, lineHeight: 24, marginBottom: 22 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { backgroundColor: '#FFF8F2', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 16, borderWidth: 1, borderColor: '#E9E2EC' },
  activeChip: { backgroundColor: '#E75480', borderColor: '#E75480' },
  chipText: { color: '#4B1D7A', fontWeight: '800', fontSize: 15 },
  activeChipText: { color: '#FFFFFF' },
  footer: { marginTop: 20, color: '#8B7A90', fontSize: 14, fontStyle: 'italic' },
});
