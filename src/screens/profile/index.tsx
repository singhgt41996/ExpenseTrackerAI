import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { AvatarComponent } from '@/components/atoms/avatar';
import { IconComponent } from '@/components/atoms/icon';
import { InputComponent } from '@/components/atoms/input';
import { ButtonComponent } from '@/components/atoms/button';
import { useAuthStore } from '@/store/authStore';
import { useMonthlyIncome, useUpdateMonthlyIncome } from '@/hooks/useIncome';
import { borderRadius, colors, getShadows, spacing } from '@/theme';

export const ProfileScreen = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  // Editing this month's row is what the fallback in fetchIncomeForMonth
  // reads forward from, so it doubles as "update my salary going forward".
  const currentMonth = new Date();
  const { data: income, isLoading: isLoadingIncome } =
    useMonthlyIncome(currentMonth);
  const { mutate: updateIncome, isPending: isSavingIncome } =
    useUpdateMonthlyIncome();

  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [incomeInput, setIncomeInput] = useState('');

  const startEditingIncome = () => {
    setIncomeInput(income != null ? String(income) : '');
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

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // logout force-clears local state even if the Supabase call fails
    }
  };

  const initials = user?.name?.trim()?.charAt(0)?.toUpperCase();

  return (
    <ScreenWrapper
      padded
      edges={['bottom']}
      backgroundColor={colors.neutral.gray[50]}
    >
      <View style={styles.container}>
        <View style={styles.userCard}>
          <AvatarComponent size="lg" initials={initials} />
          <View style={styles.userInfo}>
            <TextComponent variant="h3" color={colors.neutral.gray[900]}>
              {user?.name ?? 'there'}
            </TextComponent>
            <TextComponent variant="bodySmall" color={colors.neutral.gray[600]}>
              {user?.email}
            </TextComponent>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TextComponent variant="h3" color={colors.neutral.gray[900]}>
              Monthly Income
            </TextComponent>
            {!isEditingIncome && (
              <IconComponent
                name="edit"
                family="MaterialIcons"
                onPress={startEditingIncome}
              />
            )}
          </View>

          {isEditingIncome ? (
            <View style={styles.editRow}>
              <InputComponent
                value={incomeInput}
                onChangeText={setIncomeInput}
                keyboardType="numeric"
                placeholder="e.g. 100000"
                autoFocus
              />
              <View style={styles.editActions}>
                <ButtonComponent
                  title="Cancel"
                  variant="outline"
                  size="md"
                  onPress={() => setIsEditingIncome(false)}
                  style={styles.editActionButton}
                />
                <ButtonComponent
                  title="Save"
                  variant="primary"
                  size="md"
                  onPress={handleSaveIncome}
                  loadingState={isSavingIncome}
                  style={styles.editActionButton}
                />
              </View>
            </View>
          ) : (
            <TextComponent variant="h2" color={colors.primary[600]}>
              {isLoadingIncome
                ? '...'
                : income != null
                ? `₹ ${income.toLocaleString('en-IN')}`
                : 'Not set'}
            </TextComponent>
          )}
        </View>

        <ButtonComponent
          title="Log Out"
          variant="outline"
          size="lg"
          fullWidth
          onPress={handleLogout}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.lg,
    paddingTop: spacing.lg,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  userInfo: {
    gap: spacing.xs,
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...getShadows('md'),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editRow: {
    gap: spacing.md,
  },
  editActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  editActionButton: {
    flex: 1,
  },
});
