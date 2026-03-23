import React from 'react';
import { useAppMode } from './_layout';
import { ResponderDashboard } from '../features/responder/screens/ResponderDashboard';
import { PublicHome } from '../features/public/screens/PublicHome';

export default function AppRouter() {
  const { mode, setMode } = useAppMode();

  if (mode === 'public') {
    return <PublicHome onSwitchMode={() => setMode('responder')} />;
  }

  return <ResponderDashboard onSwitchMode={() => setMode('public')} />;
}
