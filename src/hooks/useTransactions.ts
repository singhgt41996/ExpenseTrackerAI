import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchTransactions,
  insertTransaction,
  deleteTransactionById,
  updateTransactionById,
} from '@/services/transactionService';

// Central place for this resource's cache keys.
// `all` is a prefix of every `byMonth(x)` key, so invalidating `all` after a
// mutation busts every month's cached query in one call.
export const transactionKeys = {
  all: ['transactions'] as const,
  byMonth: (month: string) => ['transactions', month] as const,
};

// Read — scoped to a single month (month = 'yyyy-MM', see @/utils/date#monthKey)
export const useTransactions = (month: string) => {
  return useQuery({
    queryKey: transactionKeys.byMonth(month),
    queryFn: () => fetchTransactions(month),
  });
};

// Write
export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertTransaction,
    onSuccess: () => {
      //       // mark the list stale -> React Query refetches -> every screen updates
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
};

// Update Transactions

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransactionById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
};

// Deletex

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransactionById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
};
