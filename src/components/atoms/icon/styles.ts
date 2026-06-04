import { IconFamily, IconSizes } from '@/components/atoms/icon/types';
import { colors } from '@/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export const getIconSize = (size: IconSizes | number = 'md'): number => {
  if (typeof size === 'number') return size;
  const sizes = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
  };
  return sizes[size];
};

export const getIconColor = (color?: string): string => {
  return color || colors.primary[300];
};

export const getIconFamily = (family: IconFamily = 'MaterialIcons') => {
  const iconFamilies = {
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome,
    FontAwesome5,
    Feather,
    AntDesign,
    Entypo,
  };
  return iconFamilies[family];
};
