import React from 'react';
import { View, Dimensions } from 'react-native';
import { cn } from './ThemedView';
import { ThemedText } from './ThemedText';

interface MapProps {
  height?: number;
  className?: string;
  initialRegion?: any;
  markers?: Array<{
    id: string;
    coordinate: { latitude: number; longitude: number };
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
}

export function Map({ height, className, markers }: MapProps) {
  const defaultHeight = Dimensions.get('window').height * 0.45;

  return (
    <View 
      style={{ height: height || defaultHeight }} 
      className={cn("bg-gray-200 dark:bg-gray-800 items-center justify-center border-b border-gray-300 dark:border-gray-700", className)}
    >
      <ThemedText className="font-bold opacity-50 uppercase tracking-widest text-center px-6">
        Map View (Native Only)
      </ThemedText>
      <ThemedText className="text-xs opacity-40 mt-1">
        {markers?.length || 0} markers active in this area
      </ThemedText>
    </View>
  );
}

