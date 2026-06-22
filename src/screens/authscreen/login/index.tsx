import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { InputComponent } from '@/components/atoms/input';
import { ButtonComponent } from '@/components/atoms/button';
import { useAuthStore } from '@/store/authStore';
import { AuthStackParamList } from '@/navigation/types';
import { colors, spacing } from '@/theme';

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
  const navigation = useNavigation<LoginNavProp>();

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email.trim(), password);
      // On success, isAuthenticated flips and RootNavigator swaps to the app.
    } catch {
      // Error message is stored in authStore.error and rendered below.
    }
  };

  return (
    <ScreenWrapper padded edges={['top', 'bottom']}>
      <View style={styles.container}>
        <TextComponent variant="h1" color={colors.neutral.gray[900]}>
          Welcome Back
        </TextComponent>
        <TextComponent
          variant="bodyMedium"
          color={colors.neutral.gray[600]}
          style={styles.subtitle}
        >
          Log in to continue to FinFlow
        </TextComponent>

        <View style={styles.form}>
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
            placeholder="Enter your password"
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
            title="Login"
            variant="primary"
            size="large"
            fullWidth
            onPress={handleLogin}
            loadingState={isLoading}
            disabled={!email || !password}
          />
        </View>

        <View style={styles.footer}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[600]}>
            Don't have an account?{' '}
          </TextComponent>
          <TextComponent
            variant="bodyMedium"
            color={colors.primary[600]}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign up
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
  subtitle: {
    marginTop: spacing.xs,
  },
  form: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
});
