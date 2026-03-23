import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MapPin, RefreshCw } from 'lucide-react-native';
import { ThemedText } from '../../../components/ui/ThemedText';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../components/ui/ThemedView';
import type { EmergencyType } from '../types';

interface ReportFormProps {
  selectedType: EmergencyType | null;
  onSubmit: () => void;
}

export function ReportForm({ selectedType, onSubmit }: ReportFormProps) {
  return (
    <View className="p-6">
      <View className="flex-row justify-between items-center mb-6">
        <ThemedText className="text-2xl font-bold">Report Details</ThemedText>
        <View className={cn(
          "px-3 py-1 rounded-full",
          selectedType === 'police' ? 'bg-agency-police' : selectedType === 'ambulance' ? 'bg-agency-medical' : 'bg-agency-fire'
        )}>
          <ThemedText className="text-white text-xs font-bold uppercase">{selectedType}</ThemedText>
        </View>
      </View>

      <View className="space-y-6">
        <View>
          <ThemedText className="text-sm font-bold text-gray-400 uppercase mb-2">📍 Current Location</ThemedText>
          <View className="p-4 bg-white dark:bg-gray-800 rounded-xl flex-row items-center border border-gray-100 dark:border-gray-700">
            <View className="text-brand-primary mr-3">
            <MapPin size={20} />
          </View>
            <View className="flex-1">
              <ThemedText className="text-sm font-medium">Juan Luna St, Brgy. 105, Tondo</ThemedText>
              <ThemedText className="text-xs text-brand-primary">Detected automatically</ThemedText>
            </View>
            <TouchableOpacity>
              <ThemedText className="text-brand-primary font-bold text-xs uppercase">Change</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <ThemedText className="text-sm font-bold text-gray-400 uppercase mb-2">📷 Photo (Optional)</ThemedText>
          <TouchableOpacity className="w-full h-32 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl justify-center items-center bg-white dark:bg-gray-800/50">
            <View className="text-gray-300 mb-2">
            <RefreshCw size={32} />
          </View>
            <ThemedText className="text-gray-400 text-sm">Add Photo or Video</ThemedText>
          </TouchableOpacity>
        </View>

        <View>
          <ThemedText className="text-sm font-bold text-gray-400 uppercase mb-2">📝 Description (Optional)</ThemedText>
          <View className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 h-24">
            <ThemedText className="text-gray-400">Describe the situation briefly...</ThemedText>
          </View>
        </View>

        <Button
          label="SUBMIT NOW"
          variant="critical"
          onPress={onSubmit}
          className="w-full h-14 shadow-lg"
          textClassName="text-lg uppercase tracking-widest"
        />      </View>
    </View>
  );
}
