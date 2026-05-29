import {
  TextStyle,
  ViewStyle,
  KeyboardTypeOptions as RNKeyboardType,
} from 'react-native';

export type autoCapitalize = 'none' | 'sentences' | 'words' | 'characters';
export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'outlined' | 'filled' | 'underlined';

export interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;

  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  editable?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;

  // 🔐 SECURITY & TYPES:
  secureTextEntry?: boolean; // Password mode (hide text)
  keyboardType?: RNKeyboardType; // 'email', 'numeric', 'phone-pad', etc.
  autoCapitalize?: autoCapitalize;
  autoComplete?: string; // Browser autocomplete hints

  // 🎨 VISUAL CUSTOMIZATION:
  leftIcon?: React.ReactNode; // Icon on left
  rightIcon?: React.ReactNode; // Icon on right (or clear button)
  size?: InputSize;
  variant?: InputVariant;

  // ✅ VALIDATION STATES:
  success?: boolean; // Show success state (green border)
  warning?: boolean; // Show warning state (yellow border)

  // 🔧 ADVANCED FEATURES:
  showCharCount?: boolean; // Show "45/100" counter
  showPasswordToggle?: boolean; // Eye icon for password
  clearable?: boolean; // Show X button to clear

  // 🎯 CALLBACKS:
  onFocus?: () => void; // When input gets focus
  onBlur?: () => void; // When input loses focus
  onSubmitEditing?: () => void; // When user presses "return"

  // 🎨 STYLING:
  style?: ViewStyle; // Container style
  inputStyle?: TextStyle; // Input text style
  labelStyle?: TextStyle; // Label style
  errorStyle?: TextStyle; // Error text style

  // ♿ ACCESSIBILITY:
  testID?: string;
}
