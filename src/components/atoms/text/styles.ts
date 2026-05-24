import { StyleSheet, TextStyle } from 'react-native';
import { TextVariantKey, textVariants } from '@/theme';
import { colors } from '@/theme';

export const getTextStyles = (
  variant: TextVariantKey,
  color?: string,
  align?: 'left' | 'center' | 'right' | 'justify',
  bold?: boolean,
  italic?: boolean,
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none',
  disabled?: boolean,
): TextStyle[] => {
  const variantStyles = textVariants[variant];
  
  const customStyles: TextStyle = {
    ...(disabled 
      ? { color: colors.neutral.gray[400] } 
      : color && { color }
    ),
    ...(align && { textAlign: align }),
    ...(bold && { fontWeight: 'bold' as const }),
    ...(italic && { fontStyle: 'italic' as const }),
    ...(transform && { textTransform: transform }),    
    ...(disabled && { opacity: 0.5 }),
  };
  
  return [variantStyles, customStyles];
};

export const styles = StyleSheet.create({});
