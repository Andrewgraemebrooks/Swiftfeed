import React from 'react';
import { Redirect } from 'expo-router';
import log, { LogLevelDesc } from 'loglevel';

log.setLevel(process.env.EXPO_PUBLIC_LOG_LEVEL as LogLevelDesc);

const StartPage = () => {
  return <Redirect href="/home" />;
};

export default StartPage;
