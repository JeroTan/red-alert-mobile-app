import { ThemedText } from "@/components/ui/ThemedText";
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react-native";
import { createContext, PropsWithChildren, useContext } from "react";
import { View } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { ToastType } from "toastify-react-native/utils/interfaces";

export type ToastContextType = {
  showToast: (props: {
    message: string;
    type?: ToastType;
    duration?: number;
    position?: "top" | "bottom";
  }) => void;
};

export const ToastContext = createContext<ToastContextType>(null!);

const toastConfig = {
  success: ({ text1 }: { text1: string }) => (
    <View className="px-4 py-3 rounded-lg bg-app-background flex-row items-start shadow-lg">
      <View className="mr-3 text-emergency-success">
        <CircleCheck />
      </View>
      <View className="flex-1">
        <ThemedText className="font-medium text-app-text-primary">
          {text1}
        </ThemedText>
      </View>
    </View>
  ),
  error: (props: { text1: string }) => {
    return (
      <View className="px-4 py-3 rounded-lg bg-app-background flex-row items-start shadow-lg">
        <View className="mr-3 text-emergency-critical">
          <CircleX />
        </View>
        <View className="flex-1">
          <ThemedText className="font-medium text-app-text-primary">
            {props.text1}
          </ThemedText>
        </View>
      </View>
    );
  },
  info: ({ text1 }: { text1: string }) => (
    <View className="px-4 py-3 rounded-lg bg-app-background flex-row items-start shadow-lg">
      <View className="mr-3 text-emergency-info">
        <Info />
      </View>
      <View className="flex-1">
        <ThemedText className="font-medium text-app-text-primary">
          {text1}
        </ThemedText>
      </View>
    </View>
  ),
  warning: ({ text1 }: { text1: string }) => (
    <View className="px-4 py-3 rounded-lg bg-app-background flex-row items-start shadow-lg">
      <View className="mr-3 text-emergency-warning">
        <TriangleAlert />
      </View>
      <View className="flex-1">
        <ThemedText className="font-medium text-app-text-primary">
          {text1}
        </ThemedText>
      </View>
    </View>
  ),
};

export function ToastContextProvider({ children }: PropsWithChildren<{}>) {
  const showToast = (props: {
    message: string;
    type?: ToastType;
    duration?: number;
    position?: "top" | "bottom";
  }) => {
    Toast.show({
      type: props.type || "success",
      position: props.position || "bottom",
      visibilityTime: props.duration ?? 4000,
      autoHide: props.duration !== 0,
      text1: props.message,
    });
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      {children}
      <ToastManager config={toastConfig} />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToastContext must be used within a ToastContextProvider",
    );
  }
  return context;
}
