import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { TextComponent } from '@/components/atoms/text';
import { ExpenseTrackerParamList } from '@/navigation/types';
import { colors, spacing } from '@/theme';

type EditExpenseScreenProps = NativeStackScreenProps<
  ExpenseTrackerParamList,
  'EditExpense'
>;

export const EditExpenseScreen = ({ route }: EditExpenseScreenProps) => {
  const { id } = route.params;

  return (
    <ScreenWrapper edges={['bottom']} padded backgroundColor={colors.neutral.gray[50]}>
      <View style={styles.container}>
        <TextComponent variant="h2" color={colors.neutral.gray[900]}>
          Edit Expense
        </TextComponent>
        <TextComponent variant="bodyMedium" color={colors.neutral.gray[600]}>
          Editing expense #{id}
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
