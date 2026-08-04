import { Transaction } from '@/services/transactionService';
import { format, getDate, getDaysInMonth, startOfMonth } from 'date-fns';

export interface DailyTotal {
  day: number;
  amount: number;
  label: string;
}

/**
 * One bar per day of the month. Days with no spend stay at 0 so the chart
 * width always matches the calendar (no missing bars that look like "holes").
 */

export const deriveDailyTotals = (
  transaction: Transaction[],
  monthDate: Date,
): DailyTotal[] => {
  const daysInMonth = getDaysInMonth(monthDate);
  const monthStart = startOfMonth(monthDate);

  const byDay: Record<number, number> = {};
  for (let d = 1; d <= daysInMonth; d++) byDay[d] = 0;

  transaction
    .filter(t => t.amount < 0)
    .forEach(t => {
      if (format(t.occurredAt, 'yyyy-MM') !== format(monthStart, 'yyyy-MM'))
        return;
      const day = t.occurredAt.getDate();
      byDay[day] = (byDay[day] ?? 0) + Math.abs(t.amount);
    });

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    return {
      day: day,
      amount: byDay[day],
      // show label every 5 days + first/last to avoid x-axis clutter
      label: day === 1 || day % 5 === 0 ? String(day) : '',
    };
  });
};
