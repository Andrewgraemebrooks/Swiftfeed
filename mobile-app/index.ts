import { LogBox } from 'react-native';
import log, { LogLevelDesc } from 'loglevel';

log.setLevel(process.env.EXPO_PUBLIC_LOG_LEVEL as LogLevelDesc);

// react-native-render-html warnings from Expo upgrade
LogBox.ignoreLogs([
  'TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  'MemoizedTNodeRenderer: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
  'TRenderEngineProvider: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

// eslint-disable-next-line import/first
import 'expo-router/entry';
