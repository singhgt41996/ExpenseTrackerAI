import { TextStyle } from 'react-native';
import { colors } from '../../../theme/colors';

export type IconFamily =
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Ionicons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Feather'
  | 'AntDesign'
  | 'Entypo';

export type IconSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

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

  testId?: string;
}
