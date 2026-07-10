import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExpenseTabParamList } from '@/navigation/types';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenWrapper } from '@/components/templates/screenwrapper';
import { View, StyleSheet, Pressable, Keyboard } from 'react-native';
import { TextComponent } from '@/components/atoms/text';
import { InputComponent } from '@/components/atoms/input';
import { ButtonComponent } from '@/components/atoms/button';
import { IconComponent } from '@/components/atoms/icon';
import { useAddTransaction } from '@/hooks/useTransactions';
import { borderRadius, colors, spacing } from '@/theme';
import { CATEGORY_META, EXPENSE_CATEGORIES } from '@/constants/categories';

const schema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  amount: z
    .string()
    .min(1, 'Amount is Required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a Valid Amount'),
  category: z.string().min(1, 'Pick a Category'),
});

type FormValues = z.infer<typeof schema>;

type AddExpenseNav = BottomTabNavigationProp<ExpenseTabParamList, 'AddExpense'>;

export const AddExpenseScreen = () => {
  const navigation = useNavigation<AddExpenseNav>();
  const { mutate: addTransaction, isPending } = useAddTransaction();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', amount: '', category: '' },
  });

  const onSubmit = (data: FormValues) => {
    addTransaction(
      {
        title: data.title.trim(),
        category: data.category,
        amount: -Number(data.amount),
      },
      {
        // per-call callbacks: only reset + leave once the row is really saved
        onSuccess: () => {
          reset();
          navigation.navigate('Home');
        },
      },
    );
  };

  return (
    <ScreenWrapper
      padded
      edges={['top']}
      backgroundColor={colors.neutral.gray[50]}
    >
      <View style={styles.container}>
        <TextComponent variant="h2" color={colors.neutral.gray[900]}>
          Add Expense{' '}
        </TextComponent>

        <View style={styles.form}>
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => (
              <InputComponent
                label="Title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g. Lunch"
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="amount"
            render={({ field: { value, onChange, onBlur } }) => (
              <InputComponent
                label="Amount"
                placeholder="0"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.amount?.message}
              />
            )}
          />
          <View>
            <TextComponent
              variant="labelMedium"
              color={colors.neutral.gray[700]}
              style={styles.pickerLabel}
            >
              Category
            </TextComponent>

            <Controller
              control={control}
              name="category"
              render={({ field: { value, onChange } }) => (
                <View style={styles.chips}>
                  {EXPENSE_CATEGORIES.map(key => {
                    const meta = CATEGORY_META[key];
                    const selected = value === key;
                    return (
                      <Pressable
                        key={key}
                        onPress={() => {
                          onChange(key);
                          Keyboard.dismiss();
                        }}
                        style={[
                          styles.chip,
                          selected && {
                            backgroundColor: meta.color + '22',
                            borderColor: meta.color,
                          },
                        ]}
                      >
                        <IconComponent
                          name={meta.icon}
                          family="MaterialIcons"
                          size="sm"
                          color={
                            selected ? meta.color : colors.neutral.gray[500]
                          }
                        />
                        <TextComponent
                          variant="bodySmall"
                          color={
                            selected ? meta.color : colors.neutral.gray[700]
                          }
                        >
                          {meta.label}
                        </TextComponent>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            />
            {errors.category ? (
              <TextComponent
                variant="bodySmall"
                color={colors.error.main}
                style={styles.pickerError}
              >
                {errors.category.message}
              </TextComponent>
            ) : null}
          </View>

          <ButtonComponent
            title="Add Expense"
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            size="lg"
            fullWidth
            loadingState={isPending}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  form: {
    gap: spacing.md,
  },
  pickerLabel: {
    marginBottom: spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.neutral.gray[300],
    backgroundColor: colors.neutral.white,
  },
  pickerError: {
    marginTop: spacing.xs,
  },
});
