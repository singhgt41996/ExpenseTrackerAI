import { ReactNode } from 'react';
import { Edge } from 'react-native-safe-area-context';
import { StyleProp, ViewStyle } from 'react-native';

export type BarStyle = 'light-content' | 'dark-content';

export interface ScreenWrapperProps {
  children: ReactNode;
  edges?: Edge[];
  backgroundColor?: string;
  barStyle?: BarStyle;
  statusBarColor?: string;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
}