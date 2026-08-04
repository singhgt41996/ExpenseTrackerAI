import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Alert } from 'react-native';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { ExpenseTrackerParamList } from '@/navigation/types';
import { useDeleteTransaction, useTransactions } from '@/hooks/useTransactions';
import { CATEGORY_META } from '@/constants/categories';
import { colors, spacing, borderRadius } from '@/theme';

type ExpenseDetailScreenProps = NativeStackScreenProps<
  ExpenseTrackerParamList,
  'ExpenseDetail'
>;

export const ExpenseDetailScreen = ({
  navigation,
  route,
}: ExpenseDetailScreenProps) => {
  const { id, month } = route.params;

  // Whoever navigated here (Dashboard, All Transactions) tells us which
  // month's cache the id lives in — that list is already fetched, no refetch.
  const { data: Transactions = [] } = useTransactions(month);
  const { mutate: deleteTransaction, isPending } = useDeleteTransaction();

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

  const handleDelete = () => {
    Alert.alert('Delete Transaction', `Remove ${txn.title}`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          deleteTransaction(txn.id, { onSuccess: () => navigation.goBack() }),
      },
    ]);
  };

  const meta = CATEGORY_META[txn.category] ?? CATEGORY_META.other;
  const isIncome = txn.amount > 0;
  return (
    <ScreenWrapper
      edges={['bottom']}
      padded
      backgroundColor={colors.neutral.gray[50]}
    >
      <View style={styles.container}>
        <View style={[styles.iconWrap, { backgroundColor: meta.color + '22' }]}>
          <IconComponent
            name={meta.icon}
            family="MaterialIcons"
            size="lg"
            color={meta.color}
          />
        </View>
        <TextComponent variant="h2" color={colors.neutral.gray[600]}>
          {txn.title}
        </TextComponent>
        <TextComponent
          variant="h1"
          color={isIncome ? colors.success.main : colors.error.main}
        >
          {isIncome ? '+' : '-'} ₹{' '}
          {Math.abs(txn.amount).toLocaleString('en-IN')}
        </TextComponent>
        <TextComponent variant="bodyMedium" color={colors.neutral.gray[600]}>
          {meta.label} · {txn.date}
        </TextComponent>

        {txn.description ? (
          <View style={styles.noteCard}>
            <TextComponent variant="caption" color={colors.neutral.gray[500]}>
              Note
            </TextComponent>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[800]}
            >
              {txn.description}
            </TextComponent>
          </View>
        ) : null}

        <View style={styles.actions}>
          <IconComponent
            name="edit"
            family="MaterialIcons"
            onPress={() =>
              navigation.navigate('EditExpense', { id: txn.id, month })
            }
          />
          <IconComponent
            name="delete"
            family="MaterialIcons"
            disabled={isPending}
            onPress={handleDelete}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  noteCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral.white,
    gap: spacing.xs,
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.lg,
  },
});
