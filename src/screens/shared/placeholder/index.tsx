import { useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { colors, spacing } from '@/theme';

// Temporary screen for tabs/routes that aren't built yet.
// Shows the current route name so you can see navigation working.
export const PlaceholderScreen = () => {
  const route = useRoute();

  return (
    <ScreenWrapper edges={['top', 'bottom']} padded backgroundColor={colors.neutral.gray[50]}>
      <View style={styles.container}>
        <IconComponent
          name="construction"
          family="MaterialIcons"
          size="xl"
          color={colors.neutral.gray[400]}
        />
        <TextComponent variant="h2" color={colors.neutral.gray[800]} align="center">
          {route.name}
        </TextComponent>
        <TextComponent variant="bodyMedium" color={colors.neutral.gray[500]} align="center">
          Coming soon
        </TextComponent>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});
