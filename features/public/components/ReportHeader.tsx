import { ThemedText } from "@/components/ui/ThemedText";
import { cn } from "@/components/ui/ThemedView";
import { View } from "react-native";
import { usePublicContext } from "../store/PublicContext";

const badgeColor = {
  police: "bg-agency-police",
  ambulance: "bg-agency-medical",
  fire: "bg-agency-fire",
} as const;

export default function ReportHeader() {
  const { selectedType } = usePublicContext();
  return (
    <>
      <View className="flex-row justify-between items-center mb-6">
        <ThemedText className="text-2xl font-bold">Report Details</ThemedText>
        <View className="flex flex-row gap-2 items-center">
          <View
            className={cn(
              "size-2 rounded-full",
              selectedType ? badgeColor[selectedType] : null,
            )}
          ></View>
          <ThemedText className=" text-app-text-primary text-xs font-bold uppercase">
            {selectedType}
          </ThemedText>
        </View>
      </View>
    </>
  );
}
