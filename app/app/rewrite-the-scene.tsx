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
  emotions: string[];
  needs: string[];
  supportPerson: string;
  rewrittenEnding: string;
};

const emotions = ['Fear', 'Shame', 'Anger', 'Sadness', 'Confusion', 'Rejected', 'Alone'];
const needs = ['Safety', 'Protection', 'Comfort', 'To be believed', 'Love', 'Justice', 'To be rescued'];
const supportOptions = ['Jesus', 'My current self', 'A trusted adult', 'Someone safe'];

export default function RewriteTheSceneScreen() {
  const [step, setStep] = useState(0);

  const [responses, setResponses] = useState<RewriteResponses>({
    memory: '',
    age: '',
    emotions: [],
    needs: [],
    supportPerson: '',
    rewrittenEnding: '',
  });

  const totalSteps = 6;

  function toggleList(key: 'emotions' | 'needs', value: string) {
    setResponses((current) => {
      const list = current[key];

      return {
        ...current,
        [key]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      };
    });
  }

  function nextStep() {
    if (step < totalSteps) setStep(step + 1);
  }

  function previousStep() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>Healing Studio</Text>
        <Text style={styles.title}>Rewrite the Scene</Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${((step + 1) / (totalSteps + 1)) * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.stepText}>
          Step {step + 1} of {totalSteps + 1}
        </Text>

        {step === 0 && (
          <HealingCard
            title="Before we begin"
            text="You are in control of this experience. You can pause, skip, or come back later. Healing does not happen by force. It happens safely."
          />
        )}

        {step === 1 && (
          <QuestionCard
            title="Choose one memory"
            guidance="Do not choose the biggest wound first. Choose something your heart feels ready to revisit."
            value={responses.memory}
            onChangeText={(text) =>
              setResponses((current) => ({ ...current, memory: text }))
            }
            placeholder="What memory came to mind?"
          />
        )}

        {step === 2 && (
          <QuestionCard
            title="About how old were you?"
            guidance="You do not have to be exact. Even an estimate is enough."
            value={responses.age}
            onChangeText={(text) =>
              setResponses((current) => ({ ...current, age: text }))
            }
            placeholder="I was about..."
          />
        )}

        {step === 3 && (
          <ChoiceCard
            title="What emotions were present?"
            guidance="Choose anything that fits. Nothing is wrong with you for feeling it."
            options={emotions}
            selected={responses.emotions}
            onPress={(value) => toggleList('emotions', value)}
          />
        )}

        {step === 4 && (
          <ChoiceCard
            title="What did you need?"
            guidance="Think about what your younger self needed most in that moment."
            options={needs}
            selected={responses.needs}
            onPress={(value) => toggleList('needs', value)}
          />
        )}

        {step === 5 && (
          <SingleChoiceCard
            title="Who would you want beside you?"
            guidance="Imagine that younger version of you is no longer alone."
            options={supportOptions}
            selected={responses.supportPerson}
            onPress={(value) =>
              setResponses((current) => ({
                ...current,
                supportPerson: value,
              }))
            }
          />
        )}

        {step === 6 && (
          <>
            <QuestionCard
              title="Rewrite the ending"
              guidance="You are not pretending it never happened. You are giving your heart what it deserved: safety, truth, and care."
              value={responses.rewrittenEnding}
              onChangeText={(text) =>
                setResponses((current) => ({
                  ...current,
                  rewrittenEnding: text,
                }))
              }
              placeholder="Describe what happens now..."
            />

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Healing Summary</Text>
              <SummaryItem label="Memory" value={responses.memory} />
              <SummaryItem label="Age" value={responses.age} />
              <SummaryItem label="Emotions" value={responses.emotions.join(', ')} />
              <SummaryItem label="Needs" value={responses.needs.join(', ')} />
              <SummaryItem label="Support" value={responses.supportPerson} />
              <SummaryItem label="New ending" value={responses.rewrittenEnding} />
            </View>
          </>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.secondaryButton, step === 0 && styles.disabledButton]}
            disabled={step === 0}
            onPress={previousStep}
          >
            <Text style={styles.secondaryText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
            <Text style={styles.primaryText}>
              {step === totalSteps ? 'Complete' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HealingCard({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{title}</Text>
      <Text style={styles.guidanceText}>{text}</Text>
    </View>
  );
}

function QuestionCard({
  title,
  guidance,
  value,
  onChangeText,
  placeholder,
}: {
  title: string;
  guidance: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{title}</Text>
      <Text style={styles.guidanceText}>{guidance}</Text>
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

function ChoiceCard({
  title,
  guidance,
  options,
  selected,
  onPress,
}: {
  title: string;
  guidance: string;
  options: string[];
  selected: string[];
  onPress: (value: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{title}</Text>
      <Text style={styles.guidanceText}>{guidance}</Text>

      <View style={styles.chipWrap}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.chip,
              selected.includes(option) && styles.selectedChip,
            ]}
            onPress={() => onPress(option)}
          >
            <Text
              style={[
                styles.chipText,
                selected.includes(option) && styles.selectedChipText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function SingleChoiceCard({
  title,
  guidance,
  options,
  selected,
  onPress,
}: {
  title: string;
  guidance: string;
  options: string[];
  selected: string;
  onPress: (value: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{title}</Text>
      <Text style={styles.guidanceText}>{guidance}</Text>

      <View style={styles.chipWrap}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.chip,
              selected === option && styles.selectedChip,
            ]}
            onPress={() => onPress(option)}
          >
            <Text
              style={[
                styles.chipText,
                selected === option && styles.selectedChipText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
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
    marginBottom: 18,
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
  },
  stepText: {
    color: '#8B7A90',
    fontSize: 14,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  question: {
    color: '#4B1D7A',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
    lineHeight: 32,
  },
  guidanceText: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18,
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
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#FFF8F2',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E9E2EC',
  },
  selectedChip: {
    backgroundColor: '#E75480',
    borderColor: '#E75480',
  },
  chipText: {
    color: '#4B1D7A',
    fontWeight: '800',
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
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
    marginBottom: 24,
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