import React from 'react';
import { View } from 'react-native';
import { BadgeProps } from './types';
import { getBadgeContainerStyles, getBadgeTextStyles } from './styles';
import { TextComponent } from '@/components/atoms/text';

export const BadgeComponent = ({
  count,
  label,
  max = 99,
  showZero = false,
  variant = 'default',
  size = 'medium',
  dot = false,
  style,
  testId,
}: BadgeProps) => {
  const containerStyles = getBadgeContainerStyles(variant, size, dot);
  const textStyles = getBadgeTextStyles(size);

  // Determine display content
  let displayContent = '';

  if (dot) {
    displayContent = ''; // No text for dot
  } else if (label) {
    displayContent = label;
  } else if (count !== undefined) {
    if (count === 0 && !showZero) {
      return null; // Hide badge if count is 0 and showZero is false
    }
    displayContent = count > max ? `${max}+` : count.toString();
  }

  // If no content and not a dot, don't render
  if (!displayContent && !dot) {
    return null;
  }

  return (
    <View style={[containerStyles, style]} testID={testId}>
      {!dot && displayContent && (
        <TextComponent style={textStyles}>{displayContent}</TextComponent>
      )}
    </View>
  );
};
