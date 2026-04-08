import PublicContextProvider from "@/features/public/store/PublicContext";
import { Slot } from "expo-router";

export default function ReportLayout() {
  return (
    <PublicContextProvider>
      <Slot />
    </PublicContextProvider>
  );
}
