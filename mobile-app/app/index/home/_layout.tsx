import React from 'react';
import { Stack } from 'expo-router';

export default function HomeNavigator() {
  return (
    <Stack>
      <Stack.Screen name="HomeScreen" options={{ title: 'Latest' }} />
      <Stack.Screen name="Article" options={{ title: 'Article' }} />
    </Stack>
  );
}
