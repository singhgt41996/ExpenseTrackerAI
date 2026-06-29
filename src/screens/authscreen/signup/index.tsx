import { ButtonComponent } from '@/components/atoms/button';
import { IconComponent } from '@/components/atoms/icon';
import { InputComponent } from '@/components/atoms/input';
import { TextComponent } from '@/components/atoms/text';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { AuthStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { borderRadius, colors, getShadows, spacing } from '@/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const signup = useAuthStore(state => state.signup);
  const isLoading = useAuthStore(state => state.isLoading);
  const error = useAuthStore(state => state.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signup(email.trim(), password, name.trim());
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
          Create Account
        </TextComponent>
        <TextComponent
          variant="bodyMedium"
          color={colors.neutral.gray[600]}
          align="center"
          style={styles.subtitle}
        >
          Sign up to get started with FinFlow
        </TextComponent>

        {/* Form card */}
        <View style={styles.card}>
          <InputComponent
            label="Name"
            placeholder="Your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            required={false}
          />
          <InputComponent
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            required={false}
          />
          <InputComponent
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            required={false}
          />

          {error ? (
            <TextComponent variant="bodySmall" color={colors.error.main}>
              {error}
            </TextComponent>
          ) : null}

          <ButtonComponent
            title="Sign Up"
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleSignup}
            loadingState={isLoading}
            disabled={!name || !email || !password}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[600]}>
            Already have an account?{' '}
          </TextComponent>
          <TextComponent
            variant="bodyMedium"
            color={colors.primary[600]}
            bold
            onPress={() => navigation.navigate('Login')}
          >
            Log in
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
