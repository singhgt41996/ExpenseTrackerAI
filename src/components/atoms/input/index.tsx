import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { InputProps } from '@/components/atoms/input/types';

export const InputComponent = ({
  placeholder = 'Enter Something',
  value = '',
  disabled = false,
  onChangeText,
  label,
  error,
  required = true,
  helperText,
  editable = true,
  autoFocus = false,
  maxLength,
  multiline,
  numberOfLines,

  secureTextEntry,
  keyboardType = 'text',
  autoCapitalize = 'none',
  autoComplete,

  leftIcon,
  rightIcon,
  size,
  variant,

  success,
  warning,

  showCharCount = false,
  showPasswordToggle = false,
  clearable = false,

  onFocus,
  onBlur,
  onSubmitEditing,

  style,
  inputStyle,
  labelStyle,
  errorStyle,
  testID,
}: InputProps) => {
  return (
    <View>
      <TextInput
        value={value}
        placeholder={placeholder}
        // style={[...style]}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        editable={editable || !disabled}
        testID={testID}
      />
    </View>
  );
};
