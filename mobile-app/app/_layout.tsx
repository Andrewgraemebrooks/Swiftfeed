import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { LogBox } from 'react-native';
import log, { LogLevelDesc } from 'loglevel';

log.setLevel(process.env.EXPO_PUBLIC_LOG_LEVEL as LogLevelDesc);

// react-native-render-html warnings from Expo upgrade
LogBox.ignoreLogs([
  'TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  'MemoizedTNodeRenderer: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
  'TRenderEngineProvider: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="main"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
