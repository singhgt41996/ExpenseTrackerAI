import React, { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { addMonths, startOfMonth } from 'date-fns';
import { TextComponent } from '@/components/atoms/text';
import { IconComponent } from '@/components/atoms/icon';
import { ButtonComponent } from '@/components/atoms/button';
import { colors } from '@/theme';
import { monthLabel } from '@/utils/date';
import {
  getModalOverlayStyles,
  getModalContainerStyles,
  getModalHeaderStyles,
  getModalFooterStyles,
  getStepperRowStyles,
  getQuickPicksRowStyles,
} from '@/components/molecules/datePicker/styles';
import { styles } from '@/components/molecules/monthPicker/styles';

export interface MonthPickerProps {
  value: Date;
  onChange: (month: Date) => void;
  /** Months after this one are disabled — both the quick chevron and the modal's stepper. */
  maximumDate?: Date;
}

const exceedsMax = (month: Date, maximumDate?: Date): boolean =>
  !!maximumDate && startOfMonth(month) > startOfMonth(maximumDate);

/**
 * "‹ July 2026 ›" trigger row. The chevrons step one month at a time; tapping
 * the label opens a modal (reusing the DatePicker molecule's modal chrome) to
 * jump further — same interaction pattern as DatePicker, just month-grained.
 */
export const MonthPicker = ({ value, onChange, maximumDate }: MonthPickerProps) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [tempMonth, setTempMonth] = useState(startOfMonth(value));

  const isNextDisabled = exceedsMax(addMonths(value, 1), maximumDate);
  const isTempNextDisabled = exceedsMax(addMonths(tempMonth, 1), maximumDate);

  const goToPrevMonth = () => onChange(startOfMonth(addMonths(value, -1)));
  const goToNextMonth = () => {
    if (isNextDisabled) return;
    onChange(startOfMonth(addMonths(value, 1)));
  };

  const openPicker = () => {
    setTempMonth(startOfMonth(value));
    setIsPickerOpen(true);
  };
  const shiftTempMonth = (delta: number) =>
    setTempMonth(prev => addMonths(prev, delta));
  const handleCancel = () => setIsPickerOpen(false);
  const handleConfirm = () => {
    onChange(tempMonth);
    setIsPickerOpen(false);
  };

  return (
    <View style={styles.row}>
      <IconComponent
        name="chevron-left"
        family="MaterialIcons"
        onPress={goToPrevMonth}
      />
      <Pressable onPress={openPicker}>
        <TextComponent variant="h3" color={colors.neutral.gray[900]}>
          {monthLabel(value)}
        </TextComponent>
      </Pressable>
      <IconComponent
        name="chevron-right"
        family="MaterialIcons"
        disabled={isNextDisabled}
        color={isNextDisabled ? colors.neutral.gray[300] : undefined}
        onPress={goToNextMonth}
      />

      <Modal
        visible={isPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={getModalOverlayStyles()}>
          <View style={getModalContainerStyles()}>
            <View style={getModalHeaderStyles()}>
              <TextComponent variant="h3">Select Month</TextComponent>
            </View>

            <View style={getStepperRowStyles()}>
              <IconComponent
                name="chevron-left"
                family="MaterialIcons"
                onPress={() => shiftTempMonth(-1)}
              />
              <TextComponent style={styles.stepperLabel}>
                {monthLabel(tempMonth)}
              </TextComponent>
              <IconComponent
                name="chevron-right"
                family="MaterialIcons"
                disabled={isTempNextDisabled}
                color={isTempNextDisabled ? colors.neutral.gray[300] : undefined}
                onPress={() => shiftTempMonth(1)}
              />
            </View>

            <View style={getQuickPicksRowStyles()}>
              <ButtonComponent
                title="This Month"
                variant="outline"
                size="sm"
                onPress={() => setTempMonth(startOfMonth(new Date()))}
              />
              <ButtonComponent
                title="Last Month"
                variant="outline"
                size="sm"
                onPress={() => setTempMonth(startOfMonth(addMonths(new Date(), -1)))}
              />
            </View>

            <View style={getModalFooterStyles()}>
              <ButtonComponent
                title="Cancel"
                variant="outline"
                size="md"
                onPress={handleCancel}
                style={styles.modalButton}
              />
              <ButtonComponent
                title="Done"
                variant="primary"
                size="md"
                onPress={handleConfirm}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
