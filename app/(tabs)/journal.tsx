import { Redirect } from 'expo-router';

// This screen has been merged into healing-journal.tsx (the "Journal" tab),
// which now shows both free-write reflections and the healing exercise log
// as two sections in one screen. This redirect keeps every existing link
// to '/(tabs)/journal' working without needing to update each caller.
export default function JournalRedirectScreen() {
  return <Redirect href="/(tabs)/healing-journal?tab=reflect" />;
}
