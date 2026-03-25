import { ThemedView } from "@/components/ui/ThemedView";
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PublicContainer({ children }: PropsWithChildren<{}>) {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      className="flex-1"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {children}
    </ThemedView>
  );
}
