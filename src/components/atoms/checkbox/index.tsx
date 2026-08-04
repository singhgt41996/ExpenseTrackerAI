import {
  getCheckboxContainerStyles,
  getCheckboxLabelStyles,
  getCheckBoxStyles,
} from '@/components/atoms/checkbox/styles';
import { CheckboxProps } from '@/components/atoms/checkbox/types';
import { IconComponent } from '@/components/atoms/icon';
import { TextComponent } from '@/components/atoms/text';
import { Pressable, View } from 'react-native';

export const CheckboxComponent = ({
  checked = false,
  disabled = false,
  onChange,
  label,
  error = false,
  size = 24,
  testID,
}: CheckboxProps) => {
  const containerStyles = getCheckboxContainerStyles();
  const checkboxStyles = getCheckBoxStyles(checked, error, size, disabled);
  const labelStyles = getCheckboxLabelStyles(error, disabled);

  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };
  return (
    <View style={containerStyles}>
      {/* Label at the top */}
      {label && <TextComponent style={labelStyles}>{label}</TextComponent>}

      {/* Only checkbox box is clickable */}
      <Pressable onPress={handleChange} disabled={disabled} testID={testID}>
        <View style={checkboxStyles}>
          {/* Show checkmark when checked */}
          {checked && (
            <IconComponent
              name="check"
              family="MaterialIcons"
              size={size * 0.7}
              color="white"
            />
          )}
        </View>
      </Pressable>
    </View>
  );
};
