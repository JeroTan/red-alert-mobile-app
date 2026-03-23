import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { cn } from '../../../components/ui/ThemedView';
import type { ResponderStatus } from '../types';

interface StatusToggleProps {
  status: ResponderStatus;
  onStatusChange: (status: ResponderStatus) => void;
}

export function StatusToggle({ status, onStatusChange }: StatusToggleProps) {
  const options: { id: ResponderStatus; label: string }[] = [
    { id: 'available', label: 'AVAILABLE' },
    { id: 'en-route', label: 'EN ROUTE' },
    { id: 'on-scene', label: 'ON SCENE' },
  ];

  return (
    <View className="h-[60px] flex-row border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      {options.map((option) => (
        <TouchableOpacity 
          key={option.id}
          onPress={() => onStatusChange(option.id)}
          className={cn(
            "flex-1 justify-center items-center",
            status === option.id ? "bg-brand-primary/10 border-t-2 border-brand-primary" : ""
          )}
        >
          <Text className={cn(
            "text-xs font-bold",
            status === option.id ? "text-brand-primary" : "text-gray-400"
          )}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
