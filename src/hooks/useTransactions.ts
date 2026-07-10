import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchTransactions,
  insertTransaction,
  deleteTransactionById,
} from '@/services/transactionService';

// Central place for this resource's cache keys.
export const transactionKeys = {
  all: ['transactions'] as const,
};

// Read
export const useTransactions = () => {
  return useQuery({
    queryKey: transactionKeys.all,
    queryFn: fetchTransactions,
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
