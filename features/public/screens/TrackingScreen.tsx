import { useRouter } from "expo-router";
import { View } from "react-native";
import { PublicBottomNav } from "../components/PublicBottomNav";
import { PublicHeader } from "../components/PublicHeader";
import { TrackingView } from "../components/TrackingView";
import { usePublicContext } from "../store/PublicContext";

export default function TrackingScreen() {
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
        {userCoordinates && respondentCoordinates && facilityCoordinates && (
          <TrackingView
            selectedType={selectedType}
            progress={trackingProgress}
            userCoordinates={userCoordinates}
            respondentCoordinates={respondentCoordinates}
            facilityCoordinates={facilityCoordinates}
          />
        )}
      </View>
      <PublicBottomNav activeTab={null} />
    </>
  );
}
