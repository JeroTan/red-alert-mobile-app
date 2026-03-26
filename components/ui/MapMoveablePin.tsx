import { colors } from "@/style/colors";
import { Coordinates } from "@/types/location";
import { MapPin } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface MapChildProps {
  onRegionChangeComplete?: (region: any) => void;
  [key: string]: any;
}

interface MapMoveablePinProps {
  children: React.ReactElement<MapChildProps>;
  onPinChange?: (coordinates: Coordinates) => void;
  setPin?: Coordinates;
}

export function MapMoveablePin({
  children,
  onPinChange,
}: MapMoveablePinProps) {
  // Inject onRegionChangeComplete into the Map child
  const mapChild = React.cloneElement(children, {
    onRegionChangeComplete: (region: any) => {
      if (onPinChange) {
        onPinChange({
          latitude: region.latitude,
          longitude: region.longitude,
        });
      }
      // Call the original onRegionChangeComplete if it exists
      if (children.props.onRegionChangeComplete) {
        children.props.onRegionChangeComplete(region);
      }
    },
  });

  return (
    <View className="relative w-full h-full">
      {mapChild}
      <View
        pointerEvents="none"
        className="absolute inset-0 items-center justify-center"
      >
        <View style={{ marginBottom: 32 }}>
          <MapPin
            size={32}
            {...{ color: colors.primary, fill: colors.primary }}
          />
        </View>
      </View>
    </View>
  );
}
