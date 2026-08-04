import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { ExpenseTrackerParamList } from '@/navigation/types';
import { colors, spacing } from '@/theme';
import { useTransactions, useUpdateTransaction } from '@/hooks/useTransactions';
import {
  ExpenseForm,
  ExpenseFormValues,
} from '@/components/molecules/ExpenseForm';

type EditExpenseScreenProps = NativeStackScreenProps<
  ExpenseTrackerParamList,
  'EditExpense'
>;

export const EditExpenseScreen = ({
  navigation,
  route,
}: EditExpenseScreenProps) => {
  const { id, month } = route.params;
  const { data: Transactions = [] } = useTransactions(month);
  const { mutate: updateTransaction, isPending } = useUpdateTransaction();

  const txn = Transactions.find(t => t.id === id);

  if (!txn) {
    return (
      <ScreenWrapper
        padded
        edges={['bottom']}
        backgroundColor={colors.neutral.gray[50]}
      >
        <TextComponent variant="bodyMedium" color={colors.neutral.gray[600]}>
          Transaction not found.
        </TextComponent>
      </ScreenWrapper>
    );
  }

  const onSubmit = (data: ExpenseFormValues) => {
    updateTransaction(
      {
        id: txn.id,
        title: data.title.trim(),
        category: data.category,
        amount: -Number(data.amount),
        description: data.description?.trim() || undefined,
        occurredAt: data.date,
      },
      { onSuccess: () => navigation.goBack() },
    );
  };

  return (
    <ScreenWrapper
      edges={['bottom']}
      padded
      backgroundColor={colors.neutral.gray[50]}
    >
      <View style={styles.container}>
        <ExpenseForm
          defaultValues={{
            title: txn.title,
            amount: String(Math.abs(txn.amount)),
            category: txn.category,
            description: txn.description,
            date: txn.occurredAt,
          }}
          onSubmit={onSubmit}
          isSubmitting={isPending}
          submitLabel="Save Changes"
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
});
