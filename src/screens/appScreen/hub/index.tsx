import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { AppStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { borderRadius, colors, getShadows, spacing } from '@/theme';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

type HubScreenProps = NativeStackScreenProps<AppStackParamList, 'Hub'>;

export const HubScreen = ({ navigation }: HubScreenProps) => {
  const user = useAuthStore(state => state.user);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('Screen is focused');
  //     return () => {
  //       console.log('Screen is unfocused');
  //     };
  //   }, [navigation]),
  // );

  // useEffect(() => {
  //   console.log('Use Effect is called');
  //   return () => {
  //     console.log('useEffect is cleared');
  //   };
  // }, []);

  // let unsubscribeFocus: any;
  // let unsubscribeBlur: any;

  // useEffect(() => {
  //   unsubscribeFocus = navigation.addListener('focus', () => {
  //     console.log(
  //       'added event listner in the useeffect and called focus effect',
  //     );
  //   });

  //   unsubscribeBlur = navigation.addListener('blur', () => {
  //     console.log(
  //       'added event listner in the useeffect and called Blur effect',
  //     );
  //     if (unsubscribeFocus) unsubscribeFocus();
  //     if (unsubscribeBlur) unsubscribeBlur();
  //   });

  //   return () => {
  //     if (unsubscribeFocus) unsubscribeFocus();
  //     if (unsubscribeBlur) unsubscribeBlur();
  //   };
  // }, []);

  return (
    <ScreenWrapper
      edges={['top', 'bottom']}
      padded
      backgroundColor={colors.neutral.gray[50]}
    >
      <View style={styles.container}>
        <TextComponent variant="h1" color={colors.neutral.gray[900]}>
          Hi{user?.name ? `, ${user.name}` : ''}
        </TextComponent>
        <TextComponent
          variant="bodyMedium"
          color={colors.neutral.gray[600]}
          style={styles.subtitle}
        >
          What would you like to open?
        </TextComponent>

        <View style={styles.cards}>
          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() => navigation.navigate('ExpenseTracker')}
          >
            <View
              style={[styles.iconWrap, { backgroundColor: colors.primary[50] }]}
            >
              <IconComponent
                name="account-balance-wallet"
                family="MaterialIcons"
                size="xl"
                color={colors.primary[600]}
              />
            </View>
            <View style={styles.cardText}>
              <TextComponent variant="h3" color={colors.neutral.gray[900]}>
                Expense Tracker
              </TextComponent>
              <TextComponent
                variant="bodySmall"
                color={colors.neutral.gray[600]}
              >
                Track spending & budgets
              </TextComponent>
            </View>
            <IconComponent
              name="chevron-right"
              family="MaterialIcons"
              size="md"
              color={colors.neutral.gray[400]}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() => navigation.navigate('Blogs')}
          >
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: colors.secondary[50] },
              ]}
            >
              <IconComponent
                name="article"
                family="MaterialIcons"
                size="xl"
                color={colors.secondary[600]}
              />
            </View>
            <View style={styles.cardText}>
              <TextComponent variant="h3" color={colors.neutral.gray[900]}>
                Blogs
              </TextComponent>
              <TextComponent
                variant="bodySmall"
                color={colors.neutral.gray[600]}
              >
                Read & share tips
              </TextComponent>
            </View>
            <IconComponent
              name="chevron-right"
              family="MaterialIcons"
              size="md"
              color={colors.neutral.gray[400]}
            />
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  cards: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...getShadows('md'),
  },
  cardPressed: {
    opacity: 0.85,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
  },
});
