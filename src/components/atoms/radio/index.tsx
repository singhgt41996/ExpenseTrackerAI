import { Pressable, View } from 'react-native';
import React from 'react';
import { RadioButtonProps } from '@/components/atoms/radio/types';
import {
  getRadioContainerStyles,
  getRadioInnerCircleStyles,
  getRadioLabelStyles,
  getRadioStyles,
} from '@/components/atoms/radio/styles';
import { TextComponent } from '@/components/atoms/text';

export const RadioButton = ({
  selected = false,
  onChange,
  size = 24,
  label,
  disabled = false,
  error = false,
  testId,
}: RadioButtonProps) => {
  const containerStyles = getRadioContainerStyles();
  const radioContainerStyles = getRadioStyles(selected, disabled, error, size);
  const radioInnerCircleStyles = getRadioInnerCircleStyles(size);
  const labelStyles = getRadioLabelStyles(error, disabled);

  return (
    <Pressable
      onPress={() => !disabled && onChange(!selected)}
      disabled={disabled}
      testID={testId}
      style={containerStyles}
    >
      <View style={radioContainerStyles}>
        {selected && <View style={radioInnerCircleStyles}></View>}
      </View>
      {label && <TextComponent style={labelStyles}>{label}</TextComponent>}
    </Pressable>
  );
};
