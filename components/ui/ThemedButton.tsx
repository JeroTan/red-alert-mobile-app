import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from "react-native";
import { cn } from "./ThemedView";

interface ButtonProps extends TouchableOpacityProps {
  className?: string;
  textClassName?: string;
  variant?:
    | "primary"
    | "secondary"
    | "critical"
    | "success"
    | "active"
    | "outline"
    | "ghost";
  label: string;
  icon?: React.ReactNode;
}

export function ThemedButton({
  className,
  textClassName,
  variant = "primary",
  label,
  icon,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-brand-primary",
    secondary: "bg-brand-gray/10",
    critical: "bg-emergency-critical",
    success: "bg-emergency-success",
    active: "bg-emergency-warning",
    outline: "border border-brand-primary bg-transparent",
    ghost: "bg-transparent",
  };

  const textVariants = {
    primary: "text-white uppercase font-bold",
    secondary: "text-brand-gray",
    critical: "text-white font-bold",
    success: "text-white font-bold",
    active: "text-white font-bold",
    outline: "text-brand-primary font-bold",
    ghost: "text-brand-primary font-bold",
  };

  const disabledStyles = disabled
    ? "bg-app-background-mute opacity-50 cursor-not-allowed"
    : "";

  const textDisabledStyles = disabled ? "text-app-text-muted" : "";

  return (
    <TouchableOpacity
      className={cn(
        "h-14 rounded-lg flex-row justify-center items-center px-6", // 56px height
        disabledStyles || variants[variant],
        className,
      )}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
      {...props}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text
        className={cn(
          "text-base",
          textVariants[variant],
          textDisabledStyles,
          textClassName,
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
