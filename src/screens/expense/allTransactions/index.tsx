import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format, startOfMonth } from 'date-fns';

import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { MonthPicker } from '@/components/molecules/monthPicker';
import { ExpenseTrackerParamList } from '@/navigation/types';
import { useDeleteTransaction, useTransactions } from '@/hooks/useTransactions';
import { CATEGORY_META } from '@/constants/categories';
import { Transaction } from '@/services/transactionService';
import { borderRadius, colors, spacing } from '@/theme';
import { monthKey, monthLabel } from '@/utils/date';

type AllTransactionsScreenProps = NativeStackScreenProps<
  ExpenseTrackerParamList,
  'AllTransactions'
>;

export const AllTransactionsScreen = ({
  navigation,
  route,
}: AllTransactionsScreenProps) => {
  // Arriving from a category breakdown row pre-filters to just that category.
  const category = route.params?.category;
  const categoryMeta = category
    ? CATEGORY_META[category] ?? CATEGORY_META.other
    : undefined;

  const [selectedMonth, setSelectedMonth] = useState(() =>
    startOfMonth(new Date()),
  );

  const { data: monthTransactions = [], isLoading } = useTransactions(
    monthKey(selectedMonth),
  );
  const transactions = useMemo(
    () =>
      category
        ? monthTransactions.filter(t => t.category === category)
        : monthTransactions,
    [monthTransactions, category],
  );
  const { mutate: deleteTransaction, isPending: isDeleting } =
    useDeleteTransaction();

  // Query already orders by occurred_at desc, so grouping preserves that order —
  // each new day encountered starts a fresh section.
  const sections = useMemo(() => {
    const groups: { title: string; data: Transaction[] }[] = [];
    let lastKey = '';
    transactions.forEach(t => {
      const key = format(t.occurredAt, 'EEE, MMM d');
      if (key !== lastKey) {
        groups.push({ title: key, data: [] });
        lastKey = key;
      }
      groups[groups.length - 1].data.push(t);
    });
    return groups;
  }, [transactions]);

  const handleDelete = (txn: Transaction) => {
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

  return (
    <ScreenWrapper padded edges={['bottom']} backgroundColor={colors.neutral.gray[50]}>
      {categoryMeta && (
        <View style={styles.categoryBanner}>
          <View
            style={[
              styles.categoryIcon,
              { backgroundColor: categoryMeta.color + '22' },
            ]}
          >
            <IconComponent
              name={categoryMeta.icon}
              family="MaterialIcons"
              size="sm"
              color={categoryMeta.color}
            />
          </View>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[700]}>
            Showing only {categoryMeta.label}
          </TextComponent>
        </View>
      )}

      <MonthPicker
        value={selectedMonth}
        onChange={setSelectedMonth}
        maximumDate={new Date()}
      />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </View>
      ) : sections.length === 0 ? (
        <View style={styles.centered}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[500]}>
            No transactions in {monthLabel(selectedMonth)}.
          </TextComponent>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <TextComponent
              variant="labelMedium"
              color={colors.neutral.gray[500]}
              style={styles.sectionHeader}
            >
              {section.title}
            </TextComponent>
          )}
          renderItem={({ item }) => (
            <TransactionRow
              txn={item}
              disabled={isDeleting}
              onPress={() =>
                navigation.navigate('ExpenseDetail', {
                  id: item.id,
                  month: monthKey(selectedMonth),
                })
              }
              onLongPress={() => handleDelete(item)}
            />
          )}
        />
      )}
    </ScreenWrapper>
  );
};

// ----- Row (mirrors DashboardScreen's TransactionRow) -----
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
          {meta.label}
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
  categoryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.lg,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  sectionHeader: {
    backgroundColor: colors.neutral.gray[50],
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  txnRowPressed: {
    opacity: 0.6,
  },
  catIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txnBody: {
    flex: 1,
  },
});
