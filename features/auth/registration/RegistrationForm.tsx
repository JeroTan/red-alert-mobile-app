import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedText } from "@/components/ui/ThemedText";
import { cn } from "@/components/ui/ThemedView";
import { colors } from "@/style/colors";
import { Link } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";
import React, { useState, useTransition } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  // State for validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = () => {
    startTransition(async () => {
      // 1. Here we need to validate data using a validator or zod
      // Example:
      // const validationResult = registrationValidator.safeParse({ name, email, password, confirmPassword });
      // if (!validationResult.success) { ... }

      // 2. Here we need to call the register function from auth repo
      // Example: const result = await authRepo.signUp(name, email, password);
      console.log("Registration attempted for:", email);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
  };

  return (
    <View
      className="w-full space-y-6"
      style={{
        opacity: isPending ? 0.7 : 1,
        pointerEvents: isPending ? "none" : "auto",
      }}
    >
      <View className="space-y-4">
        {/* Full Name Input */}
        <View className="space-y-2">
          <ThemedText className="text-sm font-bold text-app-text-secondary uppercase mb-1">
            Full Name
          </ThemedText>
          <View
            className={cn(
              "flex-row items-center bg-app-background-secondary border border-app-divider rounded-xl px-4 h-14 transition-colors focus-within:border-brand-primary",
            )}
          >
            <User size={20} {...{ color: colors.light.text.muted }} />
            <TextInput
              editable={!isPending}
              className="flex-1 ml-3 text-app-text-primary font-toyota h-full outline-none"
              placeholder="Enter your full name"
              placeholderTextColor={colors.light.text.muted}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
            />
          </View>
          {errors.name ? (
            <ThemedText className="text-emergency-critical text-xs font-bold ml-1 mt-1">
              {errors.name}
            </ThemedText>
          ) : null}
        </View>

        {/* Email Input */}
        <View className="space-y-2 mt-4">
          <ThemedText className="text-sm font-bold text-app-text-secondary uppercase mb-1">
            Email Address
          </ThemedText>
          <View
            className={cn(
              "flex-row items-center bg-app-background-secondary border border-app-divider rounded-xl px-4 h-14 transition-colors focus-within:border-brand-primary",
            )}
          >
            <Mail size={20} {...{ color: colors.light.text.muted }} />
            <TextInput
              editable={!isPending}
              className="flex-1 ml-3 text-app-text-primary font-toyota h-full outline-none"
              placeholder="Enter your email"
              placeholderTextColor={colors.light.text.muted}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {errors.email ? (
            <ThemedText className="text-emergency-critical text-xs font-bold ml-1 mt-1">
              {errors.email}
            </ThemedText>
          ) : null}
        </View>

        {/* Password Input */}
        <View className="space-y-2 mt-4">
          <ThemedText className="text-sm font-bold text-app-text-secondary uppercase mb-1">
            Password
          </ThemedText>
          <View
            className={cn(
              "flex-row items-center bg-app-background-secondary border border-app-divider rounded-xl px-4 h-14 transition-colors focus-within:border-brand-primary",
            )}
          >
            <Lock size={20} {...{ color: colors.light.text.muted }} />
            <TextInput
              editable={!isPending}
              className="flex-1 ml-3 text-app-text-primary font-toyota h-full outline-none"
              placeholder="Create a password"
              placeholderTextColor={colors.light.text.muted}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              secureTextEntry
            />
          </View>
          {errors.password ? (
            <ThemedText className="text-emergency-critical text-xs font-bold ml-1 mt-1">
              {errors.password}
            </ThemedText>
          ) : null}
        </View>

        {/* Confirm Password Input */}
        <View className="space-y-2 mt-4">
          <ThemedText className="text-sm font-bold text-app-text-secondary uppercase mb-1">
            Confirm Password
          </ThemedText>
          <View
            className={cn(
              "flex-row items-center bg-app-background-secondary border border-app-divider rounded-xl px-4 h-14 transition-colors focus-within:border-brand-primary",
            )}
          >
            <Lock size={20} {...{ color: colors.light.text.muted }} />
            <TextInput
              editable={!isPending}
              className="flex-1 ml-3 text-app-text-primary font-toyota h-full outline-none"
              placeholder="Confirm your password"
              placeholderTextColor={colors.light.text.muted}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: "" });
              }}
              secureTextEntry
            />
          </View>
          {errors.confirmPassword ? (
            <ThemedText className="text-emergency-critical text-xs font-bold ml-1 mt-1">
              {errors.confirmPassword}
            </ThemedText>
          ) : null}
        </View>
      </View>

      {/* Register Button */}
      <View className="mt-8">
        <ThemedButton
          label={isPending ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          variant="critical"
          onPress={handleRegister}
          disabled={isPending}
          className="h-14 shadow-lg"
          textClassName="text-lg uppercase tracking-widest"
        />
      </View>

      {/* Login Link */}
      <View className="flex-row justify-center items-center mt-6">
        <ThemedText className="text-app-text-secondary">
          Already have an account?{" "}
        </ThemedText>
        <Link href="/auth" asChild disabled={isPending}>
          <TouchableOpacity disabled={isPending}>
            <ThemedText className="text-brand-primary font-bold">
              Sign In
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
