import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { ExpenseTabParamList } from '@/navigation/types';
import { useAddTransaction } from '@/hooks/useTransactions';
import { colors, spacing } from '@/theme';
import {
  ExpenseForm,
  ExpenseFormValues,
} from '@/components/molecules/ExpenseForm';

type AddExpenseNav = BottomTabNavigationProp<ExpenseTabParamList, 'AddExpense'>;

export const AddExpenseScreen = () => {
  const navigation = useNavigation<AddExpenseNav>();
  const { mutate: addTransaction, isPending } = useAddTransaction();
  const [formKey, setFormKey] = useState(0);

  const onSubmit = (data: ExpenseFormValues) => {
    addTransaction(
      {
        title: data.title.trim(),
        category: data.category,
        amount: -Number(data.amount),
        description: data.description?.trim() || undefined,
        occurredAt: data.date,
      },
      {
        onSuccess: () => {
          setFormKey(k => k + 1); // remounts ExpenseForm -> fresh, blank fields
          navigation.navigate('Home');
        },
      },
    );
  };

  return (
    <ScreenWrapper
      padded
      edges={['bottom']}
      backgroundColor={colors.neutral.gray[50]}
    >
      <View style={styles.container}>
        <ExpenseForm
          key={formKey}
          defaultValues={{
            title: '',
            amount: '',
            category: '',
            description: '',
            date: new Date(),
          }}
          onSubmit={onSubmit}
          isSubmitting={isPending}
          submitLabel="Add Expense"
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: spacing.lg, paddingTop: spacing.lg },
});
