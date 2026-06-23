import { ButtonSize, ButtonVariant } from '@/components/atoms/button/types';
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

// Height fully controls the vertical size; `alignItems: 'center'` centers the
// single line of text. Adding paddingVertical on top of a fixed height shrinks
// the content box below the text's lineHeight and clips it (with overflow:hidden).
const sizeStyles: Record<ButtonSize, ViewStyle> = {
  xs: {
    height: 28,
    paddingHorizontal: spacing.sm,
  },
  sm: {
    height: 32,
    paddingHorizontal: spacing.sm,
  },
  md: {
    height: 40,
    paddingHorizontal: spacing.md,
  },
  lg: {
    height: 48,
    paddingHorizontal: spacing.lg,
  },
  xl: {
    height: 56,
    paddingHorizontal: spacing.xl,
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
  xs: 'labelSmall',
  sm: 'labelSmall',
  md: 'button',
  lg: 'labelLarge',
  xl: 'labelLarge',
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
