import AuthContextProvider from "@/features/auth/store/AuthProvider";
import StackGuardedRouting from "@/features/stack-guard/StackGuardedRouting";
import { useCheckCurrentAuth } from "@/hooks/useCheckCurrentAuth";
import { useToyotaFonts } from "@/hooks/useToyotaFonts";
import { AppModeProvider } from "@/store/state/AppModeContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../style/global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
            <AppModeProvider>
              <ThemeProvider value={DefaultTheme}>
                <StackGuardedRouting />
                <StatusBar style="dark" />
              </ThemeProvider>
            </AppModeProvider>
          </AuthContextProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
