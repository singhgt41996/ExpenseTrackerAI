import { CATEGORY_META } from '@/constants/categories';
import { Transaction } from '@/services/transactionService';

export interface CategoryTotal {
  key: string;
  amount: number;
  label: string;
  icon: string;
  color: string;
}

/**
 * Groups a month's transactions into per-category spend totals. Shared by the
 * Dashboard's "Spending by category" card and the full category breakdown
 * screen, so the numbers on both screens can never drift apart.
 */

export const deriveCategoryTotals = (
  transaction: Transaction[],
): { categories: CategoryTotal[]; totalSpent: number } => {
  const totals = transaction
    .filter(t => t.amount < 0)
    .reduce<Record<string, number>>((accu, t) => {
      accu[t.category] = (accu[t.category] ?? 0) + Math.abs(t.amount);
      return accu;
    }, {});
  const totalSpent = Object.values(totals).reduce((a, b) => a + b, 0);
  const categories = Object.entries(totals)
    .map(([key, amount]) => ({
      key,
      amount,
      ...(CATEGORY_META[key] ?? CATEGORY_META.other),
    }))
    .sort((a, b) => a.amount - b.amount);
  return { categories, totalSpent };
};
