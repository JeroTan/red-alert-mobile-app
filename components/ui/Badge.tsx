import React from 'react';
import { View, Text } from 'react-native';
import { cn } from './ThemedView';

interface BadgeProps {
  label: string;
  variant?: 'critical' | 'active' | 'resolved' | 'pending';
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({ label, variant = 'pending', className, icon }: BadgeProps) {
  const variants = {
    critical: 'bg-[#FEE2E2]', // Critical Red light background
    active: 'bg-[#FEF3C7]', // Warning Amber light background
    resolved: 'bg-[#D1FAE5]', // Success Green light background
    pending: 'bg-brand-gray/10', // Toyota Gray light background
  };

  const textVariants = {
    critical: 'text-[#DC2626] font-semibold',
    active: 'text-[#D97706] font-semibold',
    resolved: 'text-[#059669] font-semibold',
    pending: 'text-brand-gray font-semibold',
  };

  return (
    <View className={cn("flex-row items-center px-3 py-1 rounded-full", variants[variant], className)}>
      {icon && <View className="mr-1">{icon}</View>}
      <Text className={cn("text-[12px] uppercase", textVariants[variant])}>
        {label}
      </Text>
    </View>
  );
}
