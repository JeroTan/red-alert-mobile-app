import { View } from "react-native";
import { PublicBottomNav } from "../components/PublicBottomNav";
import PublicContainer from "../components/PublicContainer";
import { PublicHeader } from "../components/PublicHeader";

export default function HomeScreen() {
  return (
    <>
      <PublicContainer>
        <PublicHeader onBack={() => {}} hideTitle />
        <View className="flex-1 bg-app-background"></View>
        <PublicBottomNav activeTab={"home"} />
      </PublicContainer>
    </>
  );
}
