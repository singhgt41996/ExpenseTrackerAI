import { format, startOfMonth, addMonths } from 'date-fns';

/** Canonical string key for a month, e.g. '2026-07'. Used as part of React Query cache keys. */
export const monthKey = (date: Date): string => format(date, 'yyyy-MM');

/** Human label for a month, e.g. 'July 2026'. */
export const monthLabel = (date: Date): string => format(date, 'MMMM yyyy');

/**
 * Half-open [start, end) range covering every instant in the given month.
 * Use `.gte(start)` and `.lt(end)` when filtering a Supabase query by month —
 * half-open avoids double-counting the exact midnight boundary between two months.
 */
export const getMonthRange = (date: Date): { start: Date; end: Date } => ({
  start: startOfMonth(date),
  end: startOfMonth(addMonths(date, 1)),
});

/** Parses a 'yyyy-MM' key back into a real Date (the 1st of that month). */
export const parseMonthKey = (key: string): Date => new Date(`${key}-01T00:00:00`);
