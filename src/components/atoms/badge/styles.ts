import { ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, fontSizes } from '@/theme';
import { BadgeVariant, BadgeSize } from './types';

export const getBadgeContainerStyles = (
  variant: BadgeVariant = 'default',
  size: BadgeSize = 'medium',
  dot: boolean = false,
): ViewStyle => {
  // Size-specific dimensions
  const sizeStyles: Record<BadgeSize, ViewStyle> = dot
    ? {
        small: { width: 8, height: 8 },
        medium: { width: 10, height: 10 },
        large: { width: 12, height: 12 },
      }
    : {
        small: {
          minWidth: 16,
          height: 16,
          paddingHorizontal: 4,
        },
        medium: {
          minWidth: 20,
          height: 20,
          paddingHorizontal: 6,
        },
        large: {
          minWidth: 24,
          height: 24,
          paddingHorizontal: 8,
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

export const getBadgeTextStyles = (size: BadgeSize = 'medium'): TextStyle => {
  const sizeStyles: Record<BadgeSize, TextStyle> = {
    small: { fontSize: 10 },
    medium: { fontSize: 12 },
    large: { fontSize: 14 },
  };

  return {
    ...sizeStyles[size],
    color: colors.neutral.white,
    fontWeight: '600',
    lineHeight: sizeStyles[size].fontSize,
  };
};
