import { supabase } from '@/lib/supabase';
import { format, startOfMonth } from 'date-fns';

const toMonthColumn = (date: Date): string => format(startOfMonth(date), 'yyyy-MM-dd');

/**
 * Income for the given month. If that exact month has no row yet (e.g. you
 * just rolled into a new month and haven't touched it), falls back to the
 * most recent earlier month's value — salary usually doesn't change monthly,
 * so you only re-enter it when it actually does. Returns null if nothing has
 * ever been set.
 */
export async function fetchIncomeForMonth(monthDate: Date): Promise<number | null> {
  const monthColumn = toMonthColumn(monthDate);

  const { data: exact, error: exactError } = await supabase
    .from('monthly_income')
    .select('income')
    .eq('month', monthColumn)
    .maybeSingle();

  if (exactError) throw exactError;
  if (exact) return Number(exact.income);

  const { data: fallback, error: fallbackError } = await supabase
    .from('monthly_income')
    .select('income')
    .lt('month', monthColumn)
    .order('month', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fallbackError) throw fallbackError;
  return fallback ? Number(fallback.income) : null;
}

export async function upsertMonthlyIncome(
  monthDate: Date,
  income: number,
): Promise<void> {
  const monthColumn = toMonthColumn(monthDate);

  const { error } = await supabase
    .from('monthly_income')
    .upsert({ month: monthColumn, income }, { onConflict: 'user_id,month' });

  if (error) throw error;
}
