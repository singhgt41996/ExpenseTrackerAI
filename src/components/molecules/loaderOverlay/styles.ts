import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.neutral.white,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minWidth: 140,
  },
  message: {
    marginTop: spacing.sm,
  },
});
