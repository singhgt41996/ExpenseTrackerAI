import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { AvatarProps } from './types';
import {
  getAvatarContainerStyles,
  getAvatarImageStyles,
  getAvatarTextStyles,
} from './styles';
import { TextComponent } from '@/components/atoms/text';

export const AvatarComponent = ({
  imageUri,
  initials,
  icon,
  size = 'md',
  variant = 'circular',
  backgroundColor,
  textColor,
  onPress,
  disabled = false,
  style,
  imageStyle,
  alt,
  testID,
}: AvatarProps) => {
  const containerStyles = getAvatarContainerStyles(
    size,
    variant,
    backgroundColor,
    disabled,
  );
  const imageStyles = getAvatarImageStyles(size, variant);
  const textStyles = getAvatarTextStyles(size, textColor);

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  // Render content (priority: image > icon > initials)
  const renderContent = () => {
    if (imageUri) {
      return (
        <Image
          source={{ uri: imageUri }}
          style={[imageStyles, imageStyle]}
          accessibilityLabel={alt || 'Avatar image'}
        />
      );
    }

    if (icon) {
      return <View>{icon}</View>;
    }

    if (initials) {
      return <TextComponent style={textStyles}>{initials}</TextComponent>;
    }

    // Fallback: show default icon
    return <TextComponent style={textStyles}>{initials || '?'}</TextComponent>;
  };

  const content = (
    <View style={[containerStyles, style]} testID={testID}>
      {renderContent()}
    </View>
  );

  // If onPress provided, wrap in Pressable
  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [pressed && { opacity: 0.8 }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};
