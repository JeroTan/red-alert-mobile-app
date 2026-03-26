import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { Link } from "expo-router";
import { Home } from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";
import { LoginForm } from "../registration/LoginForm";

export default function LoginScreen() {
  return (
    <ThemedView className="flex-1">
      <View className="py-6 px-6">
        <Link href="/" className="flex flex-row gap-x-2">
          <View className=" text-app-text-primary">
            <Home size={21} />
          </View>
          <ThemedText>Go back to home</ThemedText>
        </Link>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center py-12">
          {/* Brand Header */}
          <View className="mb-12 items-center">
            <View className="w-20 h-20 bg-brand-primary rounded-3xl justify-center items-center mb-4 shadow-xl">
              <ThemedText className="text-white text-4xl font-black">
                A
              </ThemedText>
            </View>
            <ThemedText className="text-4xl font-black tracking-tighter">
              ALERT<ThemedText className="text-brand-primary">AP</ThemedText>
            </ThemedText>
            <ThemedText className="text-app-text-secondary font-medium mt-1">
              Emergency Response Platform
            </ThemedText>
          </View>

          {/* Login Form */}
          <LoginForm />
        </View>
      </ScrollView>
    </ThemedView>
  );
}
