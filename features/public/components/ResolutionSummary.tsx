import { CheckCircle2 } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { ThemedButton } from "../../../components/ui/ThemedButton";
import { ThemedText } from "../../../components/ui/ThemedText";
import type { EmergencyType } from "../types";

interface ResolutionSummaryProps {
  selectedType: EmergencyType | null;
}

export function ResolutionSummary({ selectedType }: ResolutionSummaryProps) {
  return (
    <View className="flex-1 justify-center items-center p-6 bg-white dark:bg-black">
      <View className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full justify-center items-center mb-6">
        <CheckCircle2 size={48} {...{ color: "#059669" }} />
      </View>

      <ThemedText className="text-3xl font-black text-emergency-success mb-2">
        RESOLVED
      </ThemedText>
      <ThemedText className="text-gray-500 dark:text-gray-400 text-center mb-10 px-8">
        Thank you for using Red Alert. The incident has been safely resolved by
        our team in Brgy. Zone 1, Tondo.
      </ThemedText>

      <View className="w-full bg-brand-gray/10 p-6 rounded-2xl mb-10 shadow-sm">
        <ThemedText className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">
          Incident Summary
        </ThemedText>
        <View className="space-y-3">
          <View className="flex-row justify-between">
            <ThemedText className="text-gray-500">Type</ThemedText>
            <ThemedText className="font-bold uppercase">
              {selectedType}
            </ThemedText>
          </View>
          <View className="flex-row justify-between">
            <ThemedText className="text-gray-500">Reported</ThemedText>
            <ThemedText className="font-bold">6:31 AM</ThemedText>
          </View>
          <View className="flex-row justify-between">
            <ThemedText className="text-gray-500">Resolved</ThemedText>
            <ThemedText className="font-bold">6:52 AM</ThemedText>
          </View>
          <View className="h-[1px] bg-gray-200 dark:bg-gray-800 my-1" />
          <View className="flex-row justify-between">
            <ThemedText className="text-gray-500">Response Time</ThemedText>
            <ThemedText className="font-bold text-brand-primary">
              21 minutes
            </ThemedText>
          </View>
        </View>
      </View>

      <ThemedButton
        label="Back to Home"
        variant="critical"
        onPress={() => {}}
        className="w-full h-14 shadow-lg"
        textClassName="text-lg uppercase tracking-widest"
      />
    </View>
  );
}
