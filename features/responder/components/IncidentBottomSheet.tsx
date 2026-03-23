import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  AlertTriangle,
  Ambulance,
  CheckCircle2,
  Flame,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Shield,
  User,
} from "lucide-react-native";
import React, { useMemo } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { Button } from "../../../components/ui/Button";
import { IconButton } from "../../../components/ui/IconButton";
import { ThemedText } from "../../../components/ui/ThemedText";
import type { Incident, ResponderStatus } from "../types";

interface IncidentBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  incident: Incident;
  responderStatus: ResponderStatus;
  onNavigate: () => void;
  onCall: () => void;
  onChat: () => void;
  onMarkOnScene: () => void;
  onRequestBackup: () => void;
  onResolve: () => void;
}

export function IncidentBottomSheet({
  bottomSheetRef,
  incident,
  responderStatus,
  onNavigate,
  onCall,
  onChat,
  onMarkOnScene,
  onRequestBackup,
  onResolve,
}: IncidentBottomSheetProps) {
  const colorScheme = useColorScheme();
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const Icon =
    incident.type === "ambulance"
      ? Ambulance
      : incident.type === "police"
        ? Shield
        : Flame;
  const iconColor =
    incident.type === "ambulance"
      ? "#059669"
      : incident.type === "police"
        ? "#1E40AF"
        : "#B91C1C";
  const iconBg =
    incident.type === "ambulance"
      ? "bg-agency-medical/10"
      : incident.type === "police"
        ? "bg-agency-police/10"
        : "bg-agency-fire/10";

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: "#FFFFFF" }}
      handleIndicatorStyle={{ backgroundColor: "#58595B" }}
    >
      <BottomSheetView className="p-6">
        <View className="flex-row items-center mb-4">
          <View
            className={`w-12 h-12 ${iconBg} rounded-full justify-center items-center mr-4`}
          >
            <Icon size={24} {...{ color: iconColor }} />
          </View>
          <View>
            <ThemedText className="text-xl font-bold uppercase">
              {incident.type} Emergency
            </ThemedText>
            <ThemedText className="text-sm text-brand-gray">
              #{incident.id}
            </ThemedText>
          </View>
        </View>

        <View className="bg-white p-4 rounded-xl mb-6 border border-brand-gray/10">
          <View className="flex-row items-start mb-4">
            <View className="text-brand-gray mr-3 mt-1">
              <MapPin size={20} />
            </View>
            <View className="flex-1">
              <ThemedText className="text-sm font-bold">
                {incident.location}
              </ThemedText>
              <ThemedText className="text-xs text-brand-gray">
                {incident.landmark}
              </ThemedText>
            </View>
          </View>

          <View className="flex-row items-start">
            <View className="text-brand-gray mr-3 mt-1">
              <User size={20} />
            </View>
            <View className="flex-1">
              <ThemedText className="text-sm font-bold">
                {incident.reporter}
              </ThemedText>
              <ThemedText className="text-xs text-brand-gray">
                Reporter | {incident.phone}
              </ThemedText>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <ThemedText className="text-xs font-bold text-brand-gray uppercase mb-2">
            Description
          </ThemedText>
          <ThemedText className="text-brand-black leading-relaxed">
            "{incident.description}"
          </ThemedText>
        </View>

        {/* Action Buttons Section */}
        <View className="flex-row space-x-2 mb-3">
          <TouchableOpacity
            onPress={onNavigate}
            className="flex-1 h-14 bg-brand-primary rounded-xl flex-row justify-center items-center"
          >
            <View className="mr-2">
              <Navigation size={20} {...{ color: "white" }} />
            </View>
            <ThemedText className="text-white font-bold uppercase">
              Navigate
            </ThemedText>
          </TouchableOpacity>
          <IconButton
            onPress={onCall}
            icon={
              <View className="text-brand-primary">
                <Phone size={20} />
              </View>
            }
            className="w-14 h-14 bg-brand-gray/10 rounded-xl"
          />
          <IconButton
            onPress={onChat}
            icon={
              <View className="text-brand-primary">
                <MessageCircle size={20} />
              </View>
            }
            className="w-14 h-14 bg-brand-gray/10 rounded-xl"
          />
        </View>

        {responderStatus === "on-scene" ? (
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={onRequestBackup}
              className="flex-1 h-12 border border-emergency-critical rounded-lg flex-row justify-center items-center"
            >
              <View className="mr-2">
                <AlertTriangle size={18} {...{ color: "#DC2626" }} />
              </View>
              <ThemedText className="text-emergency-critical font-bold uppercase">
                Backup
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onResolve}
              className="flex-1 h-12 bg-emergency-success rounded-lg flex-row justify-center items-center"
            >
              <View className="mr-2">
                <CheckCircle2 size={18} {...{ color: "white" }} />
              </View>
              <ThemedText className="text-white font-bold uppercase">
                Resolved
              </ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <Button
            label="Mark as On Scene"
            variant="active"
            onPress={onMarkOnScene}
            className="w-full h-12"
            textClassName="uppercase"
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}
