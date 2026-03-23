import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from './ThemedView';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <View 
      className={cn(
        "bg-white border border-gray-200 rounded-xl p-6 shadow-sm", 
        className
      )} 
      {...props}
    >
      {children}
    </View>
  );
}
