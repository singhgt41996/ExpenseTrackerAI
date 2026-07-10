import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}
// Shape we send when creating a transaction (user_id + occurred_at are set by the DB).
export interface NewTransaction {
  title: string;
  amount: number;
  category: string;
}

// DB row (snake_case) -> app shape (camelCase / display date)

const mapRow = (row: any) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  amount: Number(row.amount),
  date: format(new Date(row.occurred_at), 'MMM dd'),
});

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
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
  const { data, error } = await supabase
    .from('transactions')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return mapRow(data);
}

export async function deleteTransactionById(id: string): Promise<void> {
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw error;
}
