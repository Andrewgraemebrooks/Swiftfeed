import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: 'Home',
            }}
          />
        </Drawer>
      </Provider>
    </GestureHandlerRootView>
  );
}
