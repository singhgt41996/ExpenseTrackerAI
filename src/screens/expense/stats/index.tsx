import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { monthKey, monthLabel } from '@/utils/date';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { borderRadius, colors, spacing } from '@/theme';
import { deriveCategoryTotals } from '@/utils/categoryTotals';
import { TextComponent } from '@/components/atoms/text';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { ca } from 'zod/v4/locales';
import { deriveDailyTotals } from '@/utils/dailyTotals';
import { MonthPicker } from '@/components/molecules/monthPicker';

const CHART_WIDTH = Dimensions.get('window').width - spacing.lg * 2;

const StatsScreen = () => {
  const currentMonth = useMemo(() => new Date(), []);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const { data: Transaction = [] } = useTransactions(monthKey(selectedMonth));
  const { categories, totalSpent } = deriveCategoryTotals(Transaction);

  const pieData = useMemo(
    () => categories.map(cat => ({ value: cat.amount, color: cat.color })),
    [categories],
  );

  const barChartData = useMemo(() => {
    const daily = deriveDailyTotals(Transaction, selectedMonth);
    return daily.map(d => ({
      value: d.amount,
      label: d.label,
      frontColor: colors.primary[500],
      labelWidth: 24,
    }));
  }, [Transaction, selectedMonth]);

  return (
    <ScreenWrapper padded backgroundColor={colors.neutral.gray[100]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TextComponent variant="h2" color={colors.neutral.gray[900]}>
          Stats
        </TextComponent>
        <MonthPicker
          value={selectedMonth}
          onChange={setSelectedMonth}
          maximumDate={new Date()}
        />

        {categories.length === 0 ? (
          <View style={styles.centered}>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[500]}
            >
              No Spending this Month
            </TextComponent>
          </View>
        ) : (
          <>
            {/* Category donut */}
            <TextComponent variant="h3" color={colors.neutral.gray[900]}>
              By category
            </TextComponent>
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
                    <TextComponent
                      variant="h3"
                      color={colors.neutral.gray[900]}
                    >
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

            {/* Daily bars */}
            <TextComponent
              variant="h3"
              color={colors.neutral.gray[900]}
              style={styles.sectionTitle}
            >
              By day
            </TextComponent>
            <View style={styles.barWrapper}>
              <BarChart
                data={barChartData}
                width={CHART_WIDTH - 40}
                height={180}
                barWidth={8}
                spacing={2}
                roundedTop={true}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor={colors.neutral.gray[200]}
                yAxisTextStyle={{
                  color: colors.neutral.gray[500],
                  fontSize: 10,
                }}
                xAxisLabelTextStyle={{
                  color: colors.neutral.gray[500],
                  fontSize: 10,
                  width: 24, // helps some versions
                }}
                noOfSections={4}
                isAnimated
                animationDuration={600}
              />
            </View>
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxxl,
  },
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
  sectionTitle: {
    marginVertical: spacing.md,
  },
  barWrapper: {
    overflow: 'hidden',
  },
});

export default StatsScreen;
