import React from 'react';
import { Stack } from 'expo-router';

export default function HomeNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="article" options={{ title: 'Article' }} />
    </Stack>
  );
}
