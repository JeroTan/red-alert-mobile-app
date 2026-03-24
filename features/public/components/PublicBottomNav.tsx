import { Link } from "expo-router";
import { Home, Settings, User } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { cn } from "../../../components/ui/ThemedView";

interface PublicBottomNavProps {
  activeTab: "home" | "profile" | "settings" | null;
}

export function PublicBottomNav({ activeTab }: PublicBottomNavProps) {
  return (
    <View className="flex-row border-t border-app-background-secondary py-4 bg-app-background px-12 justify-between items-center">
      <Link href="/public/profile" className="items-center" asChild>
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
      </Link>

      <Link href="/public/home" asChild className="items-center">
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
      </Link>

      <Link href="/public/settings" asChild className="items-center">
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
      </Link>
    </View>
  );
}
