import { TextStyle } from 'react-native';
import { ComponentSize } from '@/theme';

export type IconFamily =
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Ionicons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Feather'
  | 'AntDesign'
  | 'Entypo';

export type IconSizes = ComponentSize;

export interface IconProps {
  name: string;
  family?: IconFamily;
  size?: IconSizes | number;

  // Interaction
  disabled?: boolean;
  onPress?: () => void;

  //   Styling
  color?: string;
  style?: TextStyle;

  testID?: string;
}
