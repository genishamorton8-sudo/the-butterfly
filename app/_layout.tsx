import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="prayer" />
      <Stack.Screen name="emergency" />
      <Stack.Screen name="rewrite-scene" />
      <Stack.Screen name="sankofa" />
      <Stack.Screen name="modal" />
    </Stack>
  );
}