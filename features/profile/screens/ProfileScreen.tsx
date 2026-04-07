import { getUserData } from "@/adapter/application/auth/getUserData";
import { logoutUser } from "@/adapter/application/auth/logoutUser";
import AlertUniversal from "@/components/overlay/AlertUniversal";
import { useAuthContext } from "@/features/auth/store/AuthProvider";
import { PublicBottomNav } from "@/features/public/components/PublicBottomNav";
import PublicContainer from "@/features/public/components/PublicContainer";
import { PublicHeader } from "@/features/public/components/PublicHeader";
import { useLoading } from "@/store/state/LoadingContext";
import { useRouter } from "expo-router";
import { Bell, Info, LogOut, Phone, Shield, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ProfileMenuItem } from "../components/ProfileMenuItem";

export default function ProfileScreen() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthContext();
  const { showLoading, hideLoading } = useLoading();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loadSession = async () => {
      try {
        const user = await getUserData();
        setUserName(`${user.first_name.value} ${user.last_name.value}`);
        setUserEmail(user.email.value);
      } catch (error) {
        console.log("No active session found or error loading session");
      }
    };
    loadSession();
  }, []);

  const handleLogout = async () => {
    AlertUniversal("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          showLoading("Logging out...");
          try {
            await logoutUser();
            setIsLoggedIn(false);
            router.replace("/auth");
          } catch (error) {
            console.error("Logout failed:", error);
            // Fallback: even if API logout fails, clear local state
            setIsLoggedIn(false);
            router.replace("/auth");
          } finally {
            hideLoading();
          }
        },
      },
    ]);
  };

  const handlePlaceholder = (feature: string) => {
    AlertUniversal("Coming Soon", `${feature} feature will be available soon.`);
  };

  return (
    <PublicContainer>
      <PublicHeader onSwitchMode={() => {}} />
      <ScrollView className="flex-1 bg-app-background-secondary">
        {/* Profile Header */}
        <View className="bg-app-background px-6 py-8 items-center border-b border-app-divider">
          <View className="w-20 h-20 bg-brand-primary rounded-full items-center justify-center mb-4">
            <User size={40} {...{ color: "white" }} />
          </View>
          <Text className="text-xl font-toyota-bold text-app-text-primary">
            {userName}
          </Text>
          <Text className="text-sm font-toyota text-app-text-secondary">
            {userEmail}
          </Text>
        </View>

        {/* Menu Items */}
        <View className="mt-4 bg-app-background">
          <ProfileMenuItem
            icon={User}
            label="Account Information"
            onPress={() => handlePlaceholder("Account Information")}
          />
          <ProfileMenuItem
            icon={Phone}
            label="Emergency Contacts"
            onPress={() => handlePlaceholder("Emergency Contacts")}
          />
          <ProfileMenuItem
            icon={Shield}
            label="Privacy & Security"
            onPress={() => handlePlaceholder("Privacy & Security")}
          />
          <ProfileMenuItem
            icon={Bell}
            label="Notifications"
            onPress={() => handlePlaceholder("Notifications")}
          />
          <ProfileMenuItem
            icon={Info}
            label="About Toyota Mobility"
            onPress={() => handlePlaceholder("About Toyota Mobility")}
          />
        </View>

        {/* Logout Section */}
        <View className="mt-4 bg-app-background mb-8">
          <ProfileMenuItem
            icon={LogOut}
            label="Logout"
            onPress={handleLogout}
            isDestructive={true}
          />
        </View>
      </ScrollView>
      <PublicBottomNav activeTab="profile" />
    </PublicContainer>
  );
}
