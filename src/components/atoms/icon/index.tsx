import { IconProps } from '@/components/atoms/icon/types';
import {
  getIconColor,
  getIconFamily,
  getIconSize,
} from '@/components/atoms/icon/styles';
import { Pressable } from 'react-native';

export const IconComponent = ({
  name,
  family = 'MaterialIcons',
  size = 'md',
  color,
  style,
  disabled = false,
  onPress,
  testID,
}: IconProps) => {
  const iconSize = getIconSize(size);
  const iconColor = getIconColor(color);
  const IconFamily = getIconFamily(family);

  const Icon = (
    <IconFamily
      name={name}
      size={iconSize}
      color={iconColor}
      style={style}
      // Conditional Props
      {...(testID && { testID })}
    />
  );

  if (onPress && !disabled) {
    return (
      <Pressable onPress={onPress} disabled={disabled}>
        {Icon}
      </Pressable>
    );
  }
  return Icon;
};
