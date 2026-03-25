import { useRouter } from "expo-router";
import { View } from "react-native";
import { PublicBottomNav } from "../components/PublicBottomNav";
import PublicContainer from "../components/PublicContainer";
import { PublicHeader } from "../components/PublicHeader";
import { ReportForm } from "../components/ReportForm";
import { usePublicContext } from "../store/PublicContext";

export default function ReportFormScreen() {
  const { handleSubmitReport } = usePublicContext();
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
        <ReportForm onSubmit={handleSubmitReport} />
      </View>
      <PublicBottomNav activeTab={null} />
    </PublicContainer>
  );
}
