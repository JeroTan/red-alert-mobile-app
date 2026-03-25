import { useRouter } from "expo-router";
import { View } from "react-native";
import { PublicBottomNav } from "../components/PublicBottomNav";
import PublicContainer from "../components/PublicContainer";
import { PublicHeader } from "../components/PublicHeader";
import { SOSButton } from "../components/SOSButton";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <PublicContainer>
      <PublicHeader onSwitchMode={() => {}} />
      <View className="flex-1 bg-app-background">
        <SOSButton
          onPress={() => {
            router.push("/public/report/incident-selection");
          }}
        />
      </View>
      <PublicBottomNav activeTab={"home"} />
    </PublicContainer>
  );
}
