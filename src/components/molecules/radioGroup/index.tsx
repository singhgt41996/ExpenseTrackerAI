import { View } from 'react-native';
import React from 'react';
import { RadioGroupProps } from '@/components/molecules/radioGroup/types';
import { TextComponent } from '@/components/atoms/text';
import { colors } from '@/theme';
import { RadioButton } from '@/components/atoms/radio';
import {
  getContainerStyles,
  getErrorTextStyles,
  getLabelStyleForRadioGroup,
  getOptionContainerStyle,
} from '@/components/molecules/radioGroup/styles';

export const RadioGroup = ({
  options,
  value,
  onChange,
  label,
  disabled,
  error,
  required,
  direction = 'vertical',
  style,
  testID,
}: RadioGroupProps) => {
  const containerStyles = getContainerStyles();
  const labelStyleForRadioGroup = getLabelStyleForRadioGroup(!!error);
  const optionContainerStyle = getOptionContainerStyle(direction);
  const errorTextStyles = getErrorTextStyles();

  return (
    <View style={[containerStyles, style]} testID={testID}>
      {label && (
        <TextComponent style={labelStyleForRadioGroup}>
          {label}
          {required && (
            <TextComponent color={colors.error.main}>*</TextComponent>
          )}
        </TextComponent>
      )}

      <View style={optionContainerStyle}>
        {options.map(option => (
          <RadioButton
            key={option.value}
            selected={value === option.value}
            onChange={value =>
              !disabled && (console.log(value), onChange(option.value))
            }
            label={option.label}
            disabled={disabled || option.disabled}
            error={!!error}
          />
        ))}
      </View>

      {/* Error message */}
      {error && <TextComponent style={errorTextStyles}>{error}</TextComponent>}
    </View>
  );
};
