import React from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { cn } from './ThemedView';

interface IconButtonProps extends TouchableOpacityProps {
  className?: string;
  icon: React.ReactNode;
}

export function IconButton({ className, icon, ...props }: IconButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        "p-2 bg-brand-gray/10 rounded-full justify-center items-center",
        className
      )}
      activeOpacity={0.7}
      {...props}
    >
      {icon}
    </TouchableOpacity>
  );
}
