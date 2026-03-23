import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shield, Ambulance, Flame } from 'lucide-react-native';
import { PublicHeader } from '../components/PublicHeader';
import { SOSButton } from '../components/SOSButton';
import { EmergencyTypeCard } from '../components/EmergencyTypeCard';
import { ReportForm } from '../components/ReportForm';
import { TrackingView } from '../components/TrackingView';
import { ResolutionSummary } from '../components/ResolutionSummary';
import { PublicBottomNav } from '../components/PublicBottomNav';
import { usePublicState } from '../hooks/usePublicState';
import { ThemedView } from '../../../components/ui/ThemedView';
import { ThemedText } from '../../../components/ui/ThemedText';

interface PublicHomeProps {
  onSwitchMode: () => void;
}

export function PublicHome({ onSwitchMode }: PublicHomeProps) {
  const insets = useSafeAreaInsets();
  const {
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
  } = usePublicState();

  return (
    <ThemedView className="flex-1" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {publicStep !== 'resolved' && (
        <PublicHeader 
          step={publicStep} 
          onBack={() => setPublicStep('sos')} 
          onSwitchMode={onSwitchMode}
        />
      )}

      <View className="flex-1 bg-white">
        {publicStep === 'sos' && (
          <SOSButton onPress={handleSOS} onSwitchMode={onSwitchMode} />
        )}

        {publicStep === 'select-type' && (
          <View className="p-6">
            <ThemedText className="text-2xl font-bold mb-2">What's the emergency?</ThemedText>
            <ThemedText className="text-gray-500 dark:text-gray-400 mb-8">Select a type to help us dispatch the right team.</ThemedText>

            <View className="space-y-4">
              <EmergencyTypeCard 
                id="police" title="POLICE" subtitle="Crime, Theft, Danger" 
                color="bg-agency-police" icon={Shield} 
                isSelected={selectedType === 'police'} onSelect={handleSelectType} 
              />
              <EmergencyTypeCard 
                id="ambulance" title="AMBULANCE" subtitle="Medical, Injury, Accident" 
                color="bg-agency-medical" icon={Ambulance} 
                isSelected={selectedType === 'ambulance'} onSelect={handleSelectType} 
              />
              <EmergencyTypeCard 
                id="fire" title="FIRE" subtitle="Fire, Gas Leak, Explosion" 
                color="bg-agency-fire" icon={Flame} 
                isSelected={selectedType === 'fire'} onSelect={handleSelectType} 
              />
            </View>
          </View>
        )}

        {publicStep === 'report-form' && (
          <ScrollView>
            <ReportForm selectedType={selectedType} onSubmit={handleSubmitReport} />
          </ScrollView>
        )}

        {publicStep === 'tracking' && (
          <TrackingView 
            selectedType={selectedType} 
            progress={trackingProgress} 
            userLoc={userLoc} 
            responderLoc={responderLoc} 
            hospitalLoc={hospitalLoc} 
          />
        )}

        {publicStep === 'resolved' && (
          <ResolutionSummary selectedType={selectedType} onBackToHome={handleReset} />
        )}
      </View>

      <PublicBottomNav activeTab={activeTab} onTabPress={setActiveTab} />
    </ThemedView>
  );
}
