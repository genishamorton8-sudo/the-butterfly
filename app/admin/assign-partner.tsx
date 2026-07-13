import { router, useLocalSearchParams } from 'expo-router';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
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
import { PartnerProfile } from '../../lib/partners';

export default function AssignPartnerScreen() {
  const params = useLocalSearchParams();
  const memberUid = String(params.uid || '');

  const [members, setMembers] = useState<PartnerProfile[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<PartnerProfile | null>(
    null
  );
  const [currentMember, setCurrentMember] = useState<PartnerProfile | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('email'));
      const snapshot = await getDocs(q);

      const userList = snapshot.docs.map((docSnap) => {
        return docSnap.data() as PartnerProfile;
      });

      const selectedMember =
        userList.find((member) => member.uid === memberUid) || null;

      setCurrentMember(selectedMember);
      setMembers(userList.filter((member) => member.uid !== memberUid));
    } catch {
      setMembers([]);
      setCurrentMember(null);
    } finally {
      setLoading(false);
    }
  }

  async function savePartner() {
    if (!currentMember || !selectedPartner) {
      Alert.alert('Choose a partner', 'Please select a partner first.');
      return;
    }

    try {
      setSaving(true);

      const currentMemberRef = doc(db, 'users', currentMember.uid);
      const selectedPartnerRef = doc(db, 'users', selectedPartner.uid);

      await updateDoc(currentMemberRef, {
        partnerUid: selectedPartner.uid,
      });

      await updateDoc(selectedPartnerRef, {
        partnerUid: currentMember.uid,
      });

      Alert.alert(
        'Partner Assigned',
        `${currentMember.displayName || 'This member'} and ${
          selectedPartner.displayName || 'their partner'
        } are now accountability partners.`
      );

      router.replace({
        pathname: '/admin/member',
        params: { uid: currentMember.uid },
      } as any);
    } catch {
      Alert.alert('Could not assign partner', 'Please try again.');
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

  if (!currentMember) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Text style={styles.icon}>🤝</Text>
        <Text style={styles.title}>Member Not Found</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/admin/members' as any)}
        >
          <Text style={styles.backButtonText}>Back to Members</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🤝</Text>

      <Text style={styles.title}>Assign Partner</Text>

      <Text style={styles.subtitle}>
        Choose an accountability partner for{' '}
        {currentMember.displayName || 'this member'}.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Member</Text>
        <Text style={styles.memberName}>
          {currentMember.displayName || 'Butterfly Member'}
        </Text>
        <Text style={styles.memberEmail}>{currentMember.email}</Text>
      </View>

      <Text style={styles.sectionTitle}>Choose Partner</Text>

      {members.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No other members found yet.</Text>
        </View>
      ) : (
        members.map((member) => {
          const isSelected = selectedPartner?.uid === member.uid;

          return (
            <TouchableOpacity
              key={member.uid}
              style={[
                styles.partnerCard,
                isSelected && styles.partnerCardSelected,
              ]}
              onPress={() => setSelectedPartner(member)}
            >
              <Text style={styles.memberName}>
                {member.displayName || 'Butterfly Member'}
              </Text>

              <Text style={styles.memberEmail}>{member.email}</Text>

              <Text style={styles.partnerStatus}>
                {member.partnerUid ? 'Already Assigned' : 'Available'}
              </Text>

              {isSelected && (
                <Text style={styles.selectedText}>Selected</Text>
              )}
            </TouchableOpacity>
          );
        })
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={savePartner}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Partner'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          router.replace({
            pathname: '/admin/member',
            params: { uid: currentMember.uid },
          } as any)
        }
      >
        <Text style={styles.backButtonText}>Back to Profile</Text>
      </TouchableOpacity>
    </ScrollView>
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
    paddingBottom: 120,
    alignItems: 'center',
  },
  icon: {
    fontSize: 56,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#E75480',
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 22,
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionTitle: {
    width: '100%',
    fontSize: 22,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 14,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 10,
  },
  partnerCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    marginBottom: 14,
  },
  partnerCardSelected: {
    borderColor: '#E75480',
    backgroundColor: '#FFF0F5',
  },
  memberName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 6,
  },
  memberEmail: {
    fontSize: 15,
    color: '#3F2A4D',
    textAlign: 'center',
  },
  partnerStatus: {
    fontSize: 14,
    color: '#E75480',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
  },
  selectedText: {
    fontSize: 14,
    color: '#4B1D7A',
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 8,
  },
  emptyText: {
    color: '#3F2A4D',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#E75480',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
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