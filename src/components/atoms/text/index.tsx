import { View, Text as RNtext } from 'react-native';
import React from 'react';
import { TextProps } from './types';
import { textVariants } from '@/theme';
import { getTextStyles } from '@/components/atoms/text/styles';

export const Text = ({
  variant = 'bodymedium',
  color,
  align = 'left',
  bold = false,
  italic = false,
  children,
  style,
  ...rest
}: TextProps) => {
  const textStyles = getTextStyles(variant, color, align, bold, italic);

  return <RNtext style={[textStyles, style]}>{children}</RNtext>;
};
