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

export const getStepperRowStyles = (): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginVertical: spacing.md,
});

export const getQuickPicksRowStyles = (): ViewStyle => ({
  flexDirection: 'row',
  gap: spacing.sm,
  marginBottom: spacing.md,
});

export const getMonthNavStyles = (): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: spacing.sm,
});

export const getWeekdaysRowStyles = (): ViewStyle => ({
  flexDirection: 'row',
});

export const getWeekdayTextStyles = (): TextStyle => ({
  ...textVariants.caption,
  width: `${100 / 7}%`,
  textAlign: 'center',
  color: lightTheme.text.secondary,
});

export const getCalendarGridStyles = (): ViewStyle => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: spacing.sm,
});

export const getDayCellContainerStyles = (): ViewStyle => ({
  width: `${100 / 7}%`,
  aspectRatio: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

export const getDayCellStyles = (
  selected: boolean,
  isToday: boolean,
): ViewStyle => ({
  width: 32,
  height: 32,
  borderRadius: borderRadius.full,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: selected
    ? colors.primary[600]
    : isToday
      ? colors.primary[50]
      : 'transparent',
});

export const getDayCellTextStyles = (
  selected: boolean,
  disabled: boolean,
): TextStyle => ({
  ...textVariants.bodySmall,
  color: disabled
    ? lightTheme.text.disabled
    : selected
      ? colors.neutral.white
      : lightTheme.text.primary,
});
