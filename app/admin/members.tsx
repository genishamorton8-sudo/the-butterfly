import { router } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Member = {
  id: string;
  name: string;
  email: string;
  status: string;
  partner: string;
};

const sampleMembers: Member[] = [
  {
    id: '1',
    name: 'Genisha Morton',
    email: 'bleuolive19@gmail.com',
    status: 'Admin',
    partner: 'Not Assigned',
  },
];

export default function MembersScreen() {
  const [search, setSearch] = useState('');

  const filteredMembers = sampleMembers.filter((member) => {
    const text = `${member.name} ${member.email}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>👥</Text>

      <Text style={styles.title}>Members</Text>

      <Text style={styles.subtitle}>
        View and manage Sankofa members connected to The Butterfly.
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search members..."
        placeholderTextColor="#9B8AA8"
        value={search}
        onChangeText={setSearch}
      />

      {filteredMembers.map((member) => (
        <View key={member.id} style={styles.memberCard}>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberEmail}>{member.email}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>{member.status}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Partner:</Text>
            <Text style={styles.infoValue}>{member.partner}</Text>
          </View>

          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/admin' as any)}
      >
        <Text style={styles.backButtonText}>Back to Admin</Text>
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