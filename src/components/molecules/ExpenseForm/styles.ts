import { colors } from '@/theme/colors';
import { borderRadius, spacing } from '@/theme/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  form: { gap: spacing.md },
  pickerLabel: { marginBottom: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.neutral.gray[300],
    backgroundColor: colors.neutral.white,
  },
  pickerError: { marginTop: spacing.xs },
});
