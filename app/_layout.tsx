import { useCheckCurrentAuth } from "@/hooks/useCheckCurrentAuth";
import { Stack } from "expo-router";
import "../style/global.css";

export default function RootLayout() {
  // const fontResult = useToyotaFonts();
  // if (!fontResult) {
  //   return null; // Render nothing, splash screen is visible
  // }
  const authResult = useCheckCurrentAuth();
  if (authResult === null) {
    return null; // Render nothing, splash screen is visible
  }

  return <Stack />;
}
