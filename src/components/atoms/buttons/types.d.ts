import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'text'
  | 'danger';

export interface ButtonProps {
  onPress: () => void;
  size: ButtonSize;
  variant: ButtonVariant;
  disabled?: boolean;
  loadingState?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  testId?: string;
}
