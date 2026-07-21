import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchIncomeForMonth, upsertMonthlyIncome } from '@/services/incomeService';
import { monthKey } from '@/utils/date';

export const incomeKeys = {
  all: ['income'] as const,
  byMonth: (month: string) => ['income', month] as const,
};

// Read — pass the actual Date; the key derived from it stays consistent with transactionKeys.
export const useMonthlyIncome = (monthDate: Date) => {
  return useQuery({
    queryKey: incomeKeys.byMonth(monthKey(monthDate)),
    queryFn: () => fetchIncomeForMonth(monthDate),
  });
};

export const useUpdateMonthlyIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ monthDate, income }: { monthDate: Date; income: number }) =>
      upsertMonthlyIncome(monthDate, income),
    onSuccess: () => {
      // busts every cached month (fallback logic means an old edit can affect later months too)
      queryClient.invalidateQueries({ queryKey: incomeKeys.all });
    },
  });
};
