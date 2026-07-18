import React from 'react';
import { Text, Pressable, PressableProps, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  textClassName?: string;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  textClassName,
  disabled,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = (e: any) => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    if (onPressIn) onPressIn(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    if (onPressOut) onPressOut(e);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const baseStyles = "flex-row items-center justify-center";
  
  const variants = {
    // Primary: 24px radius, teal background, glow on press (simulated by shadow for now)
    primary: "bg-primary rounded-[24px] active:bg-primary-container shadow-lg shadow-primary/30",
    // Secondary: Ghost style with #1E3444 (surface-variant) border
    secondary: "bg-transparent border border-surface-variant rounded-[24px] active:bg-surface-container",
    outline: "bg-transparent border-2 border-primary rounded-[24px]",
    ghost: "bg-transparent active:bg-surface-container rounded-[24px]",
  };

  const sizes = {
    sm: "px-4 py-2",
    md: "px-6 py-3.5",
    lg: "px-8 py-5",
  };

  const textBaseStyles = "font-display font-semibold text-center";
  const textVariants = {
    primary: "text-on-primary",
    secondary: "text-on-surface",
    outline: "text-primary",
    ghost: "text-primary",
  };
  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || isLoading}
      className={twMerge(
        clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          (disabled || isLoading) && "opacity-50",
          className
        )
      )}
      style={animatedStyle}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#003739' : '#45e0e8'} />
      ) : (
        <Text
          className={twMerge(
            clsx(textBaseStyles, textVariants[variant], textSizes[size], textClassName)
          )}
        >
          {label}
        </Text>
      )}
    </AnimatedPressable>
  );
}
