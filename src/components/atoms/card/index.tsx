import { View, Pressable } from 'react-native';
import React from 'react';
import { getCardStyles } from './styles';
import { CardProps } from '@/components/atoms/card/types';

export const CardComponent = ({
  variant = 'elevated',
  children,
  padding,
  style,
  onPress,
  disabled = false,
  testID,
}: CardProps) => {
  const getCardStyle = getCardStyles(variant, disabled, padding);

  const Card = (
    <View style={[getCardStyle, style]} testID={testID}>
      {children}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [
          getCardStyle,
          pressed && { opacity: 0.5 },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return Card;
};
