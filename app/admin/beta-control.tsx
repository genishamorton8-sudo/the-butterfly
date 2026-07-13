import { router } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { db } from '../../lib/firebase';
import {
    BetaWindowStatus,
    getBetaWindow,
    getBetaWindowStatus,
    startBetaWindow,
} from '../../lib/betaWindow';

type BetaStats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  needsMoreInfo: number;
  awaitingParent: number;
};

export default function BetaControlCenter() {
  const [stats, setStats] = useState<BetaStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    needsMoreInfo: 0,
    awaitingParent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [windowStatus, setWindowStatus] = useState<BetaWindowStatus | null>(null);
  const [startingWindow, setStartingWindow] = useState(false);

  useEffect(() => {
    loadStats();
    loadWindow();
  }, []);

  async function loadWindow() {
    const window = await getBetaWindow();
    setWindowStatus(getBetaWindowStatus(window.startedAt));
  }

  async function handleStartWindow() {
    try {
      setStartingWindow(true);
      await startBetaWindow();
      await loadWindow();
    } catch {
      Alert.alert('Could not start beta window', 'Please try again.');
    } finally {
      setStartingWindow(false);
    }
  }

  async function loadStats() {
    try {
      const snapshot = await getDocs(collection(db, 'betaApplications'));

      let pending = 0;
      let approved = 0;
      let rejected = 0;
      let needsMoreInfo = 0;
      let awaitingParent = 0;

      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        const status = data.status || 'pending_review';

        if (status === 'approved') approved += 1;
        else if (status === 'rejected') rejected += 1;
        else if (status === 'needs_more_info') needsMoreInfo += 1;
        else if (status === 'awaiting_parent_review') awaitingParent += 1;
        else pending += 1;
      });

      setStats({
        total: snapshot.size,
        pending,
        approved,
        rejected,
        needsMoreInfo,
        awaitingParent,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#E75480" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🦋</Text>

      <Text style={styles.title}>Beta Control Center</Text>

      <Text style={styles.subtitle}>
        Monitor Founding Butterfly applications and beta readiness.
      </Text>

      <View style={styles.grid}>
        <StatCard label="Applications" value={stats.total} emoji="🦋" />
        <StatCard label="Pending" value={stats.pending} emoji="🟡" />
        <StatCard label="Approved" value={stats.approved} emoji="🟢" />
        <StatCard label="Parent Review" value={stats.awaitingParent} emoji="🟠" />
        <StatCard label="Needs Info" value={stats.needsMoreInfo} emoji="📩" />
        <StatCard label="Rejected" value={stats.rejected} emoji="🔴" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>90-Day Beta Window</Text>

        {!windowStatus?.started ? (
          <>
            <Text style={styles.bodyText}>
              The beta window has not started yet. Applications stay open
              until you start the 90-day clock.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStartWindow}
              disabled={startingWindow}
            >
              <Text style={styles.primaryButtonText}>
                {startingWindow ? 'Starting...' : 'Start 90-Day Beta Window'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.bodyText}>
            Day {Math.min(windowStatus.daysElapsed, 90)} of 90.{' '}
            {windowStatus.isOpenForApplications
              ? `${windowStatus.daysRemaining} days left to accept new applications.`
              : 'Closed to new applicants. Approved members and admins keep full access.'}
            {'\n'}Ends {windowStatus.endsAt?.toLocaleDateString()}.
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Beta Readiness</Text>

        <Text style={styles.bodyText}>
          This center gives you a quick picture of your private beta program.
          As testers apply, their status will update here.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/admin/founding-butterflies' as any)}
        >
          <Text style={styles.primaryButtonText}>Review Applications</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Coming Next</Text>

        <Text style={styles.bodyText}>🐞 Bug Report Center</Text>
        <Text style={styles.bodyText}>💡 Feedback and Feature Requests</Text>
        <Text style={styles.bodyText}>🏅 Founding Butterfly Certificates</Text>
        <Text style={styles.bodyText}>📧 Welcome Email Workflow</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/admin' as any)}
      >
        <Text style={styles.backButtonText}>Back to Butterfly Care</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function StatCard({
  label,
  value,
  emoji,
}: {
  label: string;
  value: number;
  emoji: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 130,
    alignItems: 'center',
  },
  icon: {
    fontSize: 58,
    marginBottom: 10,
  },
  title: {
    color: '#4B1D7A',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E75480',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 22,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 2,
    borderColor: '#D4AF37',
    alignItems: 'center',
    marginBottom: 12,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  statValue: {
    color: '#4B1D7A',
    fontSize: 30,
    fontWeight: '900',
  },
  statLabel: {
    color: '#3F2A4D',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
  },
  cardTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  bodyText: {
    color: '#3F2A4D',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#4B1D7A',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  backButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4B1D7A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});