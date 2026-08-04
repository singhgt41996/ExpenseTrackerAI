import { Pressable, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { ButtonProps } from '@/components/atoms/button/types';
import { TextComponent } from '@/components/atoms/text';
import {
  getButtonTextColorByVariant,
  getButtonTextSizeByVariant,
  getButttonStyles,
  getSpinnerColor,
} from '@/components/atoms/button/styles';

export const ButtonComponent = ({
  onPress,
  size = 'md',
  variant = 'primary',
  disabled = false,
  loadingState,
  style,
  textStyle,
  title,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  testID,
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
      testID={testID}
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
        {title}
      </TextComponent>
      {icon && iconPosition === 'right' && (
        <View style={{ marginLeft: 8 }}>{icon}</View>
      )}
    </Pressable>
  );
};
