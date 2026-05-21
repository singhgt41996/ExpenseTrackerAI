import { TextProps as RNTextProps } from 'react-native';
import { TextVariantKey } from '@/theme';
import React from 'react';

export interface TextProps extends RNTextProps {
  /**
   * Text variant from theme
   * @default 'bodyMedium'
   */
  variant?: TextVariantKey;
  color?: string;
  /**
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * Makes text bold
   * @default false
   */
  bold?: boolean;
  /**
   * Makes text italic
   * @default false
   */
  italic?: boolean;
  children: React.ReactNode;
}
