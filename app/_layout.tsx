import { useFonts, FontDisplay } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState, createContext, useContext, useCallback } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../style/global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Temporary App Mode Context for UI Testing
type AppMode = "public" | "responder";
interface AppModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export function useAppMode() {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error("useAppMode must be used within an AppModeProvider");
  }
  return context;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "ToyotaType": {
      uri: require("../assets/fonts/toyota-type/ToyotaType-Regular.otf"),
      display: FontDisplay.SWAP,
    },
    "ToyotaType-Bold": {
      uri: require("../assets/fonts/toyota-type/ToyotaType-Bold.otf"),
      display: FontDisplay.SWAP,
    },
    "ToyotaType-Light": {
      uri: require("../assets/fonts/toyota-type/ToyotaType-Light.otf"),
      display: FontDisplay.SWAP,
    },
    "ToyotaType-Semibold": {
      uri: require("../assets/fonts/toyota-type/ToyotaType-Semibold.otf"),
      display: FontDisplay.SWAP,
    },
    "ToyotaType-Italic": {
      uri: require("../assets/fonts/toyota-type/ToyotaType-Italic.otf"),
      display: FontDisplay.SWAP,
    },
  });
  
  const [mode, setMode] = useState<AppMode>("public");

  useEffect(() => {
    if (fontError) {
      console.error("Font loading error:", fontError);
    }
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // Render nothing, splash screen is visible
  }
  
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AppModeContext.Provider value={{ mode, setMode }}>
            <ThemeProvider value={DefaultTheme}>
              <Stack screenOptions={{ headerShown: false }} />
              <StatusBar style="dark" />
            </ThemeProvider>
          </AppModeContext.Provider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
