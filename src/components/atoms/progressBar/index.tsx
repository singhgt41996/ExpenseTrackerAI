import { View, StyleSheet } from 'react-native';
import React from 'react';
import { borderRadius, colors } from '@/theme';

export interface ProgresBarProps {
  value: number;
  max: number;
  color: string;
}

export const ProgressBar = ({ value, max, color }: ProgresBarProps) => {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <View style={styles.track}>
      <View
        style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.gray[200],
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});
