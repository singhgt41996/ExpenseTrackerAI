import { ViewStyle } from 'react-native';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;

  placeholder?: string;
  onSearch?: (text: string) => void;
  onClear?: () => void;

  disabled?: boolean;
  autoFocus?: boolean;

  style?: ViewStyle;
  testId?: string;
}
