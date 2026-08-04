import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TextAreaProps } from '@/components/molecules/textarea/types';
import { TextComponent } from '@/components/atoms/text';
import { colors, lightTheme } from '@/theme';
import {
  getContainerStyles,
  getLabelStyles,
  getTextAreaStyles,
  getTextStyles,
  getErrorTextStyles,
  getHelperTextStyles,
  getCharCountStyles,
} from '@/components/molecules/textarea/styles';

export const TextArea = ({
  value,
  onChangeText,
  onBlur,
  onFocus,
  placeholder = 'Enter text...',
  label,
  error,
  helperText,
  required = false,
  disabled = false,

  maxLength,
  rows = 4,
  showCharCount = false,

  style,
  testID,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const containerStyles = getContainerStyles();
  const labelStyles = getLabelStyles(!!error);
  const textAreaStyles = getTextAreaStyles(!!error, disabled, rows, isFocused);
  const textStyles = getTextStyles();
  const errorTextStyles = getErrorTextStyles();
  const helperTextStyles = getHelperTextStyles();
  const charCountStyles = getCharCountStyles();

  const handleFocus = () => {
    setIsFocused(true);
    console.log('Text Area Focused');
    onFocus?.();
  };
  const handleBlur = () => {
    setIsFocused(false);
    console.log('Text Area Blurred');
    onBlur?.();
  };

  return (
    <View style={[containerStyles, style]} testID={testID}>
      {/* Label */}
      {label && (
        <TextComponent style={labelStyles}>
          {label}
          {required && (
            <TextComponent color={colors.error.main}>*</TextComponent>
          )}
        </TextComponent>
      )}

      {/* TextArea */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={lightTheme.text.disabled}
        editable={!disabled}
        multiline
        numberOfLines={rows}
        maxLength={maxLength}
        textAlignVertical="top"
        style={[textAreaStyles, textStyles]}
        testID={testID ? `${testID}-input` : undefined}
      />

      {/* Helper Text or Error */}
      {error ? (
        <TextComponent style={errorTextStyles}>{error}</TextComponent>
      ) : helperText ? (
        <TextComponent style={helperTextStyles}>{helperText}</TextComponent>
      ) : null}

      {/* Character Count */}
      {showCharCount && maxLength && (
        <TextComponent style={charCountStyles}>
          {value.length}/{maxLength}
        </TextComponent>
      )}
    </View>
  );
};
