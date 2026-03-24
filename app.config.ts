import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "red-alert-mobile-app",
  slug: "red-alert-mobile-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "redalertmobileapp",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
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
        android: {
          fonts: [
            {
              fontFamily: "ToyotaType",
              fontDefinitions: [
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Regular.otf",
                  weight: 400,
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Bold.otf",
                  weight: 700,
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Light.otf",
                  weight: 300,
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Semibold.otf",
                  weight: 600,
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Italic.otf",
                  weight: 400,
                  style: "italic",
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-SemiboldIt.otf",
                  weight: 600,
                  style: "italic",
                },
              ],
            },
          ],
        },
        ios: {
          fonts: [
            {
              fontFamily: "ToyotaType",
              fontDefinitions: [
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Regular.otf",
                  weight: 400,
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Bold.otf",
                  weight: 700,
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Light.otf",
                  weight: 300,
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Semibold.otf",
                  weight: 600,
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-Italic.otf",
                  weight: 400,
                  style: "italic",
                },
                {
                  path: "./assets/fonts/toyota-type/ToyotaType-SemiboldIt.otf",
                  weight: 600,
                  style: "italic",
                },
              ],
            },
          ],
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: false,
    reactCompiler: true,
  },
});
