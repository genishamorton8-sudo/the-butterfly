import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SafetyCheckProps = {
  selectedLevel: number | null;
  onSelectLevel: (level: number) => void;
  onContinue: () => void;
  onGrounding: () => void;
};

export default function SafetyCheck({
  selectedLevel,
  onSelectLevel,
  onContinue,
  onGrounding,
}: SafetyCheckProps) {
  const needsGrounding =
    selectedLevel !== null && selectedLevel <= 3;

  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Emotional Safety Check</Text>

      <Text style={styles.title}>
        Before we continue...
      </Text>

      <Text style={styles.text}>
        On a scale from 1 to 10, how emotionally grounded do you feel right now?
      </Text>

      <View style={styles.scale}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
          <TouchableOpacity
            key={number}
            style={[
              styles.circle,
              selectedLevel === number && styles.selectedCircle,
            ]}
            onPress={() => onSelectLevel(number)}
          >
            <Text
              style={[
                styles.circleText,
                selectedLevel === number && styles.selectedCircleText,
              ]}
            >
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedLevel !== null && (
        <>
          {needsGrounding ? (
            <View style={styles.notice}>
              <Text style={styles.noticeTitle}>
                Let's slow down for a moment.
              </Text>

              <Text style={styles.noticeText}>
                Thank you for being honest. It sounds like today might not be
                the best time to revisit a difficult memory. Let's help your
                mind and body feel a little safer first.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={onGrounding}
              >
                <Text style={styles.primaryButtonText}>
                  Start Grounding Exercise
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.notice}>
              <Text style={styles.noticeTitle}>
                Thank you.
              </Text>

              <Text style={styles.noticeText}>
                You don't have to be perfect to continue. We'll take this one
                step at a time, and you can pause whenever you need to.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={onContinue}
              >
                <Text style={styles.primaryButtonText}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
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
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 12,
  },
  text: {
    color: '#3F2A4D',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  scale: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFE7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: '#E75480',
  },
  circleText: {
    color: '#4B1D7A',
    fontWeight: '900',
  },
  selectedCircleText: {
    color: '#FFFFFF',
  },
  notice: {
    backgroundColor: '#FFF8F2',
    borderRadius: 18,
    padding: 18,
  },
  noticeTitle: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
  },
  noticeText: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#E75480',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
});