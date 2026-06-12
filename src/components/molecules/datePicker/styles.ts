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

export const getTriggerStyles = (
  error: boolean,
  disabled: boolean,
): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing.md,
  borderWidth: 1,
  borderColor: error ? colors.error.main : lightTheme.border,
  borderRadius: borderRadius.md,
  backgroundColor: disabled ? colors.neutral.gray[100] : lightTheme.background,
});

export const getTriggerTextStyles = (hasValue: boolean): TextStyle => ({
  ...textVariants.bodyMedium,
  flex: 1,
  color: hasValue ? lightTheme.text.primary : lightTheme.text.disabled,
});

export const getErrorTextStyles = (): TextStyle => ({
  ...textVariants.caption,
  color: colors.error.main,
});

export const getModalOverlayStyles = (): ViewStyle => ({
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
});

export const getModalContainerStyles = (): ViewStyle => ({
  backgroundColor: lightTheme.background,
  borderRadius: borderRadius.lg,
  padding: spacing.lg,
  width: '80%',
  maxWidth: 400,
});

export const getModalHeaderStyles = (): ViewStyle => ({
  marginBottom: spacing.md,
});

export const getModalFooterStyles = (): ViewStyle => ({
  flexDirection: 'row',
  gap: spacing.sm,
  marginTop: spacing.md,
});
