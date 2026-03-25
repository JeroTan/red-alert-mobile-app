import { Coordinates } from "@/types/location";
import React, { useMemo } from "react";
import { Dimensions, View } from "react-native";
import { cn } from "./ThemedView";

interface MapProps {
  height?: number;
  className?: string;
  initialRegion?: Coordinates & {
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  markers?: Array<{
    id: string;
    coordinate: Coordinates;
    title: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
}

export function Map({
  height,
  className,
  initialRegion,
  markers = [],
}: MapProps) {
  const defaultHeight = Dimensions.get("window").height * 0.45;

  const mapUrl = useMemo(() => {
    const baseUrl = "https://www.google.com/maps?output=embed";

    // Scenario 1: Route (Exactly 2 markers)
    if (markers.length === 2) {
      const origin = `${markers[0].coordinate.latitude},${markers[0].coordinate.longitude}`;
      const destination = `${markers[1].coordinate.latitude},${markers[1].coordinate.longitude}`;
      // Note: Google Maps Embed with q=from+to works well for simple routes
      return `${baseUrl}&q=${origin}+to+${destination}`;
    }

    // Scenario 2: Single Marker (1 marker)
    if (markers.length === 1) {
      const lat = markers[0].coordinate.latitude;
      const lng = markers[0].coordinate.longitude;
      return `${baseUrl}&q=${lat},${lng}`;
    }

    // Scenario 3: No Markers (Use initialRegion or default)
    const lat = initialRegion?.latitude || 14.5995; // Default to Manila
    const lng = initialRegion?.longitude || 120.9842;
    return `${baseUrl}&q=${lat},${lng}`;
  }, [markers, initialRegion]);

  return (
    <View
      style={{ height: height || defaultHeight }}
      className={cn("overflow-hidden bg-gray-100 dark:bg-gray-800", className)}
    >
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      />
    </View>
  );
}
