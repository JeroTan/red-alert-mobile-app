import { PropsWithChildren } from "react";
import { View } from "react-native";

export default function HeaderContainer({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <View className="h-14 px-4 flex-row justify-between items-center border-b border-app-background-secondary bg-app-background">
        {children}
      </View>
    </>
  );
}
