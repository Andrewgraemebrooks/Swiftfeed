import React from 'react';
import { Tabs } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen name="home" />
      </Tabs>
    </Provider>
  );
}
