import { ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSizes, fontWeights } from '@/theme';
import { InputProps } from '@/components/atoms/input/types';

// Types
export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'outlined' | 'filled' | 'underlined';

// ============================================
// BASE STYLES
// ============================================

const baseContainerStyles: ViewStyle = {
  width: '100%',
};

const baseInputContainerStyles: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const baseInputStyles: TextStyle = {
  flex: 1,
  fontWeight: fontWeights.regular,
  color: colors.neutral.gray[900],
};

const baseLabelStyles: TextStyle = {
  fontWeight: fontWeights.medium,
  color: colors.neutral.gray[700],
  marginBottom: spacing.xs,
};

// ============================================
// VARIANT STYLES (outlined, filled, underlined)
// ============================================

const variantContainerStyles: Record<InputVariant, ViewStyle> = {
  outlined: {
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.gray[300],
    borderRadius: borderRadius.sm,
  },
  filled: {
    backgroundColor: colors.neutral.gray[100],
    borderWidth: 0,
    borderRadius: borderRadius.sm,
  },
  underlined: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray[300],
  },

  // ============================================
  // SIZE STYLES (small, medium, large)
  // ============================================
};

const sizeContainerStyles: Record<InputSize, ViewStyle> = {
  small: {
    height: 40,
    paddingHorizontal: spacing.sm,
  },
  medium: {
    height: 48,
    paddingHorizontal: spacing.md,
  },
  large: {
    height: 56,
    paddingHorizontal: spacing.lg,
  },
};

const sizeInputStyles: Record<InputSize, TextStyle> = {
  small: {
    fontSize: fontSizes.sm,
  },
  medium: {
    fontSize: fontSizes.sm,
  },
  large: {
    fontSize: fontSizes.md,
  },
};

const sizeLabelStyles: Record<InputSize, TextStyle> = {
  small: {
    fontSize: fontSizes.xs,
  },
  medium: {
    fontSize: fontSizes.sm,
  },
  large: {
    fontSize: fontSizes.md,
  },
};

// ============================================
// STATE STYLES (focus, error, success, disabled)
// ============================================
const focusStyles: Record<InputVariant, ViewStyle> = {
  outlined: {
    borderColor: colors.primary[500],
    borderWidth: 2,
  },
  filled: {
    backgroundColor: colors.primary[50],
  },
  underlined: {
    borderBottomColor: colors.primary[500],
    borderBottomWidth: 2,
  },
};

const errorStyles: Record<InputVariant, ViewStyle> = {
  outlined: {
    borderColor: colors.error.main,
  },
  filled: {
    backgroundColor: '#FFEBEE', // light red
  },
  underlined: {
    borderBottomColor: colors.error.main,
  },
};

const successStyles: Record<InputVariant, ViewStyle> = {
  outlined: {
    borderColor: colors.success.main,
  },
  filled: {
    backgroundColor: colors.primary[50],
  },
  underlined: {
    borderBottomColor: colors.success.main,
  },
};

const disabledContainerStyles: ViewStyle = {
  backgroundColor: colors.neutral.gray[100],
  opacity: 0.6,
};

const disabledInputStyles: TextStyle = {
  color: colors.neutral.gray[400],
};

// ============================================
// HELPER TEXT STYLES
// ============================================

const helperTextStyles: TextStyle = {
  fontSize: fontSizes.xs,
  color: colors.neutral.gray[500],
  marginTop: spacing.xs,
};

const errorTextStyles: TextStyle = {
  fontSize: fontSizes.xs,
  color: colors.error.main,
  marginTop: spacing.xs,
};

// ============================================
// GETTER FUNCTIONS (same pattern as button)
// ============================================

export const getInputContainerStyles = (
  variant: InputVariant,
  size: InputSize,
  isFocused: boolean,
  hasError: boolean,
  isSuccess: boolean,
  disabled: boolean,
): ViewStyle => {
  return {
    ...baseInputContainerStyles,
    ...variantContainerStyles[variant],
    ...sizeContainerStyles[size],
    ...(isFocused && !hasError && focusStyles[variant]),
    ...(hasError && errorStyles[variant]),
    ...(isSuccess && !hasError && successStyles[variant]),
    ...(disabled && disabledContainerStyles),
  };
};

export const getInputStyles = (
  size: InputSize,
  disabled: boolean,
): TextStyle => {
  return {
    ...baseInputStyles,
    ...sizeInputStyles[size],
    ...(disabled && disabledInputStyles),
  };
};

export const getLabelStyles = (size: InputSize): TextStyle => {
  return {
    ...baseLabelStyles,
    ...sizeLabelStyles[size],
  };
};

export const getContainerStyles = (): ViewStyle => {
  return baseContainerStyles;
};

export const getHelperTextStyles = (): TextStyle => {
  return helperTextStyles;
};

export const getErrorTextStyles = (): TextStyle => {
  return errorTextStyles;
};

// Placeholder color
export const getPlaceholderColor = (disabled: boolean): string => {
  return disabled ? colors.neutral.gray[300] : colors.neutral.gray[400];
};

// Icon styles
export const getIconContainerStyles = (
  position: 'left' | 'right',
): ViewStyle => {
  return {
    ...(position === 'left' && { marginRight: spacing.sm }),
    ...(position === 'right' && { marginLeft: spacing.sm }),
  };
};
