import React, { useState } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export function Input({
  label,
  error,
  containerClassName,
  inputClassName,
  labelClassName,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={twMerge(clsx("w-full", containerClassName))}>
      {label && (
        <Text className={twMerge(clsx("text-sm font-medium text-outline mb-1.5 ml-1", labelClassName))}>
          {label}
        </Text>
      )}
      <TextInput
        className={twMerge(
          clsx(
            "w-full bg-surface-container border rounded-lg px-4 py-3.5 text-on-surface text-base",
            isFocused ? "border-primary shadow-md shadow-primary/20" : "border-surface-variant",
            error && "border-error",
            inputClassName
          )
        )}
        placeholderTextColor="#859394"
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        {...props}
      />
      {error && (
        <Text className="text-error text-xs mt-1.5 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}
