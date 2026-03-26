import BackButton from "@/components/ready/BackButton";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import RegistrationForm from "../registration/RegistrationForm";

export default function RegistrationScreen() {
  const router = useRouter();

  return (
    <ThemedView className="flex-1">
      {/* Custom Header with Back Button */}
      <View className="pt-7 px-4 pb-4 flex-row items-center">
        <BackButton onBack={() => router.back()} />
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="py-8">
          {/* Form Header */}
          <View className="mb-8">
            <ThemedText className="text-3xl font-black">
              Join{" "}
              <ThemedText className="text-brand-primary">ALERTAP</ThemedText>
            </ThemedText>
            <ThemedText className="text-app-text-secondary font-medium mt-2">
              Help make your community safer by joining the emergency response
              network.
            </ThemedText>
          </View>

          {/* Registration Form */}
          <RegistrationForm />
        </View>
      </ScrollView>
    </ThemedView>
  );
}
