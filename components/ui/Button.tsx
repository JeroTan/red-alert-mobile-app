import React from 'react';
import { TouchableOpacity, Text, View, type TouchableOpacityProps } from 'react-native';
import { cn } from './ThemedView';

interface ButtonProps extends TouchableOpacityProps {
  className?: string;
  textClassName?: string;
  variant?: 'primary' | 'secondary' | 'critical' | 'success' | 'active' | 'outline' | 'ghost';
  label: string;
  icon?: React.ReactNode;
}

export function Button({ 
  className, 
  textClassName, 
  variant = 'primary', 
  label, 
  icon,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-brand-primary',
    secondary: 'bg-brand-gray/10',
    critical: 'bg-emergency-critical',
    success: 'bg-emergency-success',
    active: 'bg-emergency-warning',
    outline: 'border border-brand-primary bg-transparent',
    ghost: 'bg-transparent',
  };

  const textVariants = {
    primary: 'text-white uppercase font-bold',
    secondary: 'text-brand-gray',
    critical: 'text-white font-bold',
    success: 'text-white font-bold',
    active: 'text-white font-bold',
    outline: 'text-brand-primary font-bold',
    ghost: 'text-brand-primary font-bold',
  };

  return (
    <TouchableOpacity
      className={cn(
        "h-14 rounded-lg flex-row justify-center items-center px-6", // 56px height
        variants[variant],
        className
      )}
      activeOpacity={0.7}
      {...props}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className={cn("text-base", textVariants[variant], textClassName)}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
