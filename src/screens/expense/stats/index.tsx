import { View, StyleSheet } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { monthKey, monthLabel } from '@/utils/date';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { borderRadius, colors, spacing } from '@/theme';
import { deriveCategoryTotals } from '@/utils/categoryTotals';
import { TextComponent } from '@/components/atoms/text';
import { PieChart } from 'react-native-gifted-charts';

const StatsScreen = () => {
  const currentMonth = useMemo(() => new Date(), []);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const { data: Transaction = [] } = useTransactions(monthKey(selectedMonth));
  const { categories, totalSpent } = deriveCategoryTotals(Transaction);

  const pieData = categories.map(cat => ({
    value: cat.amount,
    color: cat.color,
  }));
  return (
    <ScreenWrapper padded backgroundColor={colors.neutral.gray[100]}>
      <TextComponent variant="h2" color={colors.neutral.gray[900]}>
        Stats
      </TextComponent>
      <TextComponent variant="bodyMedium" color={colors.neutral.gray[500]}>
        {monthLabel(selectedMonth)}
      </TextComponent>

      {categories.length === 0 ? (
        <View style={styles.centered}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[500]}>
            No Spending this Month
          </TextComponent>
        </View>
      ) : (
        <>
          <View style={styles.chartWrapper}>
            <PieChart
              data={pieData}
              donut
              radius={100}
              innerRadius={65}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <TextComponent
                    variant="caption"
                    color={colors.neutral.gray[500]}
                  >
                    Total
                  </TextComponent>
                  <TextComponent variant="h3" color={colors.neutral.gray[900]}>
                    {totalSpent.toLocaleString('en-IN')}
                  </TextComponent>
                </View>
              )}
            />
          </View>
          <View style={styles.legend}>
            {categories.map(c => (
              <View key={c.key} style={styles.legendRow}>
                <View style={[styles.dot, { backgroundColor: c.color }]} />
                <TextComponent
                  variant="bodyMedium"
                  color={colors.neutral.gray[900]}
                  style={styles.legendLabel}
                >
                  {c.label}
                </TextComponent>
                <TextComponent
                  variant="bodyMedium"
                  color={colors.neutral.gray[900]}
                >
                  ₹ {c.amount.toLocaleString('en-IN')}
                </TextComponent>
              </View>
            ))}
          </View>
        </>
      )}
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartWrapper: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  centerLabel: {
    alignItems: 'center',
  },
  legend: {
    gap: spacing.sm,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
  },
  legendLabel: {
    flex: 1,
  },
});

export default StatsScreen;
