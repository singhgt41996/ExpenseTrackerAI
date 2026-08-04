import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { startOfMonth } from 'date-fns';

import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { ProgressBar } from '@/components/atoms/progressBar';
import { MonthPicker } from '@/components/molecules/monthPicker';
import { ExpenseTrackerParamList } from '@/navigation/types';
import { useTransactions } from '@/hooks/useTransactions';
import { deriveCategoryTotals, CategoryTotal } from '@/utils/categoryTotals';
import { borderRadius, colors, getShadows, spacing } from '@/theme';
import { monthKey, monthLabel } from '@/utils/date';

type CategoryBreakdownScreenProps = NativeStackScreenProps<
  ExpenseTrackerParamList,
  'CategoryBreakdown'
>;

export const CategoryBreakdownScreen = ({
  navigation,
}: CategoryBreakdownScreenProps) => {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    startOfMonth(new Date()),
  );

  const { data: transactions = [], isLoading } = useTransactions(
    monthKey(selectedMonth),
  );

  const { categories, totalSpent } = useMemo(
    () => deriveCategoryTotals(transactions),
    [transactions],
  );

  return (
    <ScreenWrapper padded edges={['bottom']} backgroundColor={colors.neutral.gray[50]}>
      <MonthPicker
        value={selectedMonth}
        onChange={setSelectedMonth}
        maximumDate={new Date()}
      />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
        </View>
      ) : categories.length === 0 ? (
        <View style={styles.centered}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[500]}>
            No spending in {monthLabel(selectedMonth)}.
          </TextComponent>
        </View>
      ) : (
        <>
          <View style={styles.totalCard}>
            <TextComponent variant="overline" color={colors.neutral.gray[500]}>
              TOTAL SPENT
            </TextComponent>
            <TextComponent variant="h1" color={colors.neutral.gray[900]}>
              ₹ {totalSpent.toLocaleString('en-IN')}
            </TextComponent>
          </View>

          <View style={styles.list}>
            {categories.map(c => (
              <CategoryBreakdownRow
                key={c.key}
                category={c}
                totalSpent={totalSpent}
                onPress={() =>
                  navigation.navigate('AllTransactions', { category: c.key })
                }
              />
            ))}
          </View>
        </>
      )}
    </ScreenWrapper>
  );
};

const CategoryBreakdownRow = ({
  category,
  totalSpent,
  onPress,
}: {
  category: CategoryTotal;
  totalSpent: number;
  onPress: () => void;
}) => {
  const percent = totalSpent > 0 ? Math.round((category.amount / totalSpent) * 100) : 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={[styles.icon, { backgroundColor: category.color + '22' }]}>
        <IconComponent
          name={category.icon}
          family="MaterialIcons"
          size="sm"
          color={category.color}
        />
      </View>
      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[900]}>
            {category.label}
          </TextComponent>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[900]}>
            ₹ {category.amount.toLocaleString('en-IN')}
          </TextComponent>
        </View>
        <ProgressBar value={category.amount} max={totalSpent} color={category.color} />
        <TextComponent variant="caption" color={colors.neutral.gray[500]}>
          {percent}% of total spend
        </TextComponent>
      </View>
      <IconComponent
        name="chevron-right"
        family="MaterialIcons"
        size="sm"
        color={colors.neutral.gray[400]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
    marginBottom: spacing.lg,
    ...getShadows('md'),
  },
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...getShadows('sm'),
  },
  rowPressed: {
    opacity: 0.7,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: {
    flex: 1,
    gap: spacing.xs,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
