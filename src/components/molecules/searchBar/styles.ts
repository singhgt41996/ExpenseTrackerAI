import { ViewStyle } from 'react-native';
import { spacing, borderRadius } from '@/theme/spacing';
import { lightTheme } from '@/theme';

export const getContainerStyles = (): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: lightTheme.surface,
  borderRadius: borderRadius.lg,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderWidth: 1,
  borderColor: lightTheme.border,
});

export const getInputStyles = (): ViewStyle => ({
  flex: 1,
  paddingHorizontal: spacing.sm,
});

export const getIconContainerStyles = (): ViewStyle => ({
  padding: spacing.xs,
});
