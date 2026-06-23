import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { ButtonComponent } from '@/components/atoms/button';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing } from '@/theme';

export const DashboardScreen = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      // On success, isAuthenticated flips and RootNavigator shows Auth flow.
    } catch {
      // logout already force-clears on failure
    }
  };

  return (
    <ScreenWrapper padded edges={['top']}>
      <View style={styles.container}>
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
