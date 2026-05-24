import { Text as RNText } from 'react-native';
import React from 'react';
import { TextProps } from './types';
import { getTextStyles } from '@/components/atoms/text/styles';

/**
 * Text Component
 *
 * A flexible text component with built-in typography variants,
 * colors, and text decorations.
 *
 * @example
 * // Heading
 * <TextComponent variant="h1">Dashboard</TextComponent>
 *
 * @example
 * // Colored body text
 * <TextComponent variant="bodyMedium" color={colors.gray[600]}>Description</TextComponent>
 *
 * @example
 * // Truncated text
 * <TextComponent numberOfLines={2} ellipsizeMode="tail">Long text...</TextComponent>
 *
 * @example
 * // Clickable link
 * <TextComponent underline onPress={() => {}}>Terms & Conditions</TextComponent>
 *
 * @example
 * // Strikethrough price
 * <TextComponent strikethrough>$100</TextComponent>
 */
export const TextComponent = ({
  variant = 'bodyMedium',
  color,
  align = 'left',
  bold = false,
  italic = false,
  transform,
  disabled = false,
  children,
  style,
  ...rest
}: TextProps) => {
  const textStyles = getTextStyles(
    variant,
    color,
    align,
    bold,
    italic,
    transform,
    disabled,
  );

  return (
    <RNText style={[textStyles, style]} {...rest}>
      {children}
    </RNText>
  );
};
