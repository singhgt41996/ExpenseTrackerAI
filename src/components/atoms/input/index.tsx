import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { InputProps } from '@/components/atoms/input/types';
import {
  getContainerStyles,
  getErrorTextStyles,
  getHelperTextStyles,
  getIconContainerStyles,
  getInputContainerStyles,
  getInputStyles,
  getLabelStyles,
  getPlaceholderColor,
} from '@/components/atoms/input/styles';
import { TextComponent } from '@/components/atoms/text';

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
  multiline = false,
  numberOfLines = 1,

  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoComplete,

  leftIcon,
  rightIcon,
  size = 'medium',
  variant = 'outlined',

  success = false,
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
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const isDisabled = disabled || !editable;
  const hasError = !!error;
  const containerStyles = getContainerStyles();
  const inputContainerStyles = getInputContainerStyles(
    variant,
    size,
    isFocused,
    hasError,
    success,
    isDisabled,
  );
  const inputStyles = getInputStyles(size, disabled);
  const labelStyles = getLabelStyles(size);
  const placeholderColor = getPlaceholderColor(isDisabled);
  return (
    <View style={[containerStyles, style]}>
      {/* Label */}
      {label && (
        <TextComponent style={[labelStyles, labelStyle]}>
          {label}
          {required && <TextComponent color={'#F44336'}> *</TextComponent>}
        </TextComponent>
      )}

      {/* Input Container */}
      <View style={inputContainerStyles}>
        {/* Left Icon */}
        {leftIcon && (
          <View style={getIconContainerStyles('left')}>{leftIcon}</View>
        )}

        {/* TextInput */}
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={[inputStyles, inputStyle]}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          editable={!isDisabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          testID={testID}
        />

        {/* Right Icon */}
        {rightIcon && (
          <View style={getIconContainerStyles('right')}>{rightIcon}</View>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <TextComponent style={[getErrorTextStyles(), errorStyle]}>
          {error}
        </TextComponent>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <TextComponent style={getHelperTextStyles()}>
          {helperText}
        </TextComponent>
      )}
    </View>
  );
};
