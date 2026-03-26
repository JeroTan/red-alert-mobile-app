import { Coordinates } from "@/types/location";
import {
  Ambulance,
  Flame,
  Home,
  MessageCircle,
  Phone,
  Shield,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Map } from "../../../components/ui/Map";
import { ThemedButton } from "../../../components/ui/ThemedButton";
import { ThemedText } from "../../../components/ui/ThemedText";
import { cn } from "../../../components/ui/ThemedView";
import type { EmergencyType } from "../types";

interface TrackingViewProps {
  selectedType: EmergencyType | null;
  progress: number;
  userCoordinates: Coordinates;
  respondentCoordinates: Coordinates;
  facilityCoordinates: Coordinates;
}

export function TrackingView({
  selectedType,
  progress,
  userCoordinates,
  respondentCoordinates,
  facilityCoordinates,
}: TrackingViewProps) {
  const Icon =
    selectedType === "police"
      ? Shield
      : selectedType === "ambulance"
        ? Ambulance
        : Flame;
  const typeColor =
    selectedType === "police"
      ? "bg-agency-police"
      : selectedType === "ambulance"
        ? "bg-agency-medical"
        : "bg-agency-fire";

  return (
    <View className="flex-1">
      <View className="p-4 bg-white dark:bg-gray-800 shadow-sm z-10">
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <View
              className={cn(
                "w-8 h-8 rounded-full justify-center items-center mr-3",
                typeColor,
              )}
            >
              <Icon size={16} {...{ color: "white" }} />
            </View>
            <View>
              <ThemedText className="text-xs font-bold text-gray-400 uppercase">
                {selectedType} - {progress < 0.9 ? "EN ROUTE" : "ARRIVED"}
              </ThemedText>
              <ThemedText className="text-lg font-bold">
                {progress < 0.9
                  ? `ETA: ${Math.max(1, Math.round(10 * (1 - progress)))} minutes`
                  : "Responder on scene"}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="w-full h-2 bg-brand-gray/10 rounded-full overflow-hidden">
          <View
            style={{ width: `${progress * 100}%` }}
            className="h-full bg-brand-primary"
          />
        </View>
      </View>

      {/* Map Area */}
      <Map
        className="flex-1"
        initialRegion={{
          ...userCoordinates,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        markers={[
          { id: "user", coordinate: userCoordinates, title: "You", icon: "👤" },
          {
            id: "responder",
            coordinate: respondentCoordinates,
            title: "Responder",
            icon: selectedType === "ambulance" ? "🚑" : selectedType === "police" ? "🚓" : "🚒",
          },
          {
            id: "facility",
            coordinate: facilityCoordinates,
            title: "Destination",
            icon: "🏥",
          },
        ]}
      />

      {/* Action Buttons */}
      <View className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 space-y-3">
        <ThemedButton
          label="CALL RESPONDER"
          variant="outline"
          icon={<Phone size={20} {...{ color: "#EB0A1E" }} />}
          className="flex-row"
        />
        <ThemedButton
          label="CHAT WITH DISPATCH"
          variant="outline"
          icon={<MessageCircle size={20} {...{ color: "#EB0A1E" }} />}
          className="flex-row"
        />
      </View>
    </View>
  );
}
