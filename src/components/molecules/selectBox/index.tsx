import { View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { useMemo, useState } from 'react';
import { SelectBoxProps } from '@/components/molecules/selectBox/types';
import { TextComponent } from '@/components/atoms/text';
import { colors } from '@/theme/colors';
import { IconComponent } from '@/components/atoms/icon';
import { ChipComponent } from '@/components/atoms/chip';
import { InputComponent } from '@/components/atoms/input';
import { CheckboxComponent } from '@/components/atoms/checkbox';
import { RadioButton } from '@/components/atoms/radio';
import { ButtonComponent } from '../../atoms/button/index';

import {
  getContainerStyles,
  getLabelStyles,
  getErrorTextStyles,
  getTriggerStyles,
  getTriggerTextStyles,
  getModalOverlayStyles,
  getModalContainerStyles,
  getModalHeaderStyles,
  getSearchContainerStyles,
  getListContainerStyles,
  getOptionItemStyles,
  getChipsContainerStyles,
  getModalFooterStyles,
} from '@/components/molecules/selectBox/styles';

export const SelectboxComponent = ({
  data,
  labelKey,
  selected,
  onChange,

  multiSelect = false,

  placeHolder = 'select',
  searchBar = false,
  searchPlaceholder = 'Search....',
  noResultsText = 'No Results Found',
  showChips = false,

  label,
  disabled = false,
  error,
  required = false,

  style,
  testID,
}: SelectBoxProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tempSelected, setTempSelected] = useState(selected || []);
  const [searchText, setSearchText] = useState<string>('');

  const containerStyles = getContainerStyles();
  const labelStyles = getLabelStyles(!!error);
  const errorTextStyles = getErrorTextStyles();
  const triggerStyles = getTriggerStyles(!!error, disabled);
  const triggerTextStyles = getTriggerTextStyles(disabled);
  const modalOverlayStyles = getModalOverlayStyles();
  const modalContainerStyles = getModalContainerStyles();
  const modalHeaderStyles = getModalHeaderStyles();
  const chipsContainerStyles = getChipsContainerStyles();
  const searchContainerStyles = getSearchContainerStyles();
  const listContainerStyles = getListContainerStyles();
  const optionItemStyles = getOptionItemStyles();
  const modalFooterStyles = getModalFooterStyles();

  const filterData = useMemo(() => {
    if (!searchBar || !searchText.trim()) {
      return data;
    }
    return data.filter(item => {
      const labelValue = String(item[labelKey]).toLowerCase();
      return labelValue.includes(searchText.toLowerCase());
    });
  }, [data, searchText, labelKey, searchBar]);

  const getDisplayText = () => {
    if (!selected || selected.length) {
      return placeHolder;
    }

    if (!multiSelect) {
      return String(selected[0].labelKey);
    }
    if (selected.length > 0) {
      return `${selected.length} Items Selected`;
    }
    return selected.map(item => String(item[labelKey])).join('');
  };

  const isItemSelected = (item: any): boolean => {
    return tempSelected.some(
      selectedItem => selectedItem[labelKey] === item[labelKey],
    );
  };
  const handleItemPress = (item: any) => {
    if (!multiSelect) {
      setTempSelected([item]);
    } else {
      const isSelected = isItemSelected(item);
      if (isSelected) {
        setTempSelected(prev =>
          prev.filter(
            selectedItems => selectedItems[labelKey] !== item[labelKey],
          ),
        );
      } else {
        setTempSelected(prev => [...prev, item]);
      }
    }
  };

  const handleChipDelete = (item: any) => {
    setTempSelected(prev =>
      prev.filter(selectedItem => selectedItem[labelKey] !== item[labelKey]),
    );
  };

  const handleModalOpen = (e: any) => {
    console.log(e);
    if (!disabled) {
      setTempSelected(selected || []);
      setModalVisible(true);
      setSearchText('');
    }
  };

  const handleDone = () => {
    onChange(tempSelected);
    setModalVisible(false);
    setSearchText('');
  };
  const handleCancel = () => {
    setTempSelected(selected || []);
    setModalVisible(false);
    setSearchText('');
  };

  return (
    <View style={[containerStyles, style]} testID={testID}>
      {/* Label */}
      {label && (
        <TextComponent>
          {label}{' '}
          {required && (
            <TextComponent color={colors.error.main}>*</TextComponent>
          )}
        </TextComponent>
      )}

      {/* Trigger Button */}
      <TouchableOpacity
        onPress={handleModalOpen}
        style={triggerStyles}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <TextComponent style={triggerTextStyles}>
          {getDisplayText()}
        </TextComponent>
        <IconComponent
          name={modalVisible ? 'chevron-up' : 'chevron-down'}
          family="Ionicons"
          size="sm"
          color={disabled ? colors.neutral.gray[300] : colors.neutral.gray[900]}
        />
      </TouchableOpacity>
      {error && (
        <TextComponent color={colors.error.main}>{error}</TextComponent>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={handleCancel}
      >
        <View style={modalOverlayStyles}>
          <View style={modalContainerStyles}>
            {/* Header */}
            <View style={modalHeaderStyles}>
              <TextComponent variant={'h3'}>{label || 'Select'}</TextComponent>
              <TouchableOpacity onPress={handleCancel}>
                <IconComponent
                  name={'close'}
                  family={'Ionicons'}
                  size={'md'}
                  color={colors.neutral.gray[900]}
                ></IconComponent>
              </TouchableOpacity>
            </View>

            {/* Selected Chips (Inside Modal) */}
            {tempSelected.length > 0 && showChips && (
              <View style={chipsContainerStyles}>
                {tempSelected.map((item, index) => (
                  <ChipComponent
                    key={index}
                    label={String(item[labelKey])}
                    variant={'filled'}
                    size={'sm'}
                    onDelete={() => handleChipDelete(item)}
                  />
                ))}
              </View>
            )}
            {/* Search Bar */}
            {searchBar && (
              <View style={searchContainerStyles}>
                <InputComponent
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder={searchPlaceholder}
                  leftIcon={
                    <IconComponent
                      name={'search'}
                      family={'Ionicons'}
                      size={'sm'}
                      color={colors.neutral.gray[900]}
                    />
                  }
                />
              </View>
            )}

            {/* Options List */}
            <ScrollView style={listContainerStyles}>
              {filterData.length === 0 ? (
                <TextComponent color={colors.neutral.gray[700]}>
                  {noResultsText}
                </TextComponent>
              ) : (
                filterData.map((item, index) => {
                  const isSelected = isItemSelected(item);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={optionItemStyles}
                      onPress={() => handleItemPress(item)}
                      activeOpacity={0.7}
                    >
                      {multiSelect ? (
                        <CheckboxComponent
                          checked={isSelected}
                          onChange={() => {
                            handleItemPress(item);
                          }}
                          label={String(item[labelKey])}
                        ></CheckboxComponent>
                      ) : (
                        <RadioButton
                          selected={isSelected}
                          onChange={() => handleItemPress(item)}
                          label={String(item[labelKey])}
                        ></RadioButton>
                      )}
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>

            {/* Footer Buttons */}

            <View style={modalFooterStyles}>
              <ButtonComponent
                title={'Cancel'}
                variant={'outline'}
                size={'md'}
                onPress={handleCancel}
                style={{ flex: 1, marginRight: 8 }}
              />
              <ButtonComponent
                title={'Done'}
                variant={'primary'}
                size={'md'}
                onPress={handleDone}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
