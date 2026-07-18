import React from 'react';
import { View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends ViewProps {
  intensity?: number;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  intensity = 20,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <View className="rounded-[12px] overflow-hidden border border-[#1E3444]/50">
      <BlurView 
        intensity={12} 
        tint="dark" 
        className={twMerge(
          clsx(
            "bg-[#0A1825]/70 p-4",
            className
          )
        )}
        {...props as any}
      >
        {children}
      </BlurView>
    </View>
  );
}
