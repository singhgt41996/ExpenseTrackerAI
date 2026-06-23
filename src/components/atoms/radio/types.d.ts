export interface RadioButtonProps {
  selected: boolean;
  onChange: (value: boolean) => void;
  size?: number;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  testID?: string;
}
