import { colors } from "@/style/colors";
import { MapPin } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface MapMoveablePinProps {
  children: React.ReactNode;
}

export function MapMoveablePin({ children }: MapMoveablePinProps) {
  return (
    <View className="relative">
      {children}
      <View
        pointerEvents="none"
        className="absolute inset-0 items-center justify-center"
      >
        <View className="mb-8">
          <MapPin
            size={32}
            {...{ color: colors.primary, fill: colors.primary }}
          />
        </View>
      </View>
    </View>
  );
}
