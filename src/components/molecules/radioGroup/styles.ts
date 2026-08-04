import { TextStyle, ViewStyle } from 'react-native';
import { spacing } from '../../../theme/spacing';
import { textVariants } from '@/theme/typography';
import { colors, fontSizes } from '@/theme';

export const getContainerStyles = (): ViewStyle => ({
  gap: spacing.sm,
});

export const getLabelStyleForRadioGroup = (error: boolean): TextStyle => ({
  ...textVariants.labelMedium,
  marginBottom: spacing.xs,
  color: error ? colors.error.main : colors.neutral.gray[900],
});

export const getOptionContainerStyle = (
  direction: 'vertical' | 'horizontal',
): ViewStyle => ({
  flexDirection: direction === 'horizontal' ? 'row' : 'column',
  gap: direction === 'horizontal' ? spacing.md : spacing.sm,
  flexWrap: direction === 'horizontal' ? 'wrap' : 'nowrap',
});

export const getErrorTextStyles = (): TextStyle => ({
  fontSize: fontSizes.sm,
  color: colors.error.main,
  marginTop: spacing.xs,
});
