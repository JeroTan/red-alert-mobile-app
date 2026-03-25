import { Coordinates } from "@/types/location";
import React from "react";
import { Dimensions, View } from "react-native";
import MapView, { Marker, type MapViewProps } from "react-native-maps";
import { cn } from "./ThemedView";

interface MapProps extends MapViewProps {
  height?: number;
  className?: string;
  initialRegion?: MapViewProps["initialRegion"];
  markers?: Array<{
    id: string;
    coordinate: Coordinates;
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
  onRegionChangeComplete?: MapViewProps["onRegionChangeComplete"];
  children?: React.ReactNode;
}

export function Map({
  height,
  className,
  markers,
  initialRegion,
  onRegionChangeComplete,
  children,
  ...props
}: MapProps) {
  const defaultHeight = Dimensions.get("window").height * 0.45;

  return (
    <View
      style={{ height: height || defaultHeight }}
      className={cn("overflow-hidden", className)}
    >
      <MapView
        className="w-full h-full"
        initialRegion={
          initialRegion || {
            latitude: 14.6121,
            longitude: 120.9723,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
        }
        onRegionChangeComplete={onRegionChangeComplete}
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
      {children}
    </View>
  );
}
