import { router } from 'expo-router';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { db } from '../../lib/firebase';
import { PartnerProfile } from '../../lib/partners';

export default function MembersScreen() {
  const [members, setMembers] = useState<PartnerProfile[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

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

      setMembers(userList);
    } catch {
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredMembers = members.filter((member) => {
    const text =
      `${member.displayName} ${member.email}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.icon}>👥</Text>

      <Text style={styles.title}>Members</Text>

      <Text style={styles.subtitle}>
        View real Butterfly members registered in Firebase.
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search members..."
        placeholderTextColor="#9B8AA8"
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#E75480"
        />
      ) : filteredMembers.length === 0 ? (
        <View style={styles.memberCard}>
          <Text style={styles.emptyText}>
            No members found yet.
          </Text>
        </View>
      ) : (
        filteredMembers.map((member) => (
          <View
            key={member.uid}
            style={styles.memberCard}
          >
            <Text style={styles.memberName}>
              {member.displayName || 'Butterfly Member'}
            </Text>

            <Text style={styles.memberEmail}>
              {member.email}
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Role:
              </Text>

              <Text style={styles.infoValue}>
                {member.role}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Partner:
              </Text>

              <Text style={styles.infoValue}>
                {member.partnerUid
                  ? 'Assigned'
                  : 'Not Assigned'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() =>
                router.push({
                  pathname: '/admin/member',
                  params: {
                    uid: member.uid,
                  },
                } as any)
              }
            >
              <Text style={styles.smallButtonText}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          router.replace('/admin' as any)
        }
      >
        <Text style={styles.backButtonText}>
          Back to Admin
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 34,
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

  searchInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F1D7A7',
    borderRadius: 24,
    padding: 16,
    fontSize: 16,
    color: '#3F2A4D',
    marginBottom: 20,
  },

  memberCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginBottom: 16,
  },

  memberName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 6,
  },

  memberEmail: {
    fontSize: 15,
    color: '#3F2A4D',
    textAlign: 'center',
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 16,
    color: '#4B1D7A',
    fontWeight: '900',
  },

  infoValue: {
    fontSize: 16,
    color: '#3F2A4D',
    fontWeight: '700',
  },

  emptyText: {
    color: '#3F2A4D',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },

  smallButton: {
    backgroundColor: '#4B1D7A',
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 10,
  },

  smallButtonText: {
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
    marginTop: 10,
  },

  backButtonText: {
    color: '#4B1D7A',
    fontSize: 16,
    fontWeight: '900',
  },
});