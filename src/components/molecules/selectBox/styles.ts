import { TextStyle, ViewStyle } from 'react-native';
import { spacing } from '@/theme/spacing';
import { textVariants } from '@/theme/typography';
import { colors, lightTheme } from '@/theme';
import { borderRadius } from '@/theme/spacing';

// Main container
export const getContainerStyles = (): ViewStyle => ({
  gap: spacing.sm,
});

// Label
export const getLabelStyles = (error: boolean): TextStyle => ({
  ...textVariants.labelMedium,
  marginBottom: spacing.xs,
  color: error ? colors.error.main : lightTheme.text.primary,
});

// Error text
export const getErrorTextStyles = (): TextStyle => ({
  ...textVariants.caption,
  color: colors.error.main,
  marginTop: spacing.xs,
});

// Trigger button
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
  backgroundColor: disabled ? colors.neutral.gray[100] : lightTheme.surface,
});

// Trigger text
export const getTriggerTextStyles = (disabled: boolean): TextStyle => ({
  ...textVariants.bodyMedium,
  flex: 1,
  color: disabled ? lightTheme.text.disabled : lightTheme.text.primary,
});

// Modal overlay (dark background)
export const getModalOverlayStyles = (): ViewStyle => ({
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'flex-end',
});

// Modal container (bottom sheet)
export const getModalContainerStyles = (): ViewStyle => ({
  backgroundColor: lightTheme.background,
  borderTopLeftRadius: borderRadius.lg,
  borderTopRightRadius: borderRadius.lg,
  maxHeight: '80%',
  paddingBottom: spacing.lg,
});

// Modal header
export const getModalHeaderStyles = (): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: lightTheme.border,
});

// Chips container (inside modal)
export const getChipsContainerStyles = (): ViewStyle => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: spacing.md,
  gap: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: lightTheme.border,
});

// Search container
export const getSearchContainerStyles = (): ViewStyle => ({
  padding: spacing.md,
});

// List container (ScrollView)
export const getListContainerStyles = (): ViewStyle => ({
  maxHeight: 300,
});

// Option item
export const getOptionItemStyles = (): ViewStyle => ({
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
});

// Modal footer (buttons)
export const getModalFooterStyles = (): ViewStyle => ({
  flexDirection: 'row',
  padding: spacing.md,
  gap: spacing.sm,
});
