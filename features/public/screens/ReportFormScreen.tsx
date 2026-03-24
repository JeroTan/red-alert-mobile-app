import { View } from "react-native";
import { PublicBottomNav } from "../components/PublicBottomNav";
import PublicContainer from "../components/PublicContainer";
import { PublicHeader } from "../components/PublicHeader";
import { ReportForm } from "../components/ReportForm";
import { usePublicContext } from "../store/PublicContext";

export default function HomeScreen() {
  const { selectedType, setSelectedType, handleSubmitReport } =
    usePublicContext();
  return (
    <>
      <PublicContainer>
        <PublicHeader onSwitchMode={() => {}} />
        <View className="flex-1 bg-app-background">
          <ReportForm
            selectedType={selectedType}
            onSubmit={handleSubmitReport}
          />
        </View>
        <PublicBottomNav activeTab={null} />
      </PublicContainer>
    </>
  );
}
