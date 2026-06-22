/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from './src/store/authStore';
import { TextComponent } from './src/components/atoms/text/index';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ScreenWrapper } from './src/components/templates/screenwrapper';
import { LoaderOverlay } from './src/components/molecules/loaderOverlay';
import { colors } from './src/theme/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
    </SafeAreaProvider>
  );
}

// Walks down nested navigators (Stack -> Tab -> ...) to the focused screen
const getActiveRouteName = (state?: NavigationState): string | undefined => {
  if (!state) {
    return undefined;
  }
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state as NavigationState);
  }
  return route.name;
};

const AppContent = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await checkAuth();
      } finally {
        setInitializing(false);
      }
    };
    init();
  }, [checkAuth]);

  // Cold-start check: full screen (there's no UI to preserve yet)
  if (initializing) {
    return (
      <ScreenWrapper padded edges={['top', 'bottom']}>
        <View style={styles.container}>
          <ActivityIndicator size={'large'} color={colors.primary[500]} />
          <TextComponent variant="bodyMedium" color={colors.neutral.gray[900]}>
            Loading...
          </TextComponent>
        </View>
      </ScreenWrapper>
    );
  }

  // After init, keep the app mounted and show the loader as an overlay
  return (
    <>
      <NavigationContainer
        onStateChange={(state) => {
          console.log('Active route:', getActiveRouteName(state));
          console.log('Full nav state:', JSON.stringify(state, null, 2));
        }}
      >
        <RootNavigator />
      </NavigationContainer>
      <LoaderOverlay visible={isLoading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
