import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { AvatarComponent } from '@/components/atoms/avatar';
import { ProgressBar } from '@/components/atoms/progressBar';
import { InputComponent } from '@/components/atoms/input';
import { ButtonComponent } from '@/components/atoms/button';
import { useAuthStore } from '@/store/authStore';
import {
  AppStackParamList,
  ExpenseTabParamList,
  ExpenseTrackerParamList,
} from '@/navigation/types';
import { useDeleteTransaction, useTransactions } from '@/hooks/useTransactions';
import { useMonthlyIncome, useUpdateMonthlyIncome } from '@/hooks/useIncome';
import { deriveCategoryTotals } from '@/utils/categoryTotals';
import { CATEGORY_META } from '@/constants/categories';
import { borderRadius, colors, getShadows, spacing } from '@/theme';
import { Transaction } from '@/services/transactionService';
import { monthKey, monthLabel } from '@/utils/date';
// Three levels deep: Tab (Home) -> ExpenseTracker stack -> AppStack (where Hub lives).
// `navigate('Hub')` at runtime bubbles up the navigator tree on its own either way,
// but this is what lets TypeScript know 'Hub' is actually a valid target.
type DashboardNav = CompositeNavigationProp<
  BottomTabNavigationProp<ExpenseTabParamList, 'Home'>,
  CompositeNavigationProp<
    NativeStackNavigationProp<ExpenseTrackerParamList>,
    NativeStackNavigationProp<AppStackParamList>
  >
>;

export const HomeScreen = () => {
  const navigation = useNavigation<DashboardNav>();
  const user = useAuthStore(state => state.user);
  const currentMonth = useMemo(() => new Date(), []);
  const {
    data: Transactions = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useTransactions(monthKey(currentMonth));
  const { mutate: deleteTransaction, isPending: isDeleting } =
    useDeleteTransaction();
  const {
    data: monthlyIncome,
    isLoading: isLoadingIncome,
    refetch: refetchIncome,
  } = useMonthlyIncome(currentMonth);
  const income = monthlyIncome ?? 0;
  const { mutate: updateIncome, isPending: isSavingIncome } =
    useUpdateMonthlyIncome();

  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [incomeInput, setIncomeInput] = useState('');

  // Derive everything from the transactions list (single source of truth) —
  // shared with the category breakdown screen via deriveCategoryTotals.
  const { categories, totalSpent } = useMemo(
    () => deriveCategoryTotals(Transactions),
    [Transactions],
  );

  const budgetLeft = income - totalSpent;

  // Logging out now lives on the Profile tab; this just jumps back to the
  // module switcher. Stack.navigate('Hub') pops back to the existing Hub
  // screen already on the stack instead of pushing a duplicate.
  const handleGoToHub = () => {
    navigation.navigate('Hub');
  };

  const handleDeleteTransaction = (txn: Transaction) => {
    Alert.alert(
      'Delete transaction',
      `Remove "${txn.title}" from your transactions?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTransaction(txn.id),
        },
      ],
    );
  };

  const handleEditTransaction = (txn: Transaction) => {
    navigation.navigate('ExpenseDetail', {
      id: txn.id,
      month: monthKey(currentMonth),
    });
  };

  const startEditingIncome = () => {
    setIncomeInput(income > 0 ? String(income) : '');
    setIsEditingIncome(true);
  };

  const handleSaveIncome = () => {
    const parsed = Number(incomeInput);
    if (!incomeInput.trim() || Number.isNaN(parsed) || parsed < 0) {
      Alert.alert('Invalid amount', 'Enter a valid monthly income.');
      return;
    }
    updateIncome(
      { monthDate: currentMonth, income: parsed },
      { onSuccess: () => setIsEditingIncome(false) },
    );
  };

  if (isLoading) {
    return (
      <ScreenWrapper
        padded
        edges={['top']}
        backgroundColor={colors.neutral.gray[50]}
      >
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      padded
      edges={['top']}
      backgroundColor={colors.neutral.gray[50]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={() => {
              refetch(), refetchIncome();
            }}
            tintColor={colors.primary[500]}
            colors={[colors.primary[500]]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userDetails}>
            <AvatarComponent />
            <View>
              <TextComponent
                variant="bodySmall"
                color={colors.neutral.gray[600]}
              >
                Hi, {user?.name ?? 'there'}
              </TextComponent>
              <TextComponent variant="h3" color={colors.neutral.gray[900]}>
                {monthLabel(currentMonth)}
              </TextComponent>
            </View>
          </View>
          <IconComponent
            name="apps"
            family="MaterialIcons"
            color={colors.neutral.gray[700]}
            onPress={handleGoToHub}
          />
        </View>

        {/* Summary card */}
        <View style={styles.summaryCard}>
          <TextComponent variant="overline" color={colors.primary[100]}>
            TOTAL SPENT THIS MONTH
          </TextComponent>
          <TextComponent variant="h1" color={colors.neutral.white}>
            ₹ {totalSpent.toLocaleString('en-IN')}
          </TextComponent>
          <View style={styles.summaryRow}>
            <View style={styles.incomeLabel}>
              <TextComponent variant="bodySmall" color={colors.primary[100]}>
                Income{' '}
                {isLoadingIncome
                  ? '...'
                  : income > 0
                  ? `₹ ${income.toLocaleString('en-IN')}`
                  : 'Not set'}
              </TextComponent>
              {!isEditingIncome && (
                <IconComponent
                  name="edit"
                  family="MaterialIcons"
                  size="sm"
                  color={colors.neutral.white}
                  onPress={startEditingIncome}
                />
              )}
            </View>
            <TextComponent variant="bodySmall" color={colors.primary[100]}>
              Budget left ₹ {budgetLeft.toLocaleString('en-IN')}
            </TextComponent>
          </View>
          <View style={styles.summaryBar}>
            <ProgressBar
              value={totalSpent}
              max={income > 0 ? income : totalSpent || 1}
              color={colors.neutral.white}
            />
          </View>
          {income === 0 && !isLoadingIncome && !isEditingIncome ? (
            <TextComponent variant="caption" color={colors.primary[100]}>
              Tap the pencil above to set your monthly income.
            </TextComponent>
          ) : null}
        </View>

        {isEditingIncome && (
          <View style={styles.incomeEditCard}>
            <TextComponent
              variant="labelMedium"
              color={colors.neutral.gray[700]}
            >
              Monthly Income
            </TextComponent>
            <InputComponent
              value={incomeInput}
              onChangeText={setIncomeInput}
              keyboardType="numeric"
              placeholder="e.g. 100000"
              required={false}
              autoFocus
            />
            <View style={styles.incomeEditActions}>
              <ButtonComponent
                title="Cancel"
                variant="outline"
                size="md"
                onPress={() => setIsEditingIncome(false)}
                style={styles.incomeEditButton}
              />
              <ButtonComponent
                title="Save"
                variant="primary"
                size="md"
                onPress={handleSaveIncome}
                loadingState={isSavingIncome}
                style={styles.incomeEditButton}
              />
            </View>
          </View>
        )}

        {/* Quick stats */}
        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <TextComponent variant="caption" color={colors.neutral.gray[500]}>
              Today
            </TextComponent>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[900]}
            >
              ₹ 820
            </TextComponent>
          </View>
          <View style={styles.statCard}>
            <TextComponent variant="caption" color={colors.neutral.gray[500]}>
              This week
            </TextComponent>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[900]}
            >
              ₹ 6,120
            </TextComponent>
          </View>
          <View style={styles.statCard}>
            <TextComponent variant="caption" color={colors.neutral.gray[500]}>
              Avg/day
            </TextComponent>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[900]}
            >
              ₹ 819
            </TextComponent>
          </View>
        </View>

        {/* Spending by category */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <TextComponent variant="h3" color={colors.neutral.gray[900]}>
              Spending by category
            </TextComponent>
            <Pressable onPress={() => navigation.navigate('CategoryBreakdown')}>
              <TextComponent variant="bodySmall" color={colors.primary[600]}>
                See all
              </TextComponent>
            </Pressable>
          </View>
          <View style={styles.categoryList}>
            {categories.map(c => (
              <CategoryRow
                key={c.key}
                icon={c.icon}
                label={c.label}
                amount={c.amount}
                color={c.color}
                max={totalSpent}
              />
            ))}
          </View>
        </View>

        {/* Recent transactions */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <TextComponent variant="h3" color={colors.neutral.gray[900]}>
              Recent transactions
            </TextComponent>
            <Pressable onPress={() => navigation.navigate('AllTransactions')}>
              <TextComponent variant="bodySmall" color={colors.primary[600]}>
                See all
              </TextComponent>
            </Pressable>
          </View>
          <View>
            {!isError ? (
              Transactions.map(t => (
                <TransactionRow
                  key={t.id}
                  txn={t}
                  disabled={isDeleting}
                  onPress={() => handleEditTransaction(t)}
                  onLongPress={() => handleDeleteTransaction(t)}
                />
              ))
            ) : (
              <TextComponent variant="bodymedium" color={colors.error.light}>
                {error.message}
              </TextComponent>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Floating action button */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <IconComponent
          name="add"
          family="MaterialIcons"
          size="lg"
          color={colors.neutral.white}
        />
      </Pressable>
    </ScreenWrapper>
  );
};

// ----- Row components -----
const CategoryRow = ({
  icon,
  label,
  amount,
  max,
  color,
}: {
  icon: string;
  label: string;
  amount: number;
  max: number;
  color: string;
}) => {
  return (
    <View style={styles.catRow}>
      <View style={[styles.catIcon, { backgroundColor: color + '22' }]}>
        <IconComponent
          name={icon}
          family="MaterialIcons"
          size="sm"
          color={color}
        />
      </View>
      <View style={styles.catBody}>
        <View style={styles.catTop}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[900]}>
            {label}
          </TextComponent>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[900]}>
            ₹ {amount.toLocaleString('en-IN')}
          </TextComponent>
        </View>
        <ProgressBar value={amount} max={max} color={color} />
      </View>
    </View>
  );
};

const TransactionRow = ({
  txn,
  onPress,
  onLongPress,
  disabled,
}: {
  txn: Transaction;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
}) => {
  const meta = CATEGORY_META[txn.category] ?? CATEGORY_META.other;
  const isIncome = txn.amount > 0;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={({ pressed }) => [styles.txnRow, pressed && styles.txnRowPressed]}
    >
      <View style={[styles.catIcon, { backgroundColor: meta.color + '22' }]}>
        <IconComponent
          name={meta.icon}
          family="MaterialIcons"
          size="sm"
          color={meta.color}
        />
      </View>
      <View style={styles.txnBody}>
        <TextComponent variant="bodyMedium" color={colors.neutral.gray[900]}>
          {txn.title}
        </TextComponent>
        <TextComponent variant="caption" color={colors.neutral.gray[500]}>
          {txn.date}
        </TextComponent>
      </View>
      <TextComponent
        variant="bodyMedium"
        color={isIncome ? colors.success.main : colors.error.main}
      >
        {isIncome ? '+' : '-'} ₹ {Math.abs(txn.amount).toLocaleString('en-IN')}
      </TextComponent>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xxxl * 2, // room so the FAB never covers content
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.primary[600],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
    ...getShadows('md'),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  incomeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  summaryBar: {
    marginTop: spacing.sm,
  },
  incomeEditCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...getShadows('md'),
  },
  incomeEditActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  incomeEditButton: {
    flex: 1,
  },
  quickStats: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.xs,
    ...getShadows('sm'),
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...getShadows('md'),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryList: {
    gap: spacing.md,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  catIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catBody: {
    flex: 1,
    gap: spacing.xs,
  },
  catTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  txnRowPressed: {
    opacity: 0.6,
  },
  txnBody: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    ...getShadows('lg'),
  },
  fabPressed: {
    opacity: 0.7,
  },
});
