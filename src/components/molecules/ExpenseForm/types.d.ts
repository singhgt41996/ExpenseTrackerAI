import { ExpenseFormValues } from './index';

export interface ExpenseFormProps {
  defaultValues: ExpenseFormValues;
  onSubmit: (data: ExpenseFormValues) => void;
  isSubmitting?: boolean;
  submitLabel: string;
}
