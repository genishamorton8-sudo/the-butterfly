import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { auth } from '../../lib/firebase';

export default function TabLayout() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  if (user === undefined) {
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

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E75480',
        tabBarInactiveTintColor: '#6B4A78',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F1D7A7',
          borderTopWidth: 2,
          height: 78,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '900',
        },
      }}
    >
      {/* Visible Tabs */}

      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ size }) => (
            <Ionicons name="home" size={size} color="#E75480" />
          ),
        }}
      />

      <Tabs.Screen
        name="today-word"
        options={{
          title: 'Word',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={size}
              color="#E75480"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="healing-journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="notebook-edit"
              size={size}
              color="#E75480"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="garden"
        options={{
          title: 'Garden',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="sprout"
              size={size}
              color="#E75480"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="testimonials"
        options={{
          title: 'Stories',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="butterfly"
              size={size}
              color="#E75480"
            />
          ),
        }}
      />

      {/* Hidden Screens */}

      <Tabs.Screen name="journal" options={{ href: null }} />
      <Tabs.Screen name="daily-journey" options={{ href: null }} />
      <Tabs.Screen name="journey" options={{ href: null }} />
      <Tabs.Screen name="mood" options={{ href: null }} />
      <Tabs.Screen name="mood-response" options={{ href: null }} />
      <Tabs.Screen name="egg-activity" options={{ href: null }} />
      <Tabs.Screen name="celebrate" options={{ href: null }} />
      <Tabs.Screen name="upload-selfie" options={{ href: null }} />
      <Tabs.Screen name="accountability" options={{ href: null }} />
      <Tabs.Screen name="connect-partner" options={{ href: null }} />
      <Tabs.Screen name="healing-exercises" options={{ href: null }} />
      <Tabs.Screen name="change-the-thought" options={{ href: null }} />
      <Tabs.Screen name="rewrite-scene" options={{ href: null }} />
      <Tabs.Screen name="meet-younger-me" options={{ href: null }} />
      <Tabs.Screen name="safe-place" options={{ href: null }} />
      <Tabs.Screen name="mirror-truth" options={{ href: null }} />
      <Tabs.Screen name="letters-never-sent" options={{ href: null }} />
      <Tabs.Screen name="future-self" options={{ href: null }} />

      {/* Hide ALL extra tabs */}

      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="skin-tone" options={{ href: null }} />
      <Tabs.Screen name="bug-report" options={{ href: null }} />
      <Tabs.Screen name="application" options={{ href: null }} />
      <Tabs.Screen name="beta-center" options={{ href: null }} />
      <Tabs.Screen name="announcements" options={{ href: null }} />
      <Tabs.Screen name="feature-request" options={{ href: null }} />

      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}