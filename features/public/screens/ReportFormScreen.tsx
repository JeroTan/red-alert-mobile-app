import { useRouter } from "expo-router";
import { View } from "react-native";
import { PublicBottomNav } from "../components/PublicBottomNav";
import { PublicHeader } from "../components/PublicHeader";
import { ReportForm } from "../components/ReportForm";
import { usePublicContext } from "../store/PublicContext";

export default function ReportFormScreen() {
  const { selectedType, setSelectedType, handleSubmitReport } =
    usePublicContext();
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
        <ReportForm selectedType={selectedType} onSubmit={handleSubmitReport} />
      </View>
      <PublicBottomNav activeTab={null} />
    </>
  );
}
