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
import { InputComponent } from './src/components/atoms/input/index';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useAuthStore } from './src/store/authStore';
import { TextComponent } from './src/components/atoms/text/index';
import { colors } from './src/theme/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { checkAuth, isLoading, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color="#4CAF50" />
        <TextComponent variant="bodyMedium" color={colors.neutral.gray[900]}>
          Checking Autentication
        </TextComponent>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        {isAuthenticated ? (
          <>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[900]}
            >
              ✅ Logged In!
            </TextComponent>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[900]}
            >
              Email: {user?.email}
            </TextComponent>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[900]}
            >
              Name : {user?.name}
            </TextComponent>
          </>
        ) : (
          <>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[900]}
            >
              ❌ Not Logged In
            </TextComponent>
            <TextComponent
              variant="bodyMedium"
              color={colors.neutral.gray[900]}
            >
              You need to login
            </TextComponent>
          </>
        )}
      </View>
    </SafeAreaProvider>
  );
}

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();
//   const [inputValue, setInputValue] = useState<string>('');
//   return (
//     // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
//       <InputComponent
//         placeholder="sdbfsu"
//         value={inputValue}
//         onChangeText={setInputValue}
//         label="This is the test input Box"
//         required={false}
//       />

//       {/* MaterialIcons: 'home' is correct */}
//       <IconComponent name="home" family="MaterialIcons" size="xs" />
//     </View>
//     // </TouchableWithoutFeedback>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
