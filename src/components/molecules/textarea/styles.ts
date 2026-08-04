import { TextStyle, ViewStyle } from 'react-native';
import { spacing, borderRadius } from '@/theme/spacing';
import { textVariants } from '@/theme/typography';
import { colors, lightTheme } from '@/theme';

export const getContainerStyles = (): ViewStyle => ({
  gap: spacing.xs,
});

export const getLabelStyles = (error: boolean): TextStyle => ({
  ...textVariants.labelMedium,
  color: error ? colors.error.main : lightTheme.text.primary,
});

export const getTextAreaStyles = (
  error: boolean,
  disabled: boolean,
  rows: number,
  isFocused: boolean,
): ViewStyle => ({
  borderWidth: isFocused && !error ? 2 : 1,
  borderColor: error
    ? colors.error.main
    : isFocused
    ? colors.primary[500]
    : lightTheme.border,
  borderRadius: borderRadius.md,
  padding: spacing.md,
  backgroundColor: disabled ? colors.neutral.gray[100] : lightTheme.background,
  minHeight: rows * 24, // Approximate line height
});

export const getTextStyles = (): TextStyle => ({
  ...textVariants.bodyMedium,
  color: lightTheme.text.primary,
});

export const getErrorTextStyles = (): TextStyle => ({
  ...textVariants.caption,
  color: colors.error.main,
});

export const getHelperTextStyles = (): TextStyle => ({
  ...textVariants.caption,
  color: lightTheme.text.secondary,
});

export const getCharCountStyles = (): TextStyle => ({
  ...textVariants.caption,
  color: lightTheme.text.secondary,
  textAlign: 'right',
});
