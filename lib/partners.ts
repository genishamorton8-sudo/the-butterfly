import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { auth, db } from './firebase';

export type UserRole = 'admin' | 'member';

export type PartnerProfile = {
  uid: string;
  email: string;
  displayName: string;
  partnerCode: string;
  partnerUid: string | null;
  emojiSkinTone: string;
  role: UserRole;
  createdAt?: any;
};

function makePartnerCode(uid: string) {
  return uid.slice(0, 6).toUpperCase();
}

function getDefaultRole(email: string): UserRole {
  const adminEmails = ['bleuolive19@gmail.com'];

  return adminEmails.includes(email.toLowerCase()) ? 'admin' : 'member';
}

export async function createOrUpdateMyPartnerProfile() {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  const email = user.email || '';
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const existing = snap.data() as PartnerProfile;

    const updated: PartnerProfile = {
      ...existing,
      uid: user.uid,
      email,
      displayName: existing.displayName || user.displayName || email.split('@')[0],
      partnerCode: existing.partnerCode || makePartnerCode(user.uid),
      partnerUid: existing.partnerUid || null,
      emojiSkinTone: existing.emojiSkinTone || 'default',
      role: existing.role || getDefaultRole(email),
    };

    await setDoc(userRef, updated, { merge: true });
    return updated;
  }

  const profile: PartnerProfile = {
    uid: user.uid,
    email,
    displayName: user.displayName || email.split('@')[0],
    partnerCode: makePartnerCode(user.uid),
    partnerUid: null,
    emojiSkinTone: 'default',
    role: getDefaultRole(email),
    createdAt: serverTimestamp(),
  };

  await setDoc(userRef, profile);
  return profile;
}

export async function getMyPartnerProfile() {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    return createOrUpdateMyPartnerProfile();
  }

  return snap.data() as PartnerProfile;
}