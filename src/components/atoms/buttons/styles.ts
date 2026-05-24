import { ButtonSize, ButtonVariant } from '@/components/atoms/buttons/types';
import { colors, spacing, TextVariantKey, borderRadius } from '@/theme';
import { ViewStyle } from 'react-native';

const baseButtonStyeles: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: borderRadius.sm,
  overflow: 'hidden',
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary[500],
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: colors.secondary[500],
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  text: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  danger: {
    backgroundColor: colors.error.main,
    borderWidth: 0,
  },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  small: {
    height: 32,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  medium: {
    height: 40,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  large: {
    height: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
};

const buttonTextColor: Record<ButtonVariant, string> = {
  primary: colors.neutral.white,
  secondary: colors.neutral.white,
  outline: colors.primary[500],
  text: colors.primary[500],
  danger: colors.neutral.white,
};

const buttonTextSize: Record<ButtonSize, TextVariantKey> = {
  small: 'labelSmall',
  medium: 'button',
  large: 'labelLarge',
};

const spinnerColor: Record<ButtonVariant, string> = {
  primary: colors.neutral.white,
  secondary: colors.neutral.white,
  outline: colors.primary[500],
  text: colors.primary[500],
  danger: colors.neutral.white,
};

export const getButttonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  disabled: boolean,
): ViewStyle => {
  return {
    ...baseButtonStyeles,
    ...(variant && variantStyles[variant]),
    ...(size && sizeStyles[size]),
    ...(fullWidth && { width: '100%' }),
    ...(disabled && { opacity: 0.5 }),
  } as ViewStyle;
};

export const getButtonTextColorByVariant = (
  variant: ButtonVariant,
  disabled: boolean,
) => {
  if (disabled) {
    return colors.neutral.gray[400] as string;
  }
  return buttonTextColor[variant] as string;
};

export const getButtonTextSizeByVariant = (size: ButtonSize) => {
  return buttonTextSize[size] as TextVariantKey;
};

export const getSpinnerColor = (variant: ButtonVariant): string => {
  return spinnerColor[variant];
};
