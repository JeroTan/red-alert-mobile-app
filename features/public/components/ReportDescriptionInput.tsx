import { ThemedText } from "@/components/ui/ThemedText";
import { View } from "react-native";

export default function ReportDescriptionInput() {
  return (
    <>
      <View>
        <ThemedText className="text-sm font-bold text-app-text-muted uppercase mb-2">
          Description (Optional)
        </ThemedText>
        <View className="p-4 bg-app-background rounded-xl border border-app-background-tertiary h-24">
          <ThemedText className="text-app-text-muted">
            Describe the situation briefly...
          </ThemedText>
        </View>
      </View>
    </>
  );
}
