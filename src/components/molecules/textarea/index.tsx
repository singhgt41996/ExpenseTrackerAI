import { View, TextInput } from 'react-native';
import React from 'react';
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
  testId,
}: TextAreaProps) => {
  const containerStyles = getContainerStyles();
  const labelStyles = getLabelStyles(!!error);
  const textAreaStyles = getTextAreaStyles(!!error, disabled, rows);
  const textStyles = getTextStyles();
  const errorTextStyles = getErrorTextStyles();
  const helperTextStyles = getHelperTextStyles();
  const charCountStyles = getCharCountStyles();

  return (
    <View style={[containerStyles, style]} testID={testId}>
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
        placeholder={placeholder}
        placeholderTextColor={lightTheme.text.disabled}
        editable={!disabled}
        multiline
        numberOfLines={rows}
        maxLength={maxLength}
        textAlignVertical="top"
        style={[textAreaStyles, textStyles]}
        testID={testId ? `${testId}-input` : undefined}
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
