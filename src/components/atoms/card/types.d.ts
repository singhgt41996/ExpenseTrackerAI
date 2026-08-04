import React from 'react';
import { ViewStyle } from 'react-native';

export type CardVariant = 'outlined' | 'elevated' | 'filled';

export interface CardProps {
  variant?: CardVariant;
  children?: React.ReactNode;
  padding?: number;
  style?: ViewStyle;

  onPress?: () => void;
  disabled?: boolean;

  testID?: string;
}
