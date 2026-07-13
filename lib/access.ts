import { auth } from './firebase';
import { getMyPartnerProfile } from './partners';

export type AccessLevel = 'admin' | 'approved' | 'pending' | 'signed-out';

export async function resolveAccess(): Promise<AccessLevel> {
  if (!auth.currentUser) {
    return 'signed-out';
  }

  const profile = await getMyPartnerProfile();

  if (profile?.role === 'admin') {
    return 'admin';
  }

  if (profile?.betaStatus === 'approved') {
    return 'approved';
  }

  return 'pending';
}
