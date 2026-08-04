import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchTransactions,
  insertTransaction,
  deleteTransactionById,
  updateTransactionById,
  Transaction,
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
    onMutate: async payload => {
      const { id, ...updates } = payload;
      await queryClient.cancelQueries({ queryKey: transactionKeys.all });

      const previous = queryClient.getQueriesData<Transaction[]>({
        queryKey: transactionKeys.all,
      });

      queryClient.setQueriesData<Transaction[]>(
        { queryKey: transactionKeys.all },
        old =>
          old
            ? old.map(t =>
                t.id === payload.id
                  ? {
                      ...t,
                      title: payload.title,
                      amount: payload.amount,
                      category: payload.category,
                      description: payload.description,
                      ...(payload.occurredAt
                        ? { occurredAt: payload.occurredAt }
                        : {}),
                    }
                  : t,
              )
            : old,
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      context?.previous.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
};

// Delete

/* 
  The 4 React Query hooks (learn these names)
  Hook	        When	                       Job
  onMutate     Right before mutationFn       Snapshot cache + apply optimistic change
  mutationFn   After onMutate                Real API call (deleteTransactionById)
  onError      If mutation fails             Rollback using the snapshot
  onSettled    Always (success or fail)      Invalidate so cache matches server
*/

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransactionById, // (id: string) => Promise
    // 1) BEFORE the network call
    onMutate: async deleteId => {
      // Stop any in-flight refetch from overwriting our optimistic edit
      await queryClient.cancelQueries({ queryKey: transactionKeys.all });

      // Snapshot: every cached month list (you key by month)
      const previous = queryClient.getQueriesData<Transaction[]>({
        queryKey: transactionKeys.all,
      });

      // Optimistically remove the id from every cached month list
      queryClient.setQueriesData<Transaction[]>(
        { queryKey: transactionKeys.all },
        old => (old ? old.filter(t => t.id !== deleteId) : old),
      );

      // Return context for rollback
      return { previous };
    },

    onError: (_err, _id, context) => {
      context?.previous.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    // 3) ALWAYS → sync with server truth
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
};
