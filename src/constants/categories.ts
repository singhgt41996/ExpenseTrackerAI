import { colors } from '@/theme';

export interface CategoryMeta {
  label: string;
  icon: string; // MaterialIcons name
  color: string;
}

/**
 * Single source of truth for category display info.
 * Used by the Dashboard (icons/colors) and the AddExpense picker.
 */
export const CATEGORY_META: Record<string, CategoryMeta> = {
  food: { label: 'Food', icon: 'restaurant', color: colors.primary[500] },
  travel: { label: 'Travel', icon: 'local-taxi', color: colors.secondary[500] },
  shopping: { label: 'Shopping', icon: 'shopping-bag', color: colors.warning.main },
  other: { label: 'Other', icon: 'movie', color: colors.neutral.gray[500] },
  income: { label: 'Income', icon: 'payments', color: colors.success.main },
};

/** Categories the user can pick when adding an expense (income excluded). */
export const EXPENSE_CATEGORIES = ['food', 'travel', 'shopping', 'other'] as const;
