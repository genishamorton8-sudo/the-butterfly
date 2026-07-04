import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type JourneyInsightCardProps = {
  insight: string;
  strongestTheme: string;
};

export default function JourneyInsightCard({
  insight,
  strongestTheme,
}: JourneyInsightCardProps) {
  if (!insight) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="chart-line"
          size={30}
          color="#4B1D7A"
        />

        <View style={styles.headerText}>
          <Text style={styles.label}>
            Healing Journey
          </Text>

          <Text style={styles.title}>
            Growth Insight
          </Text>
        </View>
      </View>

      <View style={styles.themeBadge}>
        <Text style={styles.themeText}>
          Current Theme: {strongestTheme}
        </Text>
      </View>

      <Text style={styles.insight}>
        {insight}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F4F7FF',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#4B1D7A',
    padding: 16,
    marginBottom: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  headerText: {
    marginLeft: 12,
    flex: 1,
  },

  label: {
    color: '#6A5ACD',
    fontSize: 12,
    fontWeight: '900',
  },

  title: {
    color: '#4B1D7A',
    fontSize: 20,
    fontWeight: '900',
  },

  themeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9E4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },

  themeText: {
    color: '#4B1D7A',
    fontWeight: '800',
    fontSize: 13,
  },

  insight: {
    color: '#3F2A4D',
    fontSize: 15,
    lineHeight: 23,
  },
});
