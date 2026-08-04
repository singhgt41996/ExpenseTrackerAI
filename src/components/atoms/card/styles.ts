import { CardVariant } from '@/components/atoms/card/types';
import { borderRadius, colors, shadows, spacing } from '@/theme';
import { ViewStyle } from 'react-native';

export const getCardStyles = (
  variant: CardVariant = 'elevated',
  disabled: boolean = false,
  padding?: number,
): ViewStyle => {
  const baseStyles: ViewStyle = {
    borderRadius: borderRadius.md,
    padding: padding ?? spacing.md,
    backgroundColor: colors.neutral.white,
  };

  const variantStyles: Record<CardVariant, ViewStyle> = {
    elevated: {
      ...shadows.md,
      borderWidth: 1,
      borderColor: colors.primary[300],
    },
    outlined: {
      borderWidth: 2,
      borderColor: colors.primary[300],
      backgroundColor: 'transparent',
    },
    filled: {
      backgroundColor: colors.neutral.gray[100],
    },
  };

  const disabledStyle: ViewStyle = disabled
    ? {
        opacity: 0.5,
      }
    : {};

  return {
    ...baseStyles,
    ...variantStyles[variant],
    ...disabledStyle,
  };
};
