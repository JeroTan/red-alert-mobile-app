import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export default function BackButton({
  hide = false,
  onBack,
}: {
  hide?: boolean;
  onBack?: () => void;
}) {
  return (
    <>
      {!hide && (
        <TouchableOpacity onPress={onBack} className="mr-3 p-1">
          <View className="text-app-text-primary -rotate-90">
            <ArrowLeft size={20} />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}
