import { useState, useCallback, useEffect } from 'react';
import type { PublicStep, EmergencyType } from '../types';

export function usePublicState() {
  const [publicStep, setPublicStep] = useState<PublicStep>('sos');
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);
  const [trackingProgress, setTrackingProgress] = useState(0.1);
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'settings'>('home');

  // Map markers for tracking simulation
  const userLoc = { latitude: 14.6121, longitude: 120.9723 };
  const hospitalLoc = { latitude: 14.6151, longitude: 120.9753 };
  const responderLoc = { 
    latitude: 14.6121 + (1 - trackingProgress) * 0.005, 
    longitude: 120.9723 + (1 - trackingProgress) * 0.005 
  };

  // Simulation: Progress tracker for Citizen app
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (publicStep === 'tracking' && trackingProgress < 1.0) {
      interval = setInterval(() => {
        setTrackingProgress(prev => {
          const next = prev + 0.15;
          if (next >= 1.0) {
            clearInterval(interval);
            return 1.0;
          }
          return next;
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [publicStep, trackingProgress]);

  // Auto-resolve when progress reaches 100%
  useEffect(() => {
    if (trackingProgress >= 1.0 && publicStep === 'tracking') {
      setTimeout(() => {
        setPublicStep('resolved');
      }, 2000);
    }
  }, [trackingProgress, publicStep]);

  const handleSOS = useCallback(() => {
    setPublicStep('select-type');
    setTrackingProgress(0.1);
  }, []);

  const handleSelectType = useCallback((type: EmergencyType) => {
    setSelectedType(type);
    setTimeout(() => {
      setPublicStep('report-form');
    }, 400);
  }, []);

  const handleSubmitReport = useCallback(() => {
    // TODO: Call API to submit report
    (async () => {
      setPublicStep('tracking');
    })();
  }, []);

  const handleReset = useCallback(() => {
    setPublicStep('sos');
    setSelectedType(null);
    setTrackingProgress(0.1);
  }, []);

  return {
    publicStep,
    setPublicStep,
    selectedType,
    trackingProgress,
    activeTab,
    setActiveTab,
    userLoc,
    responderLoc,
    hospitalLoc,
    handleSOS,
    handleSelectType,
    handleSubmitReport,
    handleReset,
  };
}
