import { ThemedText } from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";
import { Ambulance, Flame, Shield } from "lucide-react-native";
import { View } from "react-native";
import { EmergencyTypeCard } from "../components/EmergencyTypeCard";
import { PublicBottomNav } from "../components/PublicBottomNav";
import PublicContainer from "../components/PublicContainer";
import { PublicHeader } from "../components/PublicHeader";
import { usePublicContext } from "../store/PublicContext";

export default function IncidentSelectionScreen() {
  const { selectedType, setSelectedType } = usePublicContext();
  const router = useRouter();
  return (
    <PublicContainer>
      <PublicHeader
        onBack={() => {
          router.dismiss();
        }}
        hideTitle
      />
      <View className="flex-1 bg-app-background">
        <View className="p-6">
          <ThemedText className="text-2xl font-bold mb-2">
            What's the emergency?
          </ThemedText>
          <ThemedText className="text-gray-500 dark:text-gray-400 mb-8">
            Select a type to help us dispatch the right team.
          </ThemedText>

          <View className="flex flex-col gap-4">
            <EmergencyTypeCard
              id="police"
              title="POLICE"
              subtitle="Crime, Theft, Danger"
              color="bg-agency-police"
              icon={Shield}
              isSelected={selectedType === "police"}
              onSelect={(type) => {
                setSelectedType(type);
                router.navigate("/public/report/form");
              }}
            />
            <EmergencyTypeCard
              id="ambulance"
              title="AMBULANCE"
              subtitle="Medical, Injury, Accident"
              color="bg-agency-medical"
              icon={Ambulance}
              isSelected={selectedType === "ambulance"}
              onSelect={(type) => {
                setSelectedType(type);
                router.navigate("/public/report/form");
              }}
            />
            <EmergencyTypeCard
              id="fire"
              title="FIRE"
              subtitle="Fire, Gas Leak, Explosion"
              color="bg-agency-fire"
              icon={Flame}
              isSelected={selectedType === "fire"}
              onSelect={(type) => {
                setSelectedType(type);
                router.navigate("/public/report/form");
              }}
            />
          </View>
        </View>
      </View>
      <PublicBottomNav activeTab={null} />
    </PublicContainer>
  );
}
