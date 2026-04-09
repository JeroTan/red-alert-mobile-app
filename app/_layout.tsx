//@ts-ignore
import "../style/global.css";

import AuthContextProvider from "@/features/auth/store/AuthProvider";
import { useCheckCurrentAuth } from "@/hooks/useCheckCurrentAuth";
import { useToyotaFonts } from "@/hooks/useToyotaFonts";
import { LoadingProvider } from "@/store/state/LoadingContext";
import { ToastContextProvider } from "@/store/state/ToastProviderContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const fontResult = useToyotaFonts();
  if (!fontResult) {
    return null; // Render nothing, splash screen is visible
  }
  const authResult = useCheckCurrentAuth();
  if (authResult === null) {
    return null; // Render nothing, splash screen is visible
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AuthContextProvider>
            <ThemeProvider value={DefaultTheme}>
              <ToastContextProvider>
                <LoadingProvider>
                  <ScreenStack />
                  <StatusBar style="dark" hidden />
                </LoadingProvider>
              </ToastContextProvider>
            </ThemeProvider>
          </AuthContextProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function ScreenStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="responder" />
      <Stack.Screen name="public/report" />
    </Stack>
  );
}
