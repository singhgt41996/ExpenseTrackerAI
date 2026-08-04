import { View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SearchBarProps } from '@/components/molecules/searchBar/types';
import { IconComponent } from '@/components/atoms/icon';
import { lightTheme } from '@/theme';
import { textVariants } from '@/theme/typography';
import {
  getContainerStyles,
  getInputStyles,
  getIconContainerStyles,
} from '@/components/molecules/searchBar/styles';

export const SearchBar = ({
  value,
  onChangeText,

  placeholder = 'Search...',
  onSearch,
  onClear,

  disabled = false,
  autoFocus = false,

  style,
  testID,
}: SearchBarProps) => {
  const containerStyles = getContainerStyles();
  const inputStyles = getInputStyles();
  const iconContainerStyles = getIconContainerStyles();

  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  const handleSubmit = () => {
    onSearch?.(value);
  };

  return (
    <View style={[containerStyles, style]} testID={testID}>
      {/* Search Icon */}
      <View style={iconContainerStyles}>
        <IconComponent
          name="search"
          family="Ionicons"
          size="sm"
          color={lightTheme.text.secondary}
        />
      </View>

      {/* Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={lightTheme.text.disabled}
        editable={!disabled}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        style={[
          inputStyles,
          {
            ...textVariants.bodyMedium,
            color: lightTheme.text.primary,
          },
        ]}
        testID={testID ? `${testID}-input` : undefined}
      />

      {/* Clear Icon */}
      {value.length > 0 && (
        <TouchableOpacity
          style={iconContainerStyles}
          onPress={handleClear}
          activeOpacity={0.7}
        >
          <IconComponent
            name="close-circle"
            family="Ionicons"
            size="sm"
            color={lightTheme.text.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
