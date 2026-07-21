import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExpenseTrackerParamList } from '@/navigation/types';
import { ExpenseTabNavigator } from '@/navigation/ExpenseTabNavigator';
import { ExpenseDetailScreen } from '@/screens/expense/expenseDetail';
import { EditExpenseScreen } from '@/screens/expense/editExpense';
import { AllTransactionsScreen } from '@/screens/expense/allTransactions';
import { CategoryBreakdownScreen } from '@/screens/expense/categoryBreakdown';
import { IconComponent } from '@/components/atoms/icon';

const Stack = createNativeStackNavigator<ExpenseTrackerParamList>();

const ExpenseTracker = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={ExpenseTabNavigator} />
      <Stack.Screen
        name="AllTransactions"
        component={AllTransactionsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'All Transactions',
          headerLeft: () => (
            <IconComponent
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CategoryBreakdown"
        component={CategoryBreakdownScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Spending by Category',
          headerLeft: () => (
            <IconComponent
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ExpenseDetail"
        component={ExpenseDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Expense Details',
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
          title: 'Edit Expense',
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
