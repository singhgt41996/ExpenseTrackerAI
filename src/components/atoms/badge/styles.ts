import { ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/theme';
import { BadgeVariant, BadgeSize } from './types';

export const getBadgeContainerStyles = (
  variant: BadgeVariant = 'default',
  size: BadgeSize = 'md',
  dot: boolean = false,
): ViewStyle => {
  // Size-specific dimensions
  const sizeStyles: Record<BadgeSize, ViewStyle> = dot
    ? {
        xs: { width: 6, height: 6 },
        sm: { width: 8, height: 8 },
        md: { width: 10, height: 10 },
        lg: { width: 12, height: 12 },
        xl: { width: 14, height: 14 },
      }
    : {
        xs: {
          minWidth: 14,
          height: 14,
          paddingHorizontal: 3,
        },
        sm: {
          minWidth: 16,
          height: 16,
          paddingHorizontal: 4,
        },
        md: {
          minWidth: 20,
          height: 20,
          paddingHorizontal: 6,
        },
        lg: {
          minWidth: 24,
          height: 24,
          paddingHorizontal: 8,
        },
        xl: {
          minWidth: 28,
          height: 28,
          paddingHorizontal: 10,
        },
      };

  // Variant colors
  const variantColors: Record<BadgeVariant, string> = {
    default: colors.neutral.gray[600],
    primary: colors.primary[500],
    success: colors.success.main,
    error: colors.error.main,
    warning: colors.warning.main,
  };

  return {
    ...sizeStyles[size],
    backgroundColor: variantColors[variant],
    borderRadius: 999, // Fully rounded
    justifyContent: 'center',
    alignItems: 'center',
  };
};

export const getBadgeTextStyles = (size: BadgeSize = 'md'): TextStyle => {
  const sizeStyles: Record<BadgeSize, TextStyle> = {
    xs: { fontSize: 9 },
    sm: { fontSize: 10 },
    md: { fontSize: 12 },
    lg: { fontSize: 14 },
    xl: { fontSize: 16 },
  };

  return {
    ...sizeStyles[size],
    color: colors.neutral.white,
    fontWeight: '600',
    lineHeight: sizeStyles[size].fontSize,
  };
};
