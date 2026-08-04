import { ButtonComponent } from '@/components/atoms/button';
import { IconComponent } from '@/components/atoms/icon';
import { InputComponent } from '@/components/atoms/input';
import { TextComponent } from '@/components/atoms/text';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { AuthStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { borderRadius, colors, getShadows, spacing } from '@/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, isLoading, login } = useAuthStore(state => state);

  const onHandleLogin = async () => {
    try {
      await login(email.trim(), password);
    } catch {}
  };

  useEffect(() => {
    return () => useAuthStore.getState().clearError();
  }, []);

  return (
    <ScreenWrapper
      edges={['top', 'bottom']}
      padded
      backgroundColor={colors.neutral.gray[50]}
    >
      <View style={styles.container}>
        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.brandBadge}>
            <IconComponent
              name="account-balance-wallet"
              family="MaterialIcons"
              size="xl"
              color={colors.primary[600]}
            />
          </View>
          <TextComponent variant="h2" color={colors.primary[700]} bold>
            FinFlow
          </TextComponent>
        </View>

        {/* Heading */}
        <TextComponent
          variant="h1"
          color={colors.neutral.gray[900]}
          align="center"
        >
          Welcome Back
        </TextComponent>
        <TextComponent
          variant="bodyMedium"
          color={colors.neutral.gray[600]}
          align="center"
          style={styles.subtitle}
        >
          Log in to continue to FinFlow
        </TextComponent>

        {/* Form card */}
        <View style={styles.card}>
          <InputComponent
            value={email}
            placeholder="your@example.com"
            onChangeText={setEmail}
            label="Email"
            required={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <InputComponent
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            secureTextEntry
            required={false}
          />

          {error ? (
            <TextComponent variant="bodySmall" color={colors.error.main}>
              {error}
            </TextComponent>
          ) : null}

          <ButtonComponent
            title="Login"
            variant="primary"
            size="lg"
            fullWidth
            onPress={onHandleLogin}
            loadingState={isLoading}
            disabled={!email || !password}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[600]}>
            Don't have an account?{' '}
          </TextComponent>
          <TextComponent
            variant="bodyMedium"
            color={colors.primary[600]}
            bold
            onPress={() => navigation.navigate('Signup')}
          >
            Sign Up
          </TextComponent>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xxl,
  },
  brand: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  brandBadge: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    gap: spacing.md,
    ...getShadows('md'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
});
