import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type RewriteResponses = {
  memory: string;
  age: string;
  emotions: string;
  need: string;
  protection: string;
  rewrittenEnding: string;
};

export default function RewriteTheSceneScreen() {
  const [step, setStep] = useState(1);

  const [responses, setResponses] = useState<RewriteResponses>({
    memory: '',
    age: '',
    emotions: '',
    need: '',
    protection: '',
    rewrittenEnding: '',
  });

  const totalSteps = 6;

  function getStepKey(): keyof RewriteResponses {
    switch (step) {
      case 1:
        return 'memory';
      case 2:
        return 'age';
      case 3:
        return 'emotions';
      case 4:
        return 'need';
      case 5:
        return 'protection';
      case 6:
        return 'rewrittenEnding';
      default:
        return 'memory';
    }
  }

  function updateResponse(text: string) {
    const key = getStepKey();

    setResponses((current) => ({
      ...current,
      [key]: text,
    }));
  }

  function nextStep() {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function getQuestion() {
    switch (step) {
      case 1:
        return 'Think of a memory that still hurts. What happened?';
      case 2:
        return 'How old were you when this happened?';
      case 3:
        return 'What emotions did you feel in that moment?';
      case 4:
        return 'What did you need but never received?';
      case 5:
        return 'If someone had protected you, what would they have done?';
      case 6:
        return 'When you are ready, imagine the scene ending with safety, truth, and hope. Describe it.';
      default:
        return '';
    }
  }

  function getGuidance() {
    switch (step) {
      case 1:
        return 'Go slowly. You do not have to tell every detail. Just name enough so your heart knows what memory you are working with.';
      case 2:
        return 'This helps Butterfly understand the younger part of you that needed care, safety, and protection.';
      case 3:
        return 'There is no wrong answer here. Fear, anger, sadness, confusion, shame, or numbness all count.';
      case 4:
        return 'Think about what your heart needed most: comfort, protection, truth, an apology, a safe adult, or someone to believe you.';
      case 5:
        return 'This is where the memory begins to change. Imagine someone stepping in with strength, love, and wisdom.';
      case 6:
        return 'Let this ending become safe and truthful. You are not changing the facts. You are giving your heart the care it should have received.';
      default:
        return '';
    }
  }

  function getCurrentAnswer() {
    return responses[getStepKey()];
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>Healing Studio</Text>

        <Text style={styles.title}>Rewrite the Scene</Text>

        <Text style={styles.subtitle}>
          This exercise gently helps you revisit a difficult memory and imagine
          it ending with safety, truth, and hope.
        </Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(step / totalSteps) * 100}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.stepText}>
          Step {step} of {totalSteps}
        </Text>

        <View style={styles.guidanceCard}>
          <Text style={styles.guidanceTitle}>Butterfly Guidance</Text>
          <Text style={styles.guidanceText}>{getGuidance()}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.question}>{getQuestion()}</Text>

          <TextInput
            multiline
            value={getCurrentAnswer()}
            onChangeText={updateResponse}
            placeholder="Take your time..."
            placeholderTextColor="#8B7A90"
            style={styles.input}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.secondaryButton,
              step === 1 && styles.disabledButton,
            ]}
            disabled={step === 1}
            onPress={previousStep}
          >
            <Text style={styles.secondaryText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
            <Text style={styles.primaryText}>
              {step === totalSteps ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>

        {step === totalSteps && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Your Healing Notes</Text>

            <SummaryItem label="What happened" value={responses.memory} />
            <SummaryItem label="Age" value={responses.age} />
            <SummaryItem label="Emotions" value={responses.emotions} />
            <SummaryItem label="What you needed" value={responses.need} />
            <SummaryItem label="Protection" value={responses.protection} />
            <SummaryItem
              label="Rewritten ending"
              value={responses.rewrittenEnding}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
};

function SummaryItem({ label, value }: SummaryItemProps) {
  if (!value.trim()) return null;

  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  content: {
    padding: 24,
    paddingBottom: 50,
  },
  kicker: {
    color: '#D4AF37',
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: '#5A4A63',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  progressBackground: {
    height: 10,
    backgroundColor: '#E9E2EC',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E75480',
    borderRadius: 20,
  },
  stepText: {
    color: '#8B7A90',
    fontSize: 14,
    marginBottom: 20,
  },
  guidanceCard: {
    backgroundColor: '#EFE7F7',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },
  guidanceTitle: {
    color: '#4B1D7A',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 8,
  },
  guidanceText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  question: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 18,
    lineHeight: 30,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#E9E2EC',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#E75480',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#4B1D7A',
    fontWeight: '800',
    fontSize: 16,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.4,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 24,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  summaryTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },
  summaryItem: {
    marginBottom: 14,
  },
  summaryLabel: {
    color: '#8B7A90',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  summaryText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 22,
  },
});