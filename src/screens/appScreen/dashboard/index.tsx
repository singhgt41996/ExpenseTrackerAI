import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { AvatarComponent } from '@/components/atoms/avatar';
import { ProgressBar } from '@/components/atoms/progressBar';
import { useAuthStore } from '@/store/authStore';
import { ExpenseTabParamList } from '@/navigation/types';
import { useTransactionStore, Transaction } from '@/store/transactionStore';
import { CATEGORY_META } from '@/constants/categories';
import { borderRadius, colors, getShadows, spacing } from '@/theme';

const MONTHLY_INCOME = 100000;

type DashboardNav = BottomTabNavigationProp<ExpenseTabParamList, 'Home'>;

export const DashboardScreen = () => {
  const navigation = useNavigation<DashboardNav>();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const transactions = useTransactionStore(state => state.transactions);

  // Derive everything from the transactions list (single source of truth).
  const { categories, totalSpent } = useMemo(() => {
    const totals = transactions
      .filter(t => t.amount < 0)
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + Math.abs(t.amount);
        return acc;
      }, {});

    const total = Object.values(totals).reduce((a, b) => a + b, 0);

    const cats = Object.entries(totals).map(([key, amount]) => ({
      key,
      amount,
      ...CATEGORY_META[key],
    }));

    return { categories: cats, totalSpent: total };
  }, [transactions]);

  const budgetLeft = MONTHLY_INCOME - totalSpent;

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // logout force-clears on failure
    }
  };

  return (
    <ScreenWrapper
      padded
      edges={['top']}
      backgroundColor={colors.neutral.gray[50]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
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
                June 2026
              </TextComponent>
            </View>
          </View>
          <IconComponent
            name="logout"
            family="MaterialIcons"
            color={colors.neutral.gray[700]}
            onPress={handleLogout}
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
            <TextComponent variant="bodySmall" color={colors.primary[100]}>
              Income ₹ {MONTHLY_INCOME.toLocaleString('en-IN')}
            </TextComponent>
            <TextComponent variant="bodySmall" color={colors.primary[100]}>
              Budget left ₹ {budgetLeft.toLocaleString('en-IN')}
            </TextComponent>
          </View>
          <View style={styles.summaryBar}>
            <ProgressBar
              value={totalSpent}
              max={MONTHLY_INCOME}
              color={colors.neutral.white}
            />
          </View>
        </View>

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
            <TextComponent variant="bodySmall" color={colors.primary[600]}>
              See all
            </TextComponent>
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
            <TextComponent variant="bodySmall" color={colors.primary[600]}>
              See all
            </TextComponent>
          </View>
          <View>
            {transactions.map(t => (
              <TransactionRow key={t.id} txn={t} />
            ))}
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

const TransactionRow = ({ txn }: { txn: Transaction }) => {
  const meta = CATEGORY_META[txn.category] ?? CATEGORY_META.other;
  const isIncome = txn.amount > 0;

  return (
    <View style={styles.txnRow}>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
  summaryBar: {
    marginTop: spacing.sm,
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
