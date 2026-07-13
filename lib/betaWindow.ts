import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from './firebase';

const BETA_WINDOW_DAYS = 90;
const DAY_MS = 24 * 60 * 60 * 1000;

export type BetaWindow = {
  startedAt: Date | null;
};

export type BetaWindowStatus = {
  started: boolean;
  isOpenForApplications: boolean;
  daysElapsed: number;
  daysRemaining: number;
  endsAt: Date | null;
};

function toDate(value: any): Date | null {
  if (!value) {
    return null;
  }

  if (typeof value.toDate === 'function') {
    return value.toDate();
  }

  return new Date(value);
}

export async function getBetaWindow(): Promise<BetaWindow> {
  const snap = await getDoc(doc(db, 'config', 'beta'));

  if (!snap.exists()) {
    return { startedAt: null };
  }

  return { startedAt: toDate(snap.data().startedAt) };
}

export async function startBetaWindow(): Promise<void> {
  await setDoc(doc(db, 'config', 'beta'), {
    startedAt: serverTimestamp(),
  });
}

export function getBetaWindowStatus(startedAt: Date | null): BetaWindowStatus {
  if (!startedAt) {
    return {
      started: false,
      isOpenForApplications: true,
      daysElapsed: 0,
      daysRemaining: BETA_WINDOW_DAYS,
      endsAt: null,
    };
  }

  const daysElapsed = Math.floor((Date.now() - startedAt.getTime()) / DAY_MS);
  const daysRemaining = Math.max(0, BETA_WINDOW_DAYS - daysElapsed);
  const endsAt = new Date(startedAt.getTime() + BETA_WINDOW_DAYS * DAY_MS);

  return {
    started: true,
    isOpenForApplications: daysElapsed <= BETA_WINDOW_DAYS,
    daysElapsed,
    daysRemaining,
    endsAt,
  };
}
