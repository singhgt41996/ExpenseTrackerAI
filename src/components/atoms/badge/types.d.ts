import { ViewStyle } from 'react-native';
import { ComponentSize } from '@/theme';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'error'
  | 'warning';
export type BadgeSize = ComponentSize;

export interface BadgeProps {
  // Content
  count?: number; // Notification count (auto-hidden if 0)
  label?: string; // Text label (alternative to count)
  max?: number; // Max count (shows "99+" if exceeded)
  showZero?: boolean; // Show badge even when count is 0

  // Styling
  variant?: BadgeVariant; // Default: 'default'
  size?: BadgeSize; // Default: 'medium'
  dot?: boolean; // Show as dot (no text)

  // Position (when wrapping another component)
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

  // Custom styling
  style?: ViewStyle;

  // Accessibility
  testID?: string;
}
