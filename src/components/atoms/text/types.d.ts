import { TextProps as RNTextProps } from 'react-native';
import { TextVariantKey } from '@/theme';
import React from 'react';

export interface TextProps extends RNTextProps {

  variant?: TextVariantKey;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  bold?: boolean;
  italic?: boolean;
  
  // ===== TEXT DECORATION =====
  
  underline?: boolean;
  strikethrough?: boolean;
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  
  // ===== INTERACTION & STATE =====
  disabled?: boolean;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  onPress?: () => void;
  selectable?: boolean;
  accessibilityLabel?: string;
  /**
   * Test identifier for E2E testing
   * @example testID="expense-amount"
   */
  testID?: string;

  children: React.ReactNode;
}
