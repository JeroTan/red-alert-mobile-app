import { Text, type TextProps, StyleSheet } from 'react-native';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { typography } from '../../style/typography';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ThemedTextProps extends TextProps {
  className?: string;
}

export function ThemedText({ className, style, ...props }: ThemedTextProps) {
  return (
    <Text
      className={cn("text-app-text-primary", className)}
      style={[
        { fontFamily: typography.fontFamily.toyota },
        style
      ]}
      {...props}
    />
  );
}
