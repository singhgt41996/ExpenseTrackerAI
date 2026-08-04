import { ViewStyle } from 'react-native';

export type DateFormat =
  | 'DD/MM/YYYY' // 02/06/2026
  | 'MM/DD/YYYY' // 06/02/2026
  | 'DD-MM-YYYY' // 02-06-2026
  | 'YYYY-MM-DD' // 2026-06-02
  | 'DD MMM YYYY' // 02 Jun 2026
  | 'DD MMMM YYYY' // 02 June 2026
  | 'MMM DD, YYYY' // Jun 02, 2026
  | 'MMMM DD, YYYY'; // June 02, 2026

export interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;

  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;

  mode?: 'date' | 'time' | 'datetime';
  format?: DateFormat;
  minimumDate?: Date;
  maximumDate?: Date;

  style?: ViewStyle;
  testID?: string;
}
