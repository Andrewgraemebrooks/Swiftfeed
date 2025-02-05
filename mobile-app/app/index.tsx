import React from 'react';
import { LogBox } from 'react-native';
import { Redirect } from 'expo-router';
import log, { LogLevelDesc } from 'loglevel';

log.setLevel(process.env.EXPO_PUBLIC_LOG_LEVEL as LogLevelDesc);

// react-native-render-html warnings from Expo upgrade
LogBox.ignoreLogs([
  'TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  'MemoizedTNodeRenderer: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
  'TRenderEngineProvider: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

const StartPage = () => {
  return <Redirect href="/home" />;
};

export default StartPage;
