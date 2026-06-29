import React from 'react';
import { AppStackParamList } from '@/navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpenseTracker from '@/navigation/ExpenseTracker';
import { BlogsTracker } from '@/navigation/BlogsTracker';
import { HubScreen } from '@/screens/appScreen/hub';

// const Stack = createNativeStackNavigator<AppStackParamList>();

// export const MainNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Hub" component={HubScreen} />
//       <Stack.Screen name="ExpenseTracker" component={ExpenseTracker} />
//       <Stack.Screen name="Blogs" component={BlogsTracker} />
//     </Stack.Navigator>
//   );
// };

const Stack = createNativeStackNavigator<AppStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Hub" component={HubScreen} />
      <Stack.Screen name="ExpenseTracker" component={ExpenseTracker} />
      <Stack.Screen name="Blogs" component={BlogsTracker} />
    </Stack.Navigator>
  );
};
