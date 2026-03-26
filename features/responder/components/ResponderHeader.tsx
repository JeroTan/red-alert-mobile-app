import { Bell, RefreshCw } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { IconButton } from "../../../components/ui/IconButton";
import { ThemedText } from "../../../components/ui/ThemedText";

interface ResponderHeaderProps {
  onSwitchMode: () => void;
}

export function ResponderHeader({ onSwitchMode }: ResponderHeaderProps) {
  return (
    <View className="h-14 px-4 flex-row justify-between items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <ThemedText className="text-xl font-bold">ALERTAP</ThemedText>
      <View className="flex-row items-center">
        <IconButton
          onPress={onSwitchMode}
          icon={<RefreshCw size={20} {...{ color: "#EB0A1E" }} />}
          className="mr-2"
        />
        <IconButton
          icon={<Bell size={24} {...{ color: "#EB0A1E" }} />}
          className="bg-transparent"
        />
      </View>
    </View>
  );
}
