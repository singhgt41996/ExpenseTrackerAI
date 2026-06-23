import { ViewStyle } from 'react-native';

export interface SelectBoxProps<T = Record<string, any>> {
  data: T[];
  labelKey: keyof T;

  selected: T[] | null;
  onChange: (selected: T[]) => void;

  multiSelect?: boolean;

  placeHolder: string;
  searchBar?: boolean;
  searchPlaceholder?: string;
  noResultsText?: string;
  showChips?: boolean;

  label: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;

  style?: ViewStyle;
  testID?: string;
}
