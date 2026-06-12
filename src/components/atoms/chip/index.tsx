import React from 'react';
import { View, Pressable } from 'react-native';
import { ChipProps } from './types';
import {
  getChipContainerStyles,
  getChipTextStyles,
  getDeleteIconSize,
} from './styles';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { colors } from '@/theme';

export const ChipComponent = ({
  label,
  variant = 'filled',
  size = 'medium',
  selected = false,
  color,
  icon,
  onPress,
  onDelete,
  disabled = false,
  style,
  testId,
}: ChipProps) => {
  const containerStyles = getChipContainerStyles(
    variant,
    size,
    selected,
    disabled,
    color,
  );
  const textStyles = getChipTextStyles(variant, size, selected, color);
  const deleteIconSize = getDeleteIconSize(size);

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  const handleDelete = (e: any) => {
    if (!disabled && onDelete) {
      e.stopPropagation(); // Prevent triggering onPress
      onDelete();
    }
  };

  const content = (
    <>
      {/* Left icon */}
      {icon && <View>{icon}</View>}

      {/* Label text */}
      <TextComponent style={textStyles}>{label}</TextComponent>

      {/* Delete button */}
      {onDelete && (
        <Pressable onPress={handleDelete} hitSlop={8}>
          <IconComponent
            name="close"
            family="MaterialIcons"
            size={deleteIconSize}
            color={colors.neutral.gray[900]}
          />
        </Pressable>
      )}
    </>
  );

  // If onPress provided, wrap in Pressable
  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          containerStyles,
          pressed && { opacity: 0.8 },
          style,
        ]}
        testID={testId}
      >
        {content}
      </Pressable>
    );
  }

  // Otherwise just a View
  return (
    <View style={[containerStyles, style]} testID={testId}>
      {content}
    </View>
  );
};
