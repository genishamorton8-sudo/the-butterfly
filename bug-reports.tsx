import { router } from 'expo-router';
import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
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

type BugReport = {
  id: string;
  uid: string | null;
  email: string;
  title: string;
  whatHappened: string;
  whereInApp: string;
  steps: string;
  device: string;
  status: string;
};

function statusLabel(status: string) {
  if (status === 'in_progress') return 'In Progress';
  if (status === 'fixed') return 'Fixed';
  if (status === 'closed') return 'Closed';
  return 'New';
}

function statusEmoji(status: string) {
  if (status === 'in_progress') return '🟡';
  if (status === 'fixed') return '🟢';
  if (status === 'closed') return '⚫';
  return '🔴';
}

export default function AdminBugReportsScreen() {
  const [reports, setReports] = useState<BugReport[]>([]);
  const [selected, setSelected] = useState<BugReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const reportsRef = collection(db, 'bugReports');
      const q = query(reportsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const reportList = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<BugReport, 'id'>),
      }));

      setReports(reportList);
    } catch {
      Alert.alert('Could not load reports', 'Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(status: string) {
    if (!selected) return;

    try {
      setSaving(true);

      await updateDoc(doc(db, 'bugReports', selected.id), {
        status,
        updatedAt: serverTimestamp(),
      });

      Alert.alert('Updated', `Bug report marked as ${statusLabel(status)}.`);

      setSelected(null);
      await loadReports();
    } catch {
      Alert.alert('Could not update report', 'Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#E75480" />
      </View>
    );
  }

  if (selected) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Text style={styles.icon}>🐞</Text>

        <Text style={styles.title}>Bug Report</Text>

        <Text style={styles.subtitle}>Review what the tester reported.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selected.title || 'Untitled Bug'}</Text>

          <Info label="Status" value={`${statusEmoji(selected.status)} ${statusLabel(selected.status)}`} />
          <Info label="Reported By" value={selected.email || 'Unknown'} />
          <Info label="Where It Happened" value={selected.whereInApp || 'Not provided'} />
          <Info label="What Happened" value={selected.whatHappened || 'Not provided'} />
          <Info label="Steps to Repeat" value={selected.steps || 'Not provided'} />
          <Info label="Device / Browser" value={selected.device || 'Not provided'} />
        </View>

        <TouchableOpacity
          style={styles.progressButton}
          onPress={() => updateStatus('in_progress')}
          disabled={saving}
        >
          <Text style={styles.actionText}>Mark In Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => updateStatus('fixed')}
          disabled={saving}
        >
          <Text style={styles.actionText}>Mark Fixed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closedButton}
          onPress={() => updateStatus('closed')}
          disabled={saving}
        >
          <Text style={styles.actionText}>Close Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => setSelected(null)}>
          <Text style={styles.backButtonText}>Back to Bug Reports</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🐞</Text>

      <Text style={styles.title}>Bug Reports</Text>

      <Text style={styles.subtitle}>
        Review issues submitted by beta testers.
      </Text>

      {reports.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No bug reports yet.</Text>
        </View>
      ) : (
        reports.map((report) => (
          <View key={report.id} style={styles.card}>
            <Text style={styles.reportTitle}>{report.title || 'Untitled Bug'}</Text>
            <Text style={styles.reportMeta}>{report.email || 'Unknown user'}</Text>

            <Info label="Location" value={report.whereInApp || 'Not provided'} />
            <Info label="Status" value={`${statusEmoji(report.status)} ${statusLabel(report.status)}`} />

            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => setSelected(report)}
            >
              <Text style={styles.reviewButtonText}>Review Bug</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/admin' as any)}
      >
        <Text style={styles.backButtonText}>Back to Butterfly Care</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoBlock}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
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
    marginBottom: 14,
  },
  reportTitle: {
    color: '#4B1D7A',
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
  },
  reportMeta: {
    color: '#3F2A4D',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 14,
  },
  infoBlock: {
    backgroundColor: '#FFF9F3',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1D7A7',
    marginBottom: 10,
  },
  infoLabel: {
    color: '#4B1D7A',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 4,
  },
  infoValue: {
    color: '#3F2A4D',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  emptyText: {
    color: '#3F2A4D',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  reviewButton: {
    backgroundColor: '#4B1D7A',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  progressButton: {
    width: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  fixedButton: {
    width: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  closedButton: {
    width: '100%',
    backgroundColor: '#555555',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  actionText: {
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
    marginTop: 4,
  },
  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});