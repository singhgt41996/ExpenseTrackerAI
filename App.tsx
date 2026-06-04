/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Keyboard,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { InputComponent } from './src/components/atoms/input/index';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useState } from 'react';
import { IconComponent } from './src/components/atoms/icon/index';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <InputComponent
        placeholder="sdbfsu"
        value={inputValue}
        onChangeText={setInputValue}
        label="This is the test input Box"
        required={false}
        onBlur={Keyboard.dismiss}
      />

      {/* MaterialIcons: 'home' is correct */}
      <IconComponent name="home" family="MaterialIcons" size="xs" />

      {/* FontAwesome5: Change 'add' to 'plus' */}
      <IconComponent name="plus" family="FontAwesome5" size="lg" />

      {/* MaterialIcons: 'home' is correct */}
      <IconComponent name="home" family="MaterialIcons" size="lg" />

      {/* MaterialIcons: 'add' is correct */}
      <IconComponent
        name="add"
        family="MaterialIcons"
        size={32}
        color="#4CAF50"
      />

      {/* Ionicons: 'camera' or 'camera-outline' is correct */}
      <IconComponent
        name="camera"
        family="Ionicons"
        onPress={() => console.log('Icon pressed!')}
      />
      {/* <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
