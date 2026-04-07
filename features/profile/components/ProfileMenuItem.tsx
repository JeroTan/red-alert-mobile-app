import { cn } from "@/components/ui/ThemedView";
import { ChevronRight, LucideIcon } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileMenuItemProps {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
  className?: string;
}

export function ProfileMenuItem({
  icon: Icon,
  label,
  onPress,
  isDestructive = false,
  className,
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "flex-row items-center px-6 py-4 border-b border-app-divider",
        className,
      )}
      activeOpacity={0.7}
    >
      <View
        className={cn(
          "w-10 h-10 rounded-full items-center justify-center mr-4",
          isDestructive ? "bg-emergency-critical/10" : "bg-brand-primary/10",
        )}
      >
        <Icon size={20} {...{ color: isDestructive ? "#DC2626" : "#9CA3AF" }} />
      </View>
      <Text
        className={cn(
          "flex-1 text-base font-toyota-semibold",
          isDestructive ? "text-emergency-critical" : "text-app-text-primary",
        )}
      >
        {label}
      </Text>
      <ChevronRight
        size={20}
        {...{ color: isDestructive ? "#DC2626" : "#9CA3AF" }}
      />
    </TouchableOpacity>
  );
}
