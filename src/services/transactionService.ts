import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { getMonthRange, parseMonthKey } from '@/utils/date';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
  occurredAt: Date;
}
// Shape we send when creating a transaction (user_id defaults to auth.uid() in the DB;
// occurred_at defaults to now() there too, but the caller can override it — e.g. backdating an entry).
export interface NewTransaction {
  title: string;
  amount: number;
  category: string;
  description?: string;
  occurredAt?: Date;
}

export interface UpdateTransactionInput {
  id: string;
  title: string;
  amount: number;
  category: string;
  description?: string;
  occurredAt?: Date;
}

// DB row (snake_case) -> app shape (camelCase / display date)

const mapRow = (row: any) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  amount: Number(row.amount),
  date: format(new Date(row.occurred_at), 'MMM dd'),
  description: row.description ?? undefined,
  occurredAt: new Date(row.occurred_at),
});

/** month is a 'yyyy-MM' key (see @/utils/date). Only that month's rows are fetched. */
export const fetchTransactions = async (
  month: string,
): Promise<Transaction[]> => {
  const { start, end } = getMonthRange(parseMonthKey(month));

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .gte('occurred_at', start.toISOString())
    .lt('occurred_at', end.toISOString())
    .order('occurred_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
};

// export async function insertransaction(
//   input: NewTransaction,
// ): Promise<Transaction> {
//   const { data, error } = await supabase
//     .from('transactions')
//     .insert({
//       title: input.title,
//       category: input.category,
//       amount: input.amount,
//       // no user_id: the column defaults to auth.uid()
//     })
//     .select()
//     .single();

//   if (error) throw error;
//   return mapRow(data);
// }

export async function insertTransaction(
  payload: NewTransaction,
): Promise<Transaction> {
  const { occurredAt, ...rest } = payload;

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      ...rest,
      // omit entirely when not provided -> DB default (now()) kicks in
      ...(occurredAt ? { occurred_at: occurredAt.toISOString() } : {}),
    })
    .select()
    .single();

  if (error) throw error;
  return mapRow(data);
}

export async function updateTransactionById(
  payload: UpdateTransactionInput,
): Promise<Transaction> {
  const { id, occurredAt, ...rest } = payload;

  const { data, error } = await supabase
    .from('transactions')
    .update({
      ...rest,
      ...(occurredAt ? { occurred_at: occurredAt.toISOString() } : {}),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapRow(data);
}

export async function deleteTransactionById(id: string): Promise<void> {
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw error;
}
