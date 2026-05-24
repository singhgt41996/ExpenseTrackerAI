import { Pressable, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { ButtonProps } from '@/components/atoms/buttons/types';
import { TextComponent } from '@/components/atoms/text';
import {
  getButtonTextColorByVariant,
  getButtonTextSizeByVariant,
  getButttonStyles,
  getSpinnerColor,
} from '@/components/atoms/buttons/styles';

export const ButtonComponent = ({
  onPress,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  loadingState,
  style,
  textStyle,
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  testId,
}: ButtonProps) => {
  const isDisabled = disabled || loadingState;
  const buttonStyles = getButttonStyles(variant, size, fullWidth, disabled);
  const buttonTextSize = getButtonTextSizeByVariant(size);
  const buttonTextColor = getButtonTextColorByVariant(variant, disabled);
  const spinnerColor = getSpinnerColor(variant);

  return (
    <Pressable
      style={[buttonStyles, style]}
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      testID={testId}
    >
      {icon && iconPosition === 'left' && (
        <View style={{ marginRight: 8 }}>{icon}</View>
      )}

      {loadingState && (
        <ActivityIndicator
          size="small"
          color={spinnerColor}
          style={{ marginRight: 8 }}
        />
      )}
      <TextComponent
        variant={buttonTextSize}
        style={textStyle}
        color={buttonTextColor}
      >
        {children}
      </TextComponent>
      {icon && iconPosition === 'right' && (
        <View style={{ marginLeft: 8 }}>{icon}</View>
      )}
    </Pressable>
  );
};
