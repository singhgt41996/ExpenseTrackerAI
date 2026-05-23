import { TextProps as RNTextProps } from 'react-native';
import { TextVariantKey } from '@/theme';
import React from 'react';
import { colors } from '../../../theme/colors';

export interface TextProps extends RNTextProps {
  /**
   * @default 'bodyMedium'
   */
  variant?: TextVariantKey;
  color?: string;
  /**
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * @default false
   */
  bold?: boolean;
  /**
   * @default false
   */
  italic?: boolean;
  children: React.ReactNode;
}
