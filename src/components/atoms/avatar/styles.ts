import { ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { colors, borderRadius } from '@/theme';
import { AvatarSize, AvatarVariant } from './types';

export const getAvatarSize = (size: AvatarSize = 'md'): number => {
  if (typeof size === 'number') return size;

  const sizes: Record<string, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
  };

  return sizes[size];
};

export const getAvatarContainerStyles = (
  size: AvatarSize = 'md',
  variant: AvatarVariant = 'circular',
  backgroundColor?: string,
  disabled: boolean = false,
): ViewStyle => {
  const avatarSize = getAvatarSize(size);

  const variantStyles: Record<AvatarVariant, ViewStyle> = {
    circular: { borderRadius: avatarSize / 2 },
    rounded: { borderRadius: borderRadius.md },
    square: { borderRadius: 0 },
  };

  return {
    width: avatarSize,
    height: avatarSize,
    ...variantStyles[variant],
    backgroundColor: backgroundColor || colors.neutral.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1,
  };
};

export const getAvatarImageStyles = (
  size: AvatarSize = 'md',
  variant: AvatarVariant = 'circular',
): ImageStyle => {
  const avatarSize = getAvatarSize(size);

  const variantStyles: Record<AvatarVariant, ImageStyle> = {
    circular: { borderRadius: avatarSize / 2 },
    rounded: { borderRadius: borderRadius.md },
    square: { borderRadius: 0 },
  };

  return {
    width: avatarSize,
    height: avatarSize,
    ...variantStyles[variant],
  };
};

export const getAvatarTextStyles = (
  size: AvatarSize = 'md',
  textColor?: string,
): TextStyle => {
  const avatarSize = getAvatarSize(size);
  const fontSize = avatarSize * 0.4; // 40% of avatar size

  return {
    fontSize,
    fontWeight: '600',
    color: textColor || colors.neutral.white,
  };
};
