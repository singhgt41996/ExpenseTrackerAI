import { TextStyle } from 'react-native/types_generated/index';
import { ViewStyle } from 'react-native/types_generated/index';

type KeyboardTypeOptions = 'email' | 'numeric' | 'phone-pad';

export interface InputProps {
  value: string;
  onChangeText: () => void;
  placeholder?: string;
  disabled?: boolean;

  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  editable?: boolean;
  autoFocus?: boolean;
  maxlength?: number;
  multiline?: boolean;
  numberOfLines?: number;

  // 🔐 SECURITY & TYPES:
  secureTextEntry?: boolean; // Password mode (hide text)
  keyboardType?: KeyboardTypeOptions; // 'email', 'numeric', 'phone-pad', etc.
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: string; // Browser autocomplete hints

  // 🎨 VISUAL CUSTOMIZATION:
  leftIcon?: React.ReactNode; // Icon on left
  rightIcon?: React.ReactNode; // Icon on right (or clear button)
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled' | 'underlined';

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
