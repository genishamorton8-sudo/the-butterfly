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
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { db } from '../../lib/firebase';
import { statusEmoji, statusLabel } from '../../lib/betaStatus';

type BetaApplication = {
  id: string;
  uid: string | null;
  fullName: string;
  preferredName: string;
  email: string;
  dateOfBirth: string;
  isMinor: boolean;
  cityState: string;
  whyJoin: string;
  hope: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentSignature: string;
  signature: string;
  communityAgree: boolean;
  ndaAgree: boolean;
  privacyAgree: boolean;
  wellnessAgree: boolean;
  truthAgree: boolean;
  status: string;
  badgeRequested: string;
};

export default function FoundingButterfliesScreen() {
  const [applications, setApplications] = useState<BetaApplication[]>([]);
  const [selected, setSelected] = useState<BetaApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const applicationsRef = collection(db, 'betaApplications');
      const q = query(applicationsRef, orderBy('submittedAt', 'desc'));
      const snapshot = await getDocs(q);

      const applicationList = snapshot.docs.map((docSnap) => {
        return {
          id: docSnap.id,
          ...(docSnap.data() as Omit<BetaApplication, 'id'>),
        };
      });

      setApplications(applicationList);
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }

  function openApplication(application: BetaApplication) {
    setSelected(application);
    setAdminNotes('');
  }

  async function updateStatus(status: string) {
    if (!selected) return;

    try {
      setSaving(true);

      const applicationRef = doc(db, 'betaApplications', selected.id);

      await updateDoc(applicationRef, {
        status,
        adminNotes,
        reviewedAt: serverTimestamp(),
      });

      if (status === 'approved' && selected.uid) {
        const userRef = doc(db, 'users', selected.uid);

        await updateDoc(userRef, {
          betaStatus: 'approved',
          betaBadge: 'Founding Butterfly',
          betaApprovedAt: serverTimestamp(),
        });
      }

      Alert.alert('Updated', `Application marked as ${statusLabel(status)}.`);

      setSelected(null);
      setAdminNotes('');
      await loadApplications();
    } catch {
      Alert.alert('Could not update', 'Please try again.');
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
        <Text style={styles.icon}>🦋</Text>

        <Text style={styles.title}>Review Application</Text>

        <Text style={styles.subtitle}>
          Review this Founding Butterfly application before approving.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Applicant</Text>
          <Info label="Full Name" value={selected.fullName} />
          <Info label="Preferred Name" value={selected.preferredName || 'Not provided'} />
          <Info label="Email" value={selected.email} />
          <Info label="Date of Birth" value={selected.dateOfBirth} />
          <Info label="City / State" value={selected.cityState} />
          <Info label="Age Group" value={selected.isMinor ? 'Minor' : 'Adult'} />
          <Info
            label="Status"
            value={`${statusEmoji(selected.status)} ${statusLabel(selected.status)}`}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Their Heart</Text>
          <Info label="Why They Want to Join" value={selected.whyJoin} />
          <Info label="What Gives Them Hope" value={selected.hope || 'Not provided'} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Agreements</Text>
          <Info label="Community Promise" value={selected.communityAgree ? 'Accepted' : 'Missing'} />
          <Info label="NDA / Confidentiality" value={selected.ndaAgree ? 'Accepted' : 'Missing'} />
          <Info label="Privacy Promise" value={selected.privacyAgree ? 'Accepted' : 'Missing'} />
          <Info label="Wellness Notice" value={selected.wellnessAgree ? 'Accepted' : 'Missing'} />
          <Info label="Truth Certification" value={selected.truthAgree ? 'Accepted' : 'Missing'} />
          <Info label="Applicant Signature" value={selected.signature || 'Missing'} />
        </View>

        {selected.isMinor && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Parent / Guardian Consent</Text>
            <Info label="Parent Name" value={selected.parentName || 'Missing'} />
            <Info label="Parent Email" value={selected.parentEmail || 'Missing'} />
            <Info label="Parent Phone" value={selected.parentPhone || 'Missing'} />
            <Info label="Parent Signature" value={selected.parentSignature || 'Missing'} />
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Private Admin Notes</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add private notes here..."
            placeholderTextColor="#9B8AA8"
            value={adminNotes}
            onChangeText={setAdminNotes}
            multiline
          />
        </View>

        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => updateStatus('approved')}
          disabled={saving}
        >
          <Text style={styles.actionText}>
            {saving ? 'Saving...' : 'Approve Founding Butterfly'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => updateStatus('needs_more_info')}
          disabled={saving}
        >
          <Text style={styles.actionText}>Request More Information</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => updateStatus('rejected')}
          disabled={saving}
        >
          <Text style={styles.actionText}>Reject Application</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => setSelected(null)}>
          <Text style={styles.backButtonText}>Back to Applications</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🦋</Text>

      <Text style={styles.title}>Founding Butterflies</Text>

      <Text style={styles.subtitle}>
        Review beta applications and approve Founding Butterfly members.
      </Text>

      {applications.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No applications yet.</Text>
        </View>
      ) : (
        applications.map((application) => (
          <View key={application.id} style={styles.card}>
            <Text style={styles.applicantName}>
              {application.preferredName || application.fullName || 'Applicant'}
            </Text>

            <Text style={styles.applicantEmail}>{application.email}</Text>

            <Info label="Location" value={application.cityState || 'Not provided'} />
            <Info
              label="Status"
              value={`${statusEmoji(application.status)} ${statusLabel(application.status)}`}
            />
            <Info label="Age Group" value={application.isMinor ? 'Minor' : 'Adult'} />

            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => openApplication(application)}
            >
              <Text style={styles.reviewButtonText}>Review Application</Text>
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
  applicantName: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
  },
  applicantEmail: {
    color: '#3F2A4D',
    fontSize: 15,
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
  input: {
    backgroundColor: '#FFF9F3',
    borderWidth: 2,
    borderColor: '#F1D7A7',
    borderRadius: 18,
    padding: 14,
    color: '#3F2A4D',
    fontSize: 16,
    fontWeight: '700',
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
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
  approveButton: {
    width: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  infoButton: {
    width: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  rejectButton: {
    width: '100%',
    backgroundColor: '#A83232',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
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