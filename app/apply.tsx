import { router } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { auth, db } from '../lib/firebase';
import { getBetaWindow, getBetaWindowStatus } from '../lib/betaWindow';

export default function FoundingButterflyApplication() {
  const [fullName, setFullName] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [email, setEmail] = useState(auth.currentUser?.email || '');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isMinor, setIsMinor] = useState(false);
  const [cityState, setCityState] = useState('');
  const [whyJoin, setWhyJoin] = useState('');
  const [hope, setHope] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentSignature, setParentSignature] = useState('');
  const [signature, setSignature] = useState('');
  const [saving, setSaving] = useState(false);

  const [communityAgree, setCommunityAgree] = useState(false);
  const [ndaAgree, setNdaAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [wellnessAgree, setWellnessAgree] = useState(false);
  const [truthAgree, setTruthAgree] = useState(false);

  const [applicationsOpen, setApplicationsOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    getBetaWindow()
      .then((window) => setApplicationsOpen(getBetaWindowStatus(window.startedAt).isOpenForApplications))
      .catch(() => setApplicationsOpen(true));
  }, []);

  async function submitApplication() {
    if (!fullName || !email || !dateOfBirth || !cityState || !whyJoin || !signature) {
      Alert.alert('Missing information', 'Please complete the required fields.');
      return;
    }

    if (!communityAgree || !ndaAgree || !privacyAgree || !wellnessAgree || !truthAgree) {
      Alert.alert('Agreements needed', 'Please agree to each required section.');
      return;
    }

    if (isMinor && (!parentName || !parentEmail || !parentPhone || !parentSignature)) {
      Alert.alert('Parent consent needed', 'A parent or guardian must complete consent.');
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, 'betaApplications'), {
        uid: auth.currentUser?.uid || null,
        fullName,
        preferredName,
        email,
        dateOfBirth,
        isMinor,
        cityState,
        whyJoin,
        hope,
        parentName: isMinor ? parentName : '',
        parentEmail: isMinor ? parentEmail : '',
        parentPhone: isMinor ? parentPhone : '',
        parentSignature: isMinor ? parentSignature : '',
        signature,
        communityAgree,
        ndaAgree,
        privacyAgree,
        wellnessAgree,
        truthAgree,
        status: isMinor ? 'awaiting_parent_review' : 'pending_review',
        badgeRequested: 'Founding Butterfly',
        submittedAt: serverTimestamp(),
      });

      Alert.alert(
        'Application Submitted',
        'Your Founding Butterfly application has been received and is pending review.'
      );

      router.replace('/beta-pending' as any);
    } catch {
      Alert.alert('Could not submit', 'Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (applicationsOpen === undefined) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#E75480" />
      </View>
    );
  }

  if (!applicationsOpen) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Text style={styles.icon}>🦋</Text>
        <Text style={styles.title}>Applications Are Closed</Text>
        <Text style={styles.subtitle}>
          The Founding Butterfly beta window has ended, so we are no longer
          accepting new applications.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/beta-pending' as any)}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.icon}>🦋</Text>

      <Text style={styles.title}>Become a Founding Butterfly</Text>

      <Text style={styles.subtitle}>
        Thank you for believing in The Butterfly while it is still growing its wings.
      </Text>

      <Section title="Welcome Home">
        <Text style={styles.bodyText}>
          The Butterfly is more than an app. It is a healing-centered community
          created for growth, encouragement, reflection, and meaningful connection.
        </Text>
        <Text style={styles.bodyText}>
          As a Founding Butterfly, your feedback will help shape this experience
          before it opens to the public.
        </Text>
      </Section>

      <Section title="What to Expect">
        <Text style={styles.bodyText}>During beta testing, you understand that:</Text>
        <Bullet text="Some features may change." />
        <Bullet text="Bugs may happen." />
        <Bullet text="Your feedback helps improve the app." />
        <Bullet text="Access may be limited while the app is being tested." />
      </Section>

      <Section title="Application Information">
        <Input label="Full Name" value={fullName} onChangeText={setFullName} />
        <Input label="Preferred Name" value={preferredName} onChangeText={setPreferredName} />
        <Input label="Email" value={email} onChangeText={setEmail} />
        <Input label="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} placeholder="MM/DD/YYYY" />
        <Input label="City and State" value={cityState} onChangeText={setCityState} />
        <Input
          label="Why do you want to become a Founding Butterfly?"
          value={whyJoin}
          onChangeText={setWhyJoin}
          multiline
        />
        <Input
          label="What gives you hope?"
          value={hope}
          onChangeText={setHope}
          multiline
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Applicant is under 18</Text>
          <Switch value={isMinor} onValueChange={setIsMinor} />
        </View>
      </Section>

      <Section title="Our Community Promise">
        <Text style={styles.bodyText}>
          The Butterfly is built on kindness, privacy, respect, and encouragement.
          By joining, you agree to protect the dignity of others.
        </Text>
        <Bullet text="I will treat others with compassion." />
        <Bullet text="I will respect member privacy." />
        <Bullet text="I will encourage growth instead of judgment." />
        <Agreement
          text="I agree to the Community Promise."
          value={communityAgree}
          onValueChange={setCommunityAgree}
        />
      </Section>

      <Section title="Confidentiality Agreement">
        <Text style={styles.bodyText}>
          Friendly version: The Butterfly is private during beta. Please do not
          share screenshots, videos, private features, member information, or app
          details without written permission.
        </Text>
        <Text style={styles.legalText}>
          Formal NDA: I agree not to disclose, reproduce, distribute, copy,
          reverse engineer, publicly display, or share confidential information,
          screenshots, unreleased features, workflows, designs, branding,
          concepts, or intellectual property belonging to The Butterfly or Vision
          Dreamers LLC without prior written permission.
        </Text>
        <Agreement
          text="I agree to the Confidentiality and NDA terms."
          value={ndaAgree}
          onValueChange={setNdaAgree}
        />
      </Section>

      <Section title="Intellectual Property">
        <Text style={styles.bodyText}>
          The Butterfly, Butterfly Care, Butterfly Partners, Butterfly Garden,
          Healing Studio, names, workflows, content, branding, graphics, and
          related ideas belong to Vision Dreamers LLC.
        </Text>
      </Section>

      <Section title="Privacy Promise">
        <Text style={styles.bodyText}>
          We will not sell your personal information. Journals and prayer
          requests are treated as private unless you choose to share them.
        </Text>
        <Agreement
          text="I understand and agree to the Privacy Promise."
          value={privacyAgree}
          onValueChange={setPrivacyAgree}
        />
      </Section>

      <Section title="Wellness Notice">
        <Text style={styles.bodyText}>
          The Butterfly offers encouragement, reflection tools, community support,
          journaling, and wellness resources. It is not medical care, therapy,
          crisis treatment, or a replacement for licensed professionals.
        </Text>
        <Text style={styles.bodyText}>
          If you are in immediate danger, call emergency services or contact a
          crisis support resource right away.
        </Text>
        <Agreement
          text="I understand The Butterfly is not a substitute for professional care."
          value={wellnessAgree}
          onValueChange={setWellnessAgree}
        />
      </Section>

      {isMinor && (
        <Section title="Parent / Guardian Consent">
          <Input label="Parent / Guardian Name" value={parentName} onChangeText={setParentName} />
          <Input label="Parent / Guardian Email" value={parentEmail} onChangeText={setParentEmail} />
          <Input label="Parent / Guardian Phone" value={parentPhone} onChangeText={setParentPhone} />
          <Input
            label="Parent / Guardian Electronic Signature"
            value={parentSignature}
            onChangeText={setParentSignature}
            placeholder="Type full legal name"
          />
          <Text style={styles.legalText}>
            By signing, the parent or guardian gives permission for the minor to
            participate in The Butterfly beta program and understands the beta,
            privacy, confidentiality, and wellness terms.
          </Text>
        </Section>
      )}

      <Section title="Electronic Signature">
        <Input
          label="Your Electronic Signature"
          value={signature}
          onChangeText={setSignature}
          placeholder="Type your full legal name"
        />

        <Agreement
          text="I certify that the information I provided is true."
          value={truthAgree}
          onValueChange={setTruthAgree}
        />
      </Section>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={submitApplication}
        disabled={saving}
      >
        <Text style={styles.submitButtonText}>
          {saving ? 'Submitting...' : 'Spread My Wings'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/beta-pending' as any)}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return <Text style={styles.bullet}>• {text}</Text>;
}

function Agreement({
  text,
  value,
  onValueChange,
}: {
  text: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.agreementRow}>
      <Switch value={value} onValueChange={onValueChange} />
      <Text style={styles.agreementText}>{text}</Text>
    </View>
  );
}

function Input({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder || label}
        placeholderTextColor="#9B8AA8"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </>
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
  sectionTitle: {
    color: '#4B1D7A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
  },
  bodyText: {
    color: '#3F2A4D',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 23,
    marginBottom: 10,
    textAlign: 'center',
  },
  legalText: {
    color: '#3F2A4D',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: 12,
    textAlign: 'center',
  },
  bullet: {
    color: '#3F2A4D',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 23,
    marginBottom: 6,
  },
  label: {
    color: '#4B1D7A',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 6,
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
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  switchRow: {
    backgroundColor: '#FFF9F3',
    borderWidth: 2,
    borderColor: '#F1D7A7',
    borderRadius: 18,
    padding: 14,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchText: {
    color: '#4B1D7A',
    fontSize: 15,
    fontWeight: '900',
  },
  agreementRow: {
    backgroundColor: '#FFF9F3',
    borderWidth: 2,
    borderColor: '#F1D7A7',
    borderRadius: 18,
    padding: 14,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  agreementText: {
    color: '#3F2A4D',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    lineHeight: 20,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#E75480',
    borderRadius: 30,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
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
