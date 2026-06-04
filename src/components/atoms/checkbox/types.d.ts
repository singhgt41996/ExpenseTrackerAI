import { ViewStyle } from 'react-native';
export interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;

  label?: string;
  error?: boolean;
  disabled?: boolean;
  size?: number;

  testId?: string;
}
