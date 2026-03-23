import { Home, Settings, User } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "../../../components/ui/ThemedView";

interface PublicBottomNavProps {
  activeTab: "home" | "profile" | "settings";
  onTabPress: (tab: "home" | "profile" | "settings") => void;
}

export function PublicBottomNav({
  activeTab,
  onTabPress,
}: PublicBottomNavProps) {
  return (
    <View className="flex-row border-t border-gray-200 py-4 bg-white px-12 justify-between items-center">
      <TouchableOpacity
        onPress={() => onTabPress("profile")}
        className="items-center"
      >
        <User
          size={24}
          {...{ color: activeTab === "profile" ? "#EB0A1E" : "#58595B" }}
        />
        <Text
          className={cn(
            "text-[10px] mt-1 uppercase font-bold",
            activeTab === "profile" ? "text-brand-primary" : "text-gray-400",
          )}
        >
          Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTabPress("home")}
        className="items-center"
      >
        <View
          className={cn(
            "p-2 rounded-full",
            activeTab === "home" ? "bg-brand-primary/10" : "",
          )}
        >
          <Home
            size={26}
            {...{ color: activeTab === "home" ? "#EB0A1E" : "#58595B" }}
          />
        </View>
        <Text
          className={cn(
            "text-[10px] mt-1 uppercase font-black",
            activeTab === "home" ? "text-brand-primary" : "text-gray-400",
          )}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTabPress("settings")}
        className="items-center"
      >
        <Settings
          size={24}
          {...{ color: activeTab === "settings" ? "#EB0A1E" : "#58595B" }}
        />
        <Text
          className={cn(
            "text-[10px] mt-1 uppercase font-bold",
            activeTab === "settings" ? "text-brand-primary" : "text-gray-400",
          )}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}
