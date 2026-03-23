import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ResponderHeader } from '../components/ResponderHeader';
import { Map } from '../../../components/ui/Map';
import { IncidentCard } from '../components/IncidentCard';
import { IncidentBottomSheet } from '../components/IncidentBottomSheet';
import { StatusToggle } from '../components/StatusToggle';
import { useResponderState } from '../hooks/useResponderState';
import { ThemedView } from '../../../components/ui/ThemedView';

interface ResponderDashboardProps {
  onSwitchMode: () => void;
}

export function ResponderDashboard({ onSwitchMode }: ResponderDashboardProps) {
  const insets = useSafeAreaInsets();
  const {
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
  } = useResponderState();

  return (
    <ThemedView className="flex-1" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <ResponderHeader onSwitchMode={onSwitchMode} />
      
      <Map 
        markers={[
          {
            id: 'responder',
            coordinate: { latitude: 14.6121, longitude: 120.9723 },
            title: 'Your Location',
            description: 'Responder Unit AMB-05',
          }
        ]}
      />

      <View className="flex-1 p-4 bg-white">
        <IncidentCard 
          incident={currentIncident}
          responderStatus={responderStatus}
          incidentAccepted={incidentAccepted}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      </View>

      {incidentAccepted && (
        <IncidentBottomSheet 
          bottomSheetRef={bottomSheetRef}
          incident={currentIncident}
          responderStatus={responderStatus}
          onNavigate={handleNavigate}
          onCall={handleCall}
          onChat={handleChat}
          onMarkOnScene={handleMarkOnScene}
          onRequestBackup={handleRequestBackup}
          onResolve={handleResolve}
        />
      )}

      <StatusToggle 
        status={responderStatus} 
        onStatusChange={setResponderStatus} 
      />
    </ThemedView>
  );
}
