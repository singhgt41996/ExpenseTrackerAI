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

type SignupNavProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export const SignupScreen = () => {
  const navigation = useNavigation<SignupNavProp>();

  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signup(email.trim(), password, name.trim());
      // On success, isAuthenticated flips and RootNavigator swaps to the app.
    } catch {
      // Error message is stored in authStore.error and rendered below.
    }
  };

  return (
    <ScreenWrapper padded edges={['top', 'bottom']}>
      <View style={styles.container}>
        <TextComponent variant="h1" color={colors.neutral.gray[900]}>
          Create Account
        </TextComponent>
        <TextComponent
          variant="bodyMedium"
          color={colors.neutral.gray[600]}
          style={styles.subtitle}
        >
          Sign up to get started with FinFlow
        </TextComponent>

        <View style={styles.form}>
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
            size="large"
            fullWidth
            onPress={handleSignup}
            loadingState={isLoading}
            disabled={!name || !email || !password}
          />
        </View>

        <View style={styles.footer}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[600]}>
            Already have an account?{' '}
          </TextComponent>
          <TextComponent
            variant="bodyMedium"
            color={colors.primary[600]}
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
