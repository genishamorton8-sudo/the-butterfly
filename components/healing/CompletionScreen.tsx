import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CompletionScreenProps = {
  primaryEmotion: string;
  primaryNeed: string;
  supportPerson: string;
  reflection: string;
  onPray: () => void;
  onJournal: () => void;
  onSave: () => void;
  onHome: () => void;
};

export default function CompletionScreen({
  primaryEmotion,
  primaryNeed,
  supportPerson,
  reflection,
  onPray,
  onJournal,
  onSave,
  onHome,
}: CompletionScreenProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Guided Healing Complete</Text>

      <Text style={styles.title}>Today You Chose Courage</Text>

      <Text style={styles.intro}>
        Thank you for trusting Butterfly with part of your story. Healing is a
        journey, and today you took an important step forward.
      </Text>

      <View style={styles.summary}>
        <SummaryRow label="Primary Emotion" value={primaryEmotion} />
        <SummaryRow label="Primary Need" value={primaryNeed} />
        <SummaryRow label="Support Person" value={supportPerson} />
      </View>

      <View style={styles.reflectionCard}>
        <Text style={styles.reflectionTitle}>Butterfly Reflection</Text>
        <Text style={styles.reflectionText}>{reflection}</Text>
      </View>

      <Text style={styles.quote}>
        Healing is not measured by perfection.
        {'\n'}
        It is measured by your willingness to keep showing up.
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onSave}>
        <Text style={styles.primaryButtonText}>
          Save to Healing Journey
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onPray}>
        <Text style={styles.secondaryButtonText}>
          Pray About This
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onJournal}>
        <Text style={styles.secondaryButtonText}>
          Journal More
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton} onPress={onHome}>
        <Text style={styles.homeButtonText}>
          Return Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value || '—'}</Text>
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
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 16,
  },
  intro: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  summary: {
    backgroundColor: '#FFF8F2',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  row: {
    marginBottom: 12,
  },
  rowLabel: {
    color: '#8B7A90',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  rowValue: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '700',
  },
  reflectionCard: {
    backgroundColor: '#EFE7F7',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  reflectionTitle: {
    color: '#4B1D7A',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  reflectionText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
  },
  quote: {
    color: '#4B1D7A',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#E75480',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    backgroundColor: '#EFE7F7',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
  homeButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#8B7A90',
    fontSize: 16,
    fontWeight: '700',
  },
});