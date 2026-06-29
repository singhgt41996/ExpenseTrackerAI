import React, { use, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { ButtonComponent } from '@/components/atoms/button';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing } from '@/theme';
import { useFocusEffect } from '@react-navigation/native';
import { AvatarComponent } from '@/components/atoms/avatar';

export const DashboardScreen = () => {
  const { user, logout } = useAuthStore(state => state);

  useEffect(() => {
    console.log('user details in useEffect', user);
    return () => console.log('clear Funtion of use callback');
  }, []);
  useFocusEffect(
    useCallback(() => {
      console.log('user details in use Focus Effect', user);
      return () => console.log('clear Funtion of use callback');
    }, []),
  );
  useLayoutEffect(() => {
    console.log('user details in uselayout Effect', user);
    return () => console.log('clear Funtion of use callback');
  }, []);
  console.log('user details without any hook', user);
  const handleLogout = async () => {
    try {
      await logout();
      // On success, isAuthenticated flips and RootNavigator shows Auth flow.
    } catch {
      // logout already force-clears on failure
    }
  };

  const IncomeDetails = {
    remaining: 1100,
    income: 100000,
    BudgetLeft: 10000,
  };

  return (
    <ScreenWrapper padded edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userDetails}>
            <TextComponent>Hi, {user?.email}</TextComponent>
            <AvatarComponent />
          </View>
          <TextComponent> June 2026 </TextComponent>
        </View>

        <View style={styles.summaryCard}>
          <TextComponent>TOTAL SPENT THIS MONTH</TextComponent>
          <TextComponent>{IncomeDetails.remaining}</TextComponent>
          <View>
            <TextComponent>Income {IncomeDetails.income}</TextComponent>
            <TextComponent>Budget {IncomeDetails.BudgetLeft}</TextComponent>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View>
            <TextComponent>Today</TextComponent>
            <TextComponent>₹ 820</TextComponent>
          </View>
          <View>
            <TextComponent>Week</TextComponent>
            <TextComponent>₹ 6120</TextComponent>
          </View>
          <View>
            <TextComponent> Avg/day </TextComponent>
            <TextComponent>₹ 819</TextComponent>
          </View>
        </View>

        <View style={styles.spedCategory}>
          <View>
            <TextComponent>Spending by category</TextComponent>
            <TextComponent>See All</TextComponent>
          </View>
          <View></View>
        </View>

        <View>
          <TextComponent variant="h1" color={colors.neutral.gray[900]}>
            Dashboard
          </TextComponent>
          <TextComponent
            variant="bodyMedium"
            color={colors.neutral.gray[600]}
            style={styles.subtitle}
          >
            Welcome{user?.name ? `, ${user.name}` : ''}!
          </TextComponent>
          {user?.email ? (
            <TextComponent variant="bodySmall" color={colors.neutral.gray[500]}>
              {user.email}
            </TextComponent>
          ) : null}
        </View>

        <ButtonComponent
          title="Logout"
          variant="danger"
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
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
});
