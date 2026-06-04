import { View, Text } from 'react-native';
import React from 'react';
import { SpacerProps } from '@/components/atoms/spacer/types';
import { getSpacerStyles } from '@/components/atoms/spacer/styles';

export const SpacerComponent = ({
  size = 'md',
  direction = 'vertical',
}: SpacerProps) => {
  const getSpacing = getSpacerStyles(size, direction);

  return <View style={getSpacing}></View>;
};
