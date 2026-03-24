import HeaderContainer from "@/components/overlay/HeaderContainer";
import BackButton from "@/components/ready/BackButton";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../../components/ui/ThemedText";

interface PublicHeaderProps {
  hideTitle?: boolean;
  onBack?: () => void;
  onSwitchMode?: () => void;
}

export function PublicHeader({
  hideTitle = false,
  onBack,
  onSwitchMode,
}: PublicHeaderProps) {
  return (
    <HeaderContainer>
      <View className="flex-row items-center flex-1">
        <BackButton hide={onBack == undefined} onBack={onBack} />
        {!hideTitle && (
          <ThemedText className="text-xl font-bold">Red Alert</ThemedText>
        )}
      </View>

      {onSwitchMode != undefined && (
        <TouchableOpacity onPress={onSwitchMode} className="p-2">
          <ThemedText className="font-bold text-brand-primary text-xs uppercase">
            Responder
          </ThemedText>
        </TouchableOpacity>
      )}
    </HeaderContainer>
  );
}
