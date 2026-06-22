import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import { TextComponent } from '@/components/atoms/text';
import { LoaderOverlayProps } from '@/components/molecules/loaderOverlay/types';
import { styles } from '@/components/molecules/loaderOverlay/styles';
import { colors } from '@/theme';

export const LoaderOverlay = ({ visible, message }: LoaderOverlayProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          {message ? (
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[900]}
              style={styles.message}
            >
              {message}
            </TextComponent>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};
