import { borderRadius, colors, fontSizes, spacing } from '@/theme';
import { ViewStyle, TextStyle } from 'react-native';

export const getCheckboxContainerStyles = (): ViewStyle => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacing.xs,
});

export const getCheckBoxStyles = (
  checked: boolean,
  error?: boolean,
  size?: number,
  disabled?: boolean,
): ViewStyle => {
  const baseCheckBokStyles: ViewStyle = {
    height: size,
    width: size,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: error
      ? colors.error.main
      : checked
      ? colors.primary[500]
      : colors.neutral.gray[400],
    backgroundColor: checked ? colors.primary[500] : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const disabledStyles: ViewStyle = disabled ? { opacity: 0.5 } : {};

  return { ...baseCheckBokStyles, ...disabledStyles };
};

export const getCheckboxLabelStyles = (
  error: boolean,
  disabled: boolean,
): TextStyle => {
  return {
    fontSize: fontSizes.md,
    color: error
      ? colors.error.main
      : disabled
      ? colors.neutral.gray[400]
      : colors.neutral.gray[900],
  };
};
