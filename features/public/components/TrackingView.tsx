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
import { Button } from "../../../components/ui/Button";
import { Map } from "../../../components/ui/Map";
import { ThemedText } from "../../../components/ui/ThemedText";
import { cn } from "../../../components/ui/ThemedView";
import type { EmergencyType } from "../types";

interface TrackingViewProps {
  selectedType: EmergencyType | null;
  progress: number;
  userLoc: { latitude: number; longitude: number };
  responderLoc: { latitude: number; longitude: number };
  hospitalLoc: { latitude: number; longitude: number };
}

export function TrackingView({
  selectedType,
  progress,
  userLoc,
  responderLoc,
  hospitalLoc,
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
          ...userLoc,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        markers={[
          { id: "user", coordinate: userLoc, title: "You" },
          {
            id: "responder",
            coordinate: responderLoc,
            title: "Responder",
            icon: (
              <View className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-brand-primary">
                <Icon size={20} {...{ color: "#EB0A1E" }} />
              </View>
            ),
          },
          {
            id: "hospital",
            coordinate: hospitalLoc,
            title: "Destination",
            icon: (
              <View className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-emergency-success">
                <Home size={20} {...{ color: "#059669" }} />
              </View>
            ),
          },
        ]}
      />

      {/* Action Buttons */}
      <View className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 space-y-3">
        <Button
          label="CALL RESPONDER"
          variant="outline"
          icon={<Phone size={20} {...{ color: "#EB0A1E" }} />}
          className="flex-row"
        />
        <Button
          label="CHAT WITH DISPATCH"
          variant="outline"
          icon={<MessageCircle size={20} {...{ color: "#EB0A1E" }} />}
          className="flex-row"
        />
      </View>
    </View>
  );
}
