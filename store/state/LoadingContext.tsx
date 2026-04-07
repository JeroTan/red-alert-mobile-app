import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";

type LoadingContextType = {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType>(null!);

export function LoadingProvider({ children }: PropsWithChildren) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Loading...");

  const showLoading = (msg = "Loading...") => {
    setMessage(msg);
    setVisible(true);
  };

  const hideLoading = () => setVisible(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <Modal visible={visible} transparent animationType="fade">
        <View className="flex-1 bg-black/50 items-center justify-center">
          <View className="bg-app-background rounded-2xl px-10 py-8 items-center gap-4">
            <ActivityIndicator size="large" color="#CC0000" />
            <Text className="text-base font-toyota text-app-text-primary">
              {message}
            </Text>
          </View>
        </View>
      </Modal>
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
