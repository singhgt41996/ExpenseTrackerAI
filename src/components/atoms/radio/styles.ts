import { colors, fontSizes } from '@/theme';
import { spacing } from '@/theme/spacing';
import { TextStyle, ViewStyle } from 'react-native';

export const getRadioContainerStyles = (): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.sm,
});

export const getRadioStyles = (
  selected: boolean,
  disabled: boolean = false,
  error: boolean = false,
  size: number = 24,
): ViewStyle => {
  const baseStyles: ViewStyle = {
    width: size,
    height: size,
    borderWidth: 2,
    borderRadius: size / 2,
    borderColor: error
      ? colors.error.main
      : selected
      ? colors.primary[500]
      : colors.neutral.gray[400],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  };

  const disableStyle: ViewStyle = disabled ? { opacity: 0.5 } : {};

  return { ...baseStyles, ...disableStyle };
};

export const getRadioInnerCircleStyles = (size: number = 24): ViewStyle => ({
  width: size * 0.5,
  height: size * 0.5,
  borderRadius: (size * 0.5) / 2,
  backgroundColor: colors.primary[500],
});

export const getRadioLabelStyles = (
  error: boolean = false,
  disabled: boolean = false,
): TextStyle => ({
  fontSize: fontSizes.md,
  color: error
    ? colors.error.main
    : disabled
    ? colors.neutral.gray[400]
    : colors.neutral.gray[900],
});
