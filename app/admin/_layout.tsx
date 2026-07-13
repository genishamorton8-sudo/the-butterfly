import { Redirect, Stack } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { auth } from '../../lib/firebase';
import { AccessLevel, resolveAccess } from '../../lib/access';

export default function AdminLayout() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [access, setAccess] = useState<AccessLevel | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (!user) {
      setAccess('signed-out');
      return;
    }

    setAccess(undefined);
    resolveAccess().then(setAccess);
  }, [user]);

  if (user === undefined || access === undefined) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF9F3',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#E75480" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (access !== 'admin') {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
