import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { ThemedText } from '../../../components/ui/ThemedText';
import type { PublicStep } from '../types';

interface PublicHeaderProps {
  step: PublicStep;
  onBack: () => void;
  onSwitchMode: () => void;
}

export function PublicHeader({ step, onBack, onSwitchMode }: PublicHeaderProps) {
  const showBack = ['select-type', 'report-form'].includes(step);
  const showSwitch = step === 'sos';

  return (
    <View className="h-14 px-4 flex-row justify-between items-center border-b border-gray-200 bg-white">
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity onPress={onBack} className="mr-3 p-1">
            <View className="text-gray-400 -rotate-90">
            <RefreshCw size={20} />
          </View>
          </TouchableOpacity>
        )}
        <ThemedText className="text-xl font-bold">Red Alert</ThemedText>
      </View>
      
      {showSwitch && (
        <TouchableOpacity onPress={onSwitchMode} className="p-2">
          <ThemedText className="font-bold text-brand-primary text-xs uppercase">Responder</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}
