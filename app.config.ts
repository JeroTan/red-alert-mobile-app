import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "alertap-mobile-app",
  slug: "alertap-mobile-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "alertapmobileapp",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  extra: {
    eas: {
      projectId: "edd0c1d7-395c-4a61-a11d-b99d82bf14ff",
    },
  },
  ios: {
    bundleIdentifier: "com.toyotamobilitysolutionsph.alertapmobileapp",
    supportsTablet: true,
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "This app needs access to your location to help responders find you during an emergency.",
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    permissions: [
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "FOREGROUND_SERVICE",
    ],
    package: "com.toyotamobilitysolutionsph.alertapmobileapp",
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "@react-native-async-storage/expo-with-async-storage",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/toyota-type/ToyotaType-Regular.otf",
          "./assets/fonts/toyota-type/ToyotaType-Bold.otf",
          "./assets/fonts/toyota-type/ToyotaType-Light.otf",
          "./assets/fonts/toyota-type/ToyotaType-Semibold.otf",
          "./assets/fonts/toyota-type/ToyotaType-Italic.otf",
          "./assets/fonts/toyota-type/ToyotaType-SemiboldIt.otf",
        ],
      },
    ],
  ],
  experiments: {
    typedRoutes: false,
    reactCompiler: true,
  },
});
