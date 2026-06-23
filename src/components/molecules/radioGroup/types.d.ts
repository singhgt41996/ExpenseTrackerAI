import { ViewStyle } from 'react-native';

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOptions[];
  value: string | number | null;
  onChange: (value: string | number) => void;

  label: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;

  direction: 'vertical' | 'horizontal' = 'vertical';
  style?: ViewStyle;

  testID?: string;
}
