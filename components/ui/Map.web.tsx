import { colors } from "@/style/colors";
import { Coordinates } from "@/types/location";
import { Asset } from "expo-asset";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import LeafletView, { WebViewLeafletEvents } from "./LeafletView";
import { cn } from "./ThemedView";

interface MapProps {
  height?: number;
  className?: string;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  markers?: Array<{
    id: string;
    coordinate: Coordinates;
    title: string;
    description?: string;
    icon?: string;
  }>;
  onRegionChangeComplete?: (region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }) => void;
  children?: React.ReactNode;
  zoom?: number;
}

export function Map({
  height,
  className,
  markers,
  initialRegion,
  onRegionChangeComplete,
  children,
  zoom = 15,
}: MapProps) {
  const [mapSource, setMapSource] = useState<{ uri: string } | null>(null);
  const defaultHeight = Dimensions.get("window").height * 0.45;

  useEffect(() => {
    async function loadMap() {
      try {
        const asset = Asset.fromModule(require("@/assets/leaflet/index.html"));
        await asset.downloadAsync();
        if (asset.uri) {
          setMapSource({ uri: asset.uri });
        }
      } catch (error) {
        console.error("Error loading leaflet asset on web:", error);
      }
    }
    loadMap();
  }, []);

  const mapCenter = initialRegion
    ? { lat: initialRegion.latitude, lng: initialRegion.longitude }
    : { lat: 14.6121, lng: 120.9723 };

  const mapMarkers = markers?.map((m) => ({
    id: m.id,
    position: { lat: m.coordinate.latitude, lng: m.coordinate.longitude },
    title: m.title,
    icon: m.icon || "📍",
  }));

  if (!mapSource) {
    return (
      <View
        style={{ height: height || defaultHeight }}
        className={cn("items-center justify-center bg-gray-100", className)}
      >
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={{ height: height || defaultHeight }}
      className={cn("overflow-hidden relative bg-gray-100", className)}
    >
      <LeafletView
        doDebug={false}
        mapCenterPosition={mapCenter}
        zoom={zoom}
        mapMarkers={mapMarkers}
        source={mapSource}
        onMessageReceived={(message: any) => {
          if (
            message.event === WebViewLeafletEvents.ON_MOVE_END &&
            message.payload?.mapCenterPosition &&
            onRegionChangeComplete
          ) {
            const { lat, lng } = message.payload.mapCenterPosition;
            onRegionChangeComplete({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        }}
      />
      {children}
    </View>
  );
}
