import { router, useLocalSearchParams } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function MemberProfileScreen() {
  const params = useLocalSearchParams();

  const name = String(params.name || 'Butterfly Member');
  const email = String(params.email || 'No email available');
  const role = String(params.role || 'member');
  const partner = String(params.partner || 'Not Assigned');
  const code = String(params.code || 'No Code');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>👤</Text>

      <Text style={styles.title}>{name}</Text>

      <Text style={styles.subtitle}>Member Profile</Text>

      <View style={styles.card}>
        <InfoRow label="Email" value={email} />
        <InfoRow label="Role" value={role} />
        <InfoRow label="Partner" value={partner} />
        <InfoRow label="Partner Code" value={code} />
        <InfoRow label="Garden Stage" value="🌱 Growing" />
        <InfoRow label="Healing Streak" value="Coming Soon" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Admin Actions</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🤝 Assign Partner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🌱 View Garden Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🙏 View Prayer Activity</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/admin/members' as any)}
      >
        <Text style={styles.backButtonText}>Back to Members</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
    fontSize: 30,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#E75480',
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 24,
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
    fontSize: 22,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
    marginBottom: 18,
  },
  infoRow: {
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 15,
    color: '#4B1D7A',
    fontWeight: '900',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#3F2A4D',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#4B1D7A',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
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