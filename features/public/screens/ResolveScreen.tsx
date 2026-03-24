import { useRouter } from "expo-router";
import { View } from "react-native";
import { PublicBottomNav } from "../components/PublicBottomNav";
import { PublicHeader } from "../components/PublicHeader";
import { ResolutionSummary } from "../components/ResolutionSummary";
import { usePublicContext } from "../store/PublicContext";

export default function ResolveScreen() {
  const {
    selectedType,
    userCoordinates,
    respondentCoordinates,
    facilityCoordinates,
    trackingProgress,
  } = usePublicContext();
  const router = useRouter();
  return (
    <>
      <PublicHeader
        onBack={() => {
          router.dismiss();
        }}
        hideTitle
      />
      <View className="flex-1 bg-app-background">
        <ResolutionSummary selectedType={selectedType} />
      </View>
      <PublicBottomNav activeTab={null} />
    </>
  );
}
