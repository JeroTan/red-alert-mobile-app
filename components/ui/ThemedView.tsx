import { View, type ViewProps } from 'react-native';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ThemedViewProps extends ViewProps {
  className?: string;
}

export function ThemedView({ className, style, ...props }: ThemedViewProps) {
  return (
    <View
      className={cn("bg-white dark:bg-black", className)}
      style={style}
      {...props}
    />
  );
}
