import { StyleSheet, TextStyle } from 'react-native';
import { TextVariantKey, textVariants } from '@/theme';
import { fontFamilies } from '../../../theme/typography';

const getTextStyles = (
  variant: TextVariantKey,
  color: string,
  align: 'left' | 'center' | 'right' | 'justify',
  bold: boolean,
  italic: boolean,
) => {
  const variantStyles = textVariants[variant];
  const customStyles: TextStyle = {
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(bold && { fontWeight: 'bold' as const }),
    ...(italic && { fontStyle: 'italic' as const }),
  };
  return [variantStyles, customStyles];
};

export const styles = StyleSheet.create({});
