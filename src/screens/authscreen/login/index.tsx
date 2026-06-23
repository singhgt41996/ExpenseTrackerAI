import { ButtonComponent } from '@/components/atoms/button';
import { InputComponent } from '@/components/atoms/input';
import { TextComponent } from '@/components/atoms/text';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { AuthStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing } from '@/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen = ({ navigation, route }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, isLoading, login } = useAuthStore(state => state);

  const onHandleLogin = async () => {
    try {
      await login(email.trim(), password);
    } catch {}
  };

  return (
    <ScreenWrapper edges={['top', 'bottom']} padded={true}>
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
            value={email}
            placeholder="your@example.com"
            onChangeText={value => setEmail(value)}
            label="Email"
            required={true}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <InputComponent
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            secureTextEntry
            required={true}
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
            onPress={onHandleLogin}
            loadingState={isLoading}
            disabled={!email || !password}
          />
        </View>

        <View style={styles.footer}>
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[600]}>
            Dont Have an Account{' '}
          </TextComponent>
          <TextComponent
            variant="bodyMedium"
            color={colors.primary[600]}
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
  subtitle: {
    marginTop: spacing.xs,
  },
  form: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
});
