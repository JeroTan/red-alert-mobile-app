import React from 'react';
import { View, Dimensions } from 'react-native';
import MapView, { Marker, type MapViewProps } from 'react-native-maps';
import { cn } from './ThemedView';

interface MapProps extends MapViewProps {
  height?: number;
  className?: string;
  initialRegion?: MapViewProps['initialRegion'];
  markers?: Array<{
    id: string;
    coordinate: { latitude: number; longitude: number };
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
}

export function Map({ height, className, markers, initialRegion, ...props }: MapProps) {
  const defaultHeight = Dimensions.get('window').height * 0.45;

  return (
    <View style={{ height: height || defaultHeight }} className={cn("overflow-hidden", className)}>
      <MapView
        className="w-full h-full"
        initialRegion={initialRegion || {
          latitude: 14.6121,
          longitude: 120.9723,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        {...props}
      >
        {markers?.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          >
            {marker.icon}
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
