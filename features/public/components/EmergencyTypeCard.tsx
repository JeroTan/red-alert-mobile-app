import { type LucideIcon } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../../components/ui/ThemedText";
import { cn } from "../../../components/ui/ThemedView";
import type { EmergencyType } from "../types";

interface EmergencyTypeCardProps {
  id: EmergencyType;
  title: string;
  subtitle: string;
  color: string;
  icon: LucideIcon;
  isSelected: boolean;
  onSelect: (type: EmergencyType) => void;
}

export function EmergencyTypeCard({
  id,
  title,
  subtitle,
  color,
  icon: Icon,
  isSelected,
  onSelect,
}: EmergencyTypeCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      className={cn(
        "flex-row items-center p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2",
        isSelected
          ? "border-brand-primary bg-brand-primary/5"
          : "border-transparent",
      )}
    >
      <View
        className={cn(
          "w-12 h-12 rounded-full justify-center items-center mr-4",
          color,
        )}
      >
        <Icon size={24} {...{ color: "white" }} />
      </View>
      <View className="flex-1">
        <ThemedText className="text-lg font-bold">{title}</ThemedText>
        <ThemedText className="text-sm text-gray-500">{subtitle}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}
