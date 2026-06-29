import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExpenseTrackerParamList } from '@/navigation/types';
import { ExpenseTabNavigator } from '@/navigation/ExpenseTabNavigator';
import { ExpenseDetailScreen } from '@/screens/appScreen/expenseDetail';
import { EditExpenseScreen } from '@/screens/appScreen/editExpense';
import { IconComponent } from '@/components/atoms/icon';

const Stack = createNativeStackNavigator<ExpenseTrackerParamList>();

const ExpenseTracker = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={ExpenseTabNavigator} />
      <Stack.Screen
        name="ExpenseDetail"
        component={ExpenseDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <IconComponent
              onPress={() => navigation.goBack()}
              name="arrow-back"
            />
          ),
        })}
      />
      <Stack.Screen
        name="EditExpense"
        component={EditExpenseScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <IconComponent
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          ),
          gestureEnabled: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default ExpenseTracker;
