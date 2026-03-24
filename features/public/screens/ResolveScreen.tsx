import { View } from "react-native";
import { PublicBottomNav } from "../components/PublicBottomNav";
import PublicContainer from "../components/PublicContainer";
import { PublicHeader } from "../components/PublicHeader";
import { ResolutionSummary } from "../components/ResolutionSummary";
import { usePublicContext } from "../store/PublicContext";

export default function HomeScreen() {
  const {
    selectedType,
    userCoordinates,
    respondentCoordinates,
    facilityCoordinates,
    trackingProgress,
  } = usePublicContext();
  return (
    <>
      <PublicContainer>
        <PublicHeader onSwitchMode={() => {}} />
        <View className="flex-1 bg-app-background">
          <ResolutionSummary selectedType={selectedType} />
        </View>
        <PublicBottomNav activeTab={null} />
      </PublicContainer>
    </>
  );
}
