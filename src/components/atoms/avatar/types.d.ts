import { ViewStyle, ImageStyle } from 'react-native';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number;
export type AvatarVariant = 'circular' | 'rounded' | 'square';

export interface AvatarProps {
  // Content (priority: imageUri > icon > initials)
  imageUri?: string; // Image URL
  initials?: string; // User initials (e.g., "JD")
  icon?: React.ReactNode; // Icon as fallback

  // Styling
  size?: AvatarSize; // Default: 'md'
  variant?: AvatarVariant; // Default: 'circular'
  backgroundColor?: string; // Custom background color
  textColor?: string; // Text/initials color

  // Interaction
  onPress?: () => void; // Make avatar clickable
  disabled?: boolean; // Disable interaction

  // Custom styling
  style?: ViewStyle;
  imageStyle?: ImageStyle;

  // Accessibility
  alt?: string; // Image alt text
  testId?: string;
}
