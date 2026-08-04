import { View, TouchableOpacity, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import { addMonths, getDaysInMonth, isSameDay, startOfMonth } from 'date-fns';
import {
  DatePickerProps,
  DateFormat,
} from '@/components/molecules/datePicker/types';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { ButtonComponent } from '@/components/atoms/button';
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
  getQuickPicksRowStyles,
  getMonthNavStyles,
  getWeekdaysRowStyles,
  getWeekdayTextStyles,
  getCalendarGridStyles,
  getDayCellContainerStyles,
  getDayCellStyles,
  getDayCellTextStyles,
} from '@/components/molecules/datePicker/styles';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
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
const MONTH_NAMES_SHORT = [
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
  // The month currently shown in the grid — separate from tempDate so you can
  // browse months without changing the selection until you actually tap a day.
  const [viewMonth, setViewMonth] = useState<Date>(
    startOfMonth(value || new Date()),
  );

  const containerStyles = getContainerStyles();
  const labelStyles = getLabelStyles(!!error);
  const triggerStyles = getTriggerStyles(!!error, disabled);
  const triggerTextStyles = getTriggerTextStyles(!!value);
  const errorTextStyles = getErrorTextStyles();
  const modalOverlayStyles = getModalOverlayStyles();
  const modalContainerStyles = getModalContainerStyles();
  const modalHeaderStyles = getModalHeaderStyles();
  const modalFooterStyles = getModalFooterStyles();
  const quickPicksRowStyles = getQuickPicksRowStyles();
  const monthNavStyles = getMonthNavStyles();
  const weekdaysRowStyles = getWeekdaysRowStyles();
  const weekdayTextStyles = getWeekdayTextStyles();
  const calendarGridStyles = getCalendarGridStyles();
  const dayCellContainerStyles = getDayCellContainerStyles();

  const formatDate = (date: Date | null, dateFormat: DateFormat): string => {
    if (!date) return placeholder;

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
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
        return `${pad(day)} ${MONTH_NAMES_SHORT[month]} ${year}`;

      case 'DD MMMM YYYY':
        return `${pad(day)} ${MONTH_NAMES[month]} ${year}`;

      case 'MMM DD, YYYY':
        return `${MONTH_NAMES_SHORT[month]} ${pad(day)}, ${year}`;

      case 'MMMM DD, YYYY':
        return `${MONTH_NAMES[month]} ${pad(day)}, ${year}`;

      default:
        return `${pad(day)} ${MONTH_NAMES_SHORT[month]} ${year}`;
    }
  };

  // Header above the grid only ever needs "Month YYYY", regardless of `format`.
  const getMonthYearLabel = (date: Date): string =>
    `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

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
      const initial = value || new Date();
      setTempDate(initial);
      setViewMonth(startOfMonth(initial));
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

  const isBeforeMin = (date: Date): boolean =>
    !!minimumDate && date < minimumDate;

  const isAfterMax = (date: Date): boolean =>
    !!maximumDate && date > maximumDate;

  const goToToday = () => {
    const today = new Date();
    setTempDate(today);
    setViewMonth(startOfMonth(today));
  };

  // Mon-first grid would need shifting by getDay(); keeping Sun-first (getDay()
  // as-is) since that's what the WEEKDAY_LABELS row above assumes.
  const getCalendarCells = (month: Date): (Date | null)[] => {
    const leadingBlanks = month.getDay();
    const daysInMonth = getDaysInMonth(month);
    const cells: (Date | null)[] = new Array(leadingBlanks).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
      // Noon avoids the date shifting by a day when this later gets
      // converted with `.toISOString()` (UTC) for storage.
      cells.push(
        new Date(month.getFullYear(), month.getMonth(), day, 12, 0, 0),
      );
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  };
  const calendarCells = getCalendarCells(viewMonth);
  const isNextMonthDisabled = isAfterMax(
    startOfMonth(addMonths(viewMonth, 1)),
  );

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

            {/* Calendar grid — no native module required.
                Swap for @react-native-community/datetimepicker later if you want native pickers. */}
            <View style={monthNavStyles}>
              <IconComponent
                name="chevron-left"
                family="MaterialIcons"
                onPress={() => setViewMonth(prev => addMonths(prev, -1))}
              />
              <TextComponent variant="h3">
                {getMonthYearLabel(viewMonth)}
              </TextComponent>
              <IconComponent
                name="chevron-right"
                family="MaterialIcons"
                onPress={() => setViewMonth(prev => addMonths(prev, 1))}
                disabled={isNextMonthDisabled}
                color={isNextMonthDisabled ? colors.neutral.gray[300] : undefined}
              />
            </View>

            <View style={weekdaysRowStyles}>
              {WEEKDAY_LABELS.map((day, i) => (
                <TextComponent key={i} style={weekdayTextStyles}>
                  {day}
                </TextComponent>
              ))}
            </View>

            <View style={calendarGridStyles}>
              {calendarCells.map((cell, i) => {
                if (!cell) {
                  return <View key={i} style={dayCellContainerStyles} />;
                }
                const cellDisabled = isBeforeMin(cell) || isAfterMax(cell);
                const selected = isSameDay(cell, tempDate);
                const isToday = isSameDay(cell, new Date());
                return (
                  <View key={i} style={dayCellContainerStyles}>
                    <Pressable
                      disabled={cellDisabled}
                      onPress={() => setTempDate(cell)}
                      style={getDayCellStyles(selected, isToday)}
                    >
                      <TextComponent
                        style={getDayCellTextStyles(selected, cellDisabled)}
                      >
                        {cell.getDate()}
                      </TextComponent>
                    </Pressable>
                  </View>
                );
              })}
            </View>

            <View style={quickPicksRowStyles}>
              <ButtonComponent
                title="Today"
                variant="outline"
                size="sm"
                onPress={goToToday}
              />
            </View>

            {/* Footer */}
            <View style={modalFooterStyles}>
              <ButtonComponent
                title="Cancel"
                onPress={handleCancel}
                variant="outline"
                size="md"
                style={{ flex: 1 }}
              />
              <ButtonComponent
                title="Done"
                onPress={handleDone}
                variant="primary"
                size="md"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
