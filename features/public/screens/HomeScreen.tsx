import { useRouter } from "expo-router";
import { View } from "react-native";
import { PublicBottomNav } from "../components/PublicBottomNav";
import { PublicHeader } from "../components/PublicHeader";
import { SOSButton } from "../components/SOSButton";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <>
      <PublicHeader onSwitchMode={() => {}} />
      <View className="flex-1 bg-app-background">
        <SOSButton
          onPress={() => {
            router.push("/public/report/incident-selection");
          }}
        />
      </View>
      <PublicBottomNav activeTab={"home"} />
    </>
  );
}
