import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { ComponentSize } from '@/theme';

export type ButtonSize = ComponentSize;
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
  title: string;
  disabled?: boolean;
  loadingState?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  testID?: string;
}
