import { useState, useCallback, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Alert, Linking } from 'react-native';
import type { ResponderStatus, Incident } from '../types';

export function useResponderState() {
  const [responderStatus, setResponderStatus] = useState<ResponderStatus>('available');
  const [incidentAccepted, setIncidentAccepted] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Mock Incident Data
  const [currentIncident] = useState<Incident>({
    id: 'EMG-2026-0142',
    type: 'ambulance',
    location: 'Juan Luna St, Tondo',
    landmark: 'Near 7-Eleven, Landmark: Tondo Market',
    reporter: 'Maria Santos',
    phone: '0912-345-6789',
    description: 'Patient having chest pain, conscious but difficulty breathing. Needs urgent medical attention.',
    distance: 0.8,
    timestamp: new Date().toISOString(),
  });

  const handleAccept = useCallback(() => {
    // TODO: Call API to accept incident
    (async () => {
      setIncidentAccepted(true);
      setResponderStatus('en-route');
      bottomSheetRef.current?.snapToIndex(1);
    })();
  }, []);

  const handleDecline = useCallback(() => {
    Alert.alert("Incident Declined", "You have declined this incident.");
  }, []);

  const handleNavigate = useCallback(() => {
    const lat = 14.6121;
    const lng = 120.9723;
    const label = "Emergency Location";
    const url = `geo:${lat},${lng}?q=${lat},${lng}(${label})`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open map application");
    });
  }, []);

  const handleCall = useCallback(() => {
    Linking.openURL(`tel:${currentIncident.phone}`);
  }, [currentIncident.phone]);

  const handleChat = useCallback(() => {
    Alert.alert("Chat", "Opening chat with dispatcher...");
  }, []);

  const handleMarkOnScene = useCallback(() => {
    setResponderStatus('on-scene');
  }, []);

  const handleRequestBackup = useCallback(() => {
    Alert.alert("Backup Requested", "Dispatch has been notified that you need assistance.");
  }, []);

  const handleResolve = useCallback(() => {
    Alert.alert(
      "Resolve Incident",
      "Are you sure you want to mark this incident as resolved?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Resolve", 
          onPress: () => {
            setIncidentAccepted(false);
            setResponderStatus('available');
            bottomSheetRef.current?.close();
          }
        }
      ]
    );
  }, []);

  return {
    responderStatus,
    setResponderStatus,
    incidentAccepted,
    currentIncident,
    bottomSheetRef,
    handleAccept,
    handleDecline,
    handleNavigate,
    handleCall,
    handleChat,
    handleMarkOnScene,
    handleRequestBackup,
    handleResolve,
  };
}
