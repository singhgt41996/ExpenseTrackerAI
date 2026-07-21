import { ButtonComponent } from '@/components/atoms/button';
import { IconComponent } from '@/components/atoms/icon';
import { InputComponent } from '@/components/atoms/input';
import { TextComponent } from '@/components/atoms/text';
import { styles } from '@/components/molecules/ExpenseForm/styles';
import { ExpenseFormProps } from '@/components/molecules/ExpenseForm/types';
import { DatePicker } from '@/components/molecules/datePicker';
import { CATEGORY_META, EXPENSE_CATEGORIES } from '@/constants/categories';
import { colors } from '@/theme/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Pressable, View } from 'react-native';
import { z } from 'zod';

export const expenseFormSchema = z.object({
  title: z.string().trim().min(1, 'Title Is Required'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a Valid Amount'),

  category: z.string().trim().min(1, 'Pick One Category'),
  description: z
    .string()
    .trim()
    .max(200, 'Keep it under 200 characters')
    .optional(),
  date: z.date({ error: 'Pick a Date' }),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

export const ExpenseForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
}: ExpenseFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: defaultValues,
  });

  return (
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
      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            label="Date"
            value={value}
            onChange={onChange}
            maximumDate={new Date()}
            error={errors.date?.message}
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
                      color={selected ? meta.color : colors.neutral.gray[500]}
                    />
                    <TextComponent
                      variant="bodySmall"
                      color={selected ? meta.color : colors.neutral.gray[700]}
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
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur } }) => (
          <InputComponent
            label="Note"
            required={false}
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Add a note (optional)"
            multiline
            numberOfLines={3}
            error={errors.description?.message}
          />
        )}
      />
      <ButtonComponent
        title={submitLabel}
        variant="primary"
        onPress={handleSubmit(onSubmit)}
        size="lg"
        fullWidth
        loadingState={isSubmitting}
      />
    </View>
  );
};
