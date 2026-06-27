import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function createUserProfile(
  uid: string,
  email: string,
  name: string
) {
  await setDoc(doc(db, 'users', uid), {
    uid,
    email,
    name,
    createdAt: serverTimestamp(),

    onboardingComplete: false,

    currentMood: '',

    healingStage: 'Beginning',

    journalCount: 0,

    completedActivities: 0,
  });
}