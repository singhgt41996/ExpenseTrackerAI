import { ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSizes } from '@/theme';
import { ChipVariant, ChipSize } from './types';

export const getChipContainerStyles = (
  variant: ChipVariant = 'filled',
  size: ChipSize = 'md',
  selected: boolean = false,
  disabled: boolean = false,
  customColor?: string,
): ViewStyle => {
  // Size-specific styles
  const sizeStyles: Record<ChipSize, ViewStyle> = {
    xs: {
      height: 20,
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
    },
    sm: {
      height: 24,
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
    },
    md: {
      height: 32,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    lg: {
      height: 40,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    xl: {
      height: 48,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
  };

  // Base styles
  const baseStyles: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: borderRadius.full,
    ...sizeStyles[size],
  };

  // Variant styles
  const variantStyles: ViewStyle =
    variant === 'filled'
      ? {
          backgroundColor: customColor
            ? customColor
            : selected
            ? colors.primary[500]
            : colors.neutral.gray[200],
          borderWidth: 0,
        }
      : {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: customColor
            ? customColor
            : selected
            ? colors.primary[500]
            : colors.neutral.gray[400],
        };

  // Disabled styles
  const disabledStyles: ViewStyle = disabled ? { opacity: 0.5 } : {};

  return {
    ...baseStyles,
    ...variantStyles,
    ...disabledStyles,
  };
};

export const getChipTextStyles = (
  variant: ChipVariant = 'filled',
  size: ChipSize = 'md',
  selected: boolean = false,
  customColor?: string,
): TextStyle => {
  const sizeStyles: Record<ChipSize, TextStyle> = {
    xs: { fontSize: fontSizes.xs },
    sm: { fontSize: fontSizes.xs },
    md: { fontSize: fontSizes.sm },
    lg: { fontSize: fontSizes.md },
    xl: { fontSize: fontSizes.md },
  };

  const textColor =
    variant === 'filled'
      ? selected
        ? colors.neutral.white
        : colors.neutral.gray[900]
      : customColor
      ? customColor
      : selected
      ? colors.primary[500]
      : colors.neutral.gray[900];

  return {
    ...sizeStyles[size],
    color: textColor,
    fontWeight: '500',
  };
};

export const getDeleteIconSize = (size: ChipSize = 'md'): number => {
  const sizes: Record<ChipSize, number> = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  };
  return sizes[size];
};
