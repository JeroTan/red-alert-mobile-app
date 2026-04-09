import { FontDisplay, useFonts } from "expo-font";
import { SplashScreen } from "expo-router/build/exports";
import { useEffect } from "react";
import { Platform } from "react-native";

export function useToyotaFonts() {
  if(Platform.OS !== "web"){
    return true;
  }


  const [fontsLoaded, fontError] = useFonts({
    ToyotaType: {
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
  return true;
}
