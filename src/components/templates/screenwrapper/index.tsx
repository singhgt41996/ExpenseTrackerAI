import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getScreenContainerStyles } from '@/components/templates/screenwrapper/styles';
import { ScreenWrapperProps } from '@/components/templates/screenwrapper/types';
import { colors } from '@/theme';

export const ScreenWrapper = ({
  children,
  edges = ['top', 'bottom'],
  backgroundColor = colors.neutral.white,
  barStyle = 'dark-content',
  statusBarColor,
  padded = false,
  style,
}: ScreenWrapperProps) => {
  const containerStyles = getScreenContainerStyles(backgroundColor, padded);
  return (
    <SafeAreaView style={[containerStyles, style]} edges={edges}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={statusBarColor ?? backgroundColor}
      />
      {children}
    </SafeAreaView>
  );
};
