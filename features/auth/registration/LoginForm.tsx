import { signInWithPassword } from "@/adapter/application/validation/signInWithPassword";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedText } from "@/components/ui/ThemedText";
import { cn } from "@/components/ui/ThemedView";
import { useToastContext } from "@/store/state/ToastProviderContext";
import { colors } from "@/style/colors";
import { LogicError } from "@/utilities/error/LogicError";
import { Link, useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import React, { useState, useTransition } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useAuthContext } from "../store/AuthProvider";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const { setIsLoggedIn } = useAuthContext();
  const { showToast } = useToastContext();
  const router = useRouter();

  const handleLogin = () => {
    startTransition(async () => {
      const apiResult = await signInWithPassword({ email, password });

      if (apiResult.error) {
        console.error("Login failed:", apiResult.error);
        if (apiResult.error instanceof LogicError) {
          showToast({
            message: apiResult.error.data,
            type: "error",
            duration: 5000,
            position: "bottom",
          });
        }
        return;
      }
      setIsLoggedIn(true);
      router.push("/"); // Navigate to the home screen after successful login
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
        {/* Email Input */}
        <View className="space-y-2">
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
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
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
              placeholder="Enter your password"
              placeholderTextColor={colors.light.text.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="mt-2 self-end" disabled={isPending}>
          <ThemedText className="text-brand-primary font-bold text-sm">
            Forgot Password?
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <View className="mt-8">
        <ThemedButton
          label={isPending ? "SIGNING IN..." : "SIGN IN"}
          variant="critical"
          onPress={handleLogin}
          disabled={isPending}
          className="h-14 shadow-lg"
          textClassName="text-lg uppercase tracking-widest"
        />
      </View>

      {/* Register Link */}
      <View className="flex-row justify-center items-center mt-6">
        <ThemedText className="text-app-text-secondary">
          Don't have an account?{" "}
        </ThemedText>
        <Link href="/auth/registration" asChild disabled={isPending}>
          <TouchableOpacity disabled={isPending}>
            <ThemedText className="text-brand-primary font-bold">
              Register Now
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
