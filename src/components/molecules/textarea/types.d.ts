import { ViewStyle, TextStyle } from 'react-native';

export interface TextAreaProps {
  value: string;
  onChangeText: (text: string) => void;

  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;

  maxLength?: number;
  rows?: number; // Height in number of lines
  showCharCount?: boolean;

  style?: ViewStyle;
  testID?: string;
}
