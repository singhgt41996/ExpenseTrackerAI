import { View, TouchableOpacity, Modal, Platform } from 'react-native';
import React, { useState } from 'react';
import {
  DatePickerProps,
  DateFormat,
} from '@/components/molecules/datePicker/types';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { Button } from '@/components/atoms/button';
import { colors, lightTheme } from '@/theme';
import {
  getContainerStyles,
  getLabelStyles,
  getTriggerStyles,
  getTriggerTextStyles,
  getErrorTextStyles,
  getModalOverlayStyles,
  getModalContainerStyles,
  getModalHeaderStyles,
  getModalFooterStyles,
} from '@/components/molecules/datePicker/styles';

export const DatePicker = ({
  value,
  onChange,

  label,
  placeholder = 'Select date',
  error,
  required = false,
  disabled = false,

  mode = 'date',
  format = 'DD MMM YYYY',
  minimumDate,
  maximumDate,

  style,
  testID,
}: DatePickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  const containerStyles = getContainerStyles();
  const labelStyles = getLabelStyles(!!error);
  const triggerStyles = getTriggerStyles(!!error, disabled);
  const triggerTextStyles = getTriggerTextStyles(!!value);
  const errorTextStyles = getErrorTextStyles();
  const modalOverlayStyles = getModalOverlayStyles();
  const modalContainerStyles = getModalContainerStyles();
  const modalHeaderStyles = getModalHeaderStyles();
  const modalFooterStyles = getModalFooterStyles();

  const formatDate = (date: Date | null, dateFormat: DateFormat): string => {
    if (!date) return placeholder;

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthNamesShort = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const pad = (num: number) => String(num).padStart(2, '0');

    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${pad(day)}/${pad(month + 1)}/${year}`;

      case 'MM/DD/YYYY':
        return `${pad(month + 1)}/${pad(day)}/${year}`;

      case 'DD-MM-YYYY':
        return `${pad(day)}-${pad(month + 1)}-${year}`;

      case 'YYYY-MM-DD':
        return `${year}-${pad(month + 1)}-${pad(day)}`;

      case 'DD MMM YYYY':
        return `${pad(day)} ${monthNamesShort[month]} ${year}`;

      case 'DD MMMM YYYY':
        return `${pad(day)} ${monthNames[month]} ${year}`;

      case 'MMM DD, YYYY':
        return `${monthNamesShort[month]} ${pad(day)}, ${year}`;

      case 'MMMM DD, YYYY':
        return `${monthNames[month]} ${pad(day)}, ${year}`;

      default:
        return `${pad(day)} ${monthNamesShort[month]} ${year}`;
    }
  };

  const formatTime = (date: Date | null): string => {
    if (!date) return placeholder;

    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDisplayText = (): string => {
    if (!value) return placeholder;

    if (mode === 'date') {
      return formatDate(value, format);
    } else if (mode === 'time') {
      return formatTime(value);
    } else {
      return `${formatDate(value, format)} ${formatTime(value)}`;
    }
  };

  const handleOpen = () => {
    if (!disabled) {
      setTempDate(value || new Date());
      setModalVisible(true);
    }
  };

  const handleDone = () => {
    onChange(tempDate);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={[containerStyles, style]} testID={testID}>
      {/* Label */}
      {label && (
        <TextComponent style={labelStyles}>
          {label}
          {required && (
            <TextComponent color={colors.error.main}>*</TextComponent>
          )}
        </TextComponent>
      )}

      {/* Trigger */}
      <TouchableOpacity
        style={triggerStyles}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <TextComponent style={triggerTextStyles}>
          {getDisplayText()}
        </TextComponent>
        <IconComponent
          name="calendar"
          family="Ionicons"
          size="sm"
          color={
            disabled ? lightTheme.text.disabled : lightTheme.text.secondary
          }
        />
      </TouchableOpacity>

      {/* Error */}
      {error && <TextComponent style={errorTextStyles}>{error}</TextComponent>}

      {/* Modal - Simple text-based date picker for now */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={modalOverlayStyles}>
          <View style={modalContainerStyles}>
            <View style={modalHeaderStyles}>
              <TextComponent variant="h3">
                {label || 'Select Date'}
              </TextComponent>
            </View>

            {/* Simple date display - You can integrate @react-native-community/datetimepicker later */}
            <TextComponent style={{ textAlign: 'center', marginVertical: 16 }}>
              {mode === 'date'
                ? formatDate(tempDate, format)
                : mode === 'time'
                ? formatTime(tempDate)
                : `${formatDate(tempDate, format)} ${formatTime(tempDate)}`}
            </TextComponent>
            <TextComponent
              variant="caption"
              style={{ textAlign: 'center', marginBottom: 16 }}
              color={lightTheme.text.secondary}
            >
              Install @react-native-community/datetimepicker for full date
              picker
            </TextComponent>

            {/* Footer */}
            <View style={modalFooterStyles}>
              <Button
                title="Cancel"
                onPress={handleCancel}
                variant="outlined"
                style={{ flex: 1 }}
              />
              <Button
                title="Done"
                onPress={handleDone}
                variant="primary"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
