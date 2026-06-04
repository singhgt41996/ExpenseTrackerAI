import React from 'react';
import { ViewStyle } from 'react-native';

export type ChipVariant = 'filled' | 'outlined';
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps {
  label: string; // Text to display

  // Variants & Styling
  variant?: ChipVariant; // Default: 'filled'
  size?: ChipSize; // Default: 'medium'
  selected?: boolean; // Highlight as selected
  color?: string; // Custom background color

  // Icons
  icon?: React.ReactNode; // Left icon

  // Interaction
  onPress?: () => void; // Make chip clickable
  onDelete?: () => void; // Show X button and handle deletion
  disabled?: boolean; // Disable interaction

  // Styling
  style?: ViewStyle; // Custom container styles

  // Accessibility
  testId?: string;
}
