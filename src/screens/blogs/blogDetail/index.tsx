import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { BlogsStackParamList } from '@/navigation/types';
import { colors, spacing } from '@/theme';
import { isDirty } from 'zod/v3';

type BlogDetailScreenProps = NativeStackScreenProps<
  BlogsStackParamList,
  'BlogDetail'
>;

export const BlogDetailScreen = ({ route }: BlogDetailScreenProps) => {
  const { id } = route.params;
  console.log(isDirty);
  return (
    <ScreenWrapper
      edges={['bottom']}
      padded
      backgroundColor={colors.neutral.gray[50]}
    >
      <View style={styles.container}>
        <TextComponent variant="h2" color={colors.neutral.gray[900]}>
          Blog Detail
        </TextComponent>
        <TextComponent variant="bodyMedium" color={colors.neutral.gray[600]}>
          Showing blog post #{id}
        </TextComponent>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
});
