import { Ambulance, Flame, Shield } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Badge } from "../../../components/ui/Badge";
import { Card } from "../../../components/ui/Card";
import { ThemedButton } from "../../../components/ui/ThemedButton";
import { ThemedText } from "../../../components/ui/ThemedText";
import { cn } from "../../../components/ui/ThemedView";
import type { Incident, ResponderStatus } from "../types";

interface IncidentCardProps {
  incident: Incident;
  responderStatus: ResponderStatus;
  incidentAccepted: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function IncidentCard({
  incident,
  responderStatus,
  incidentAccepted,
  onAccept,
  onDecline,
}: IncidentCardProps) {
  const Icon =
    incident.type === "ambulance"
      ? Ambulance
      : incident.type === "police"
        ? Shield
        : Flame;
  const typeColor =
    incident.type === "ambulance"
      ? "border-agency-medical"
      : incident.type === "police"
        ? "border-agency-police"
        : "border-agency-fire";
  const badgeVariant =
    incident.type === "ambulance"
      ? "resolved"
      : incident.type === "police"
        ? "pending"
        : "critical";

  if (!incidentAccepted) {
    return (
      <Card className={cn("border-l-4", typeColor)}>
        <View className="flex-row justify-between items-start mb-2">
          <Badge
            label={`${incident.type} emergency`}
            variant={badgeVariant}
            icon={
              <Icon
                size={14}
                {...{
                  color:
                    badgeVariant === "resolved"
                      ? "#059669"
                      : badgeVariant === "pending"
                        ? "#4F46E5"
                        : "#DC2626",
                }}
              />
            }
          />
          <ThemedText className="text-xs text-gray-400">3 min ago</ThemedText>
        </View>

        <ThemedText className="text-lg font-bold mb-1">
          {incident.location}
        </ThemedText>
        <ThemedText className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {incident.distance} km away | Reporter: {incident.reporter}
        </ThemedText>

        <View className="flex-row space-x-3">
          <ThemedButton label="ACCEPT" onPress={onAccept} className="flex-1" />
          <ThemedButton
            label="DECLINE"
            variant="secondary"
            onPress={onDecline}
            className="flex-1"
          />
        </View>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-brand-primary">
      <View className="flex-row justify-between items-center mb-2">
        <ThemedText className="text-sm font-bold text-brand-primary uppercase">
          Active Incident: #{incident.id}
        </ThemedText>
        {responderStatus === "on-scene" && (
          <Badge label="ON SCENE" variant="active" />
        )}
      </View>
      <ThemedText className="text-lg font-bold mb-1">
        {responderStatus === "on-scene"
          ? `Treating ${incident.reporter}`
          : `En Route to ${incident.reporter}`}
      </ThemedText>
      <ThemedText className="text-sm text-gray-500 dark:text-gray-400">
        {responderStatus === "on-scene"
          ? "Arrived at 8:42 AM"
          : "ETA: 5 min | 2.3 km"}
      </ThemedText>
    </Card>
  );
}
