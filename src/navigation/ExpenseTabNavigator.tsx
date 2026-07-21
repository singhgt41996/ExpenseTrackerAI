import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExpenseTabParamList } from '@/navigation/types';
import { DashboardScreen } from '@/screens/expense/dashboard';
import { AddExpenseScreen } from '@/screens/expense/addExpense';
import { ProfileScreen } from '@/screens/profile';
import { PlaceholderScreen } from '@/screens/shared/placeholder';
import { IconComponent } from '@/components/atoms/icon';
import { colors } from '@/theme';

const Tab = createBottomTabNavigator<ExpenseTabParamList>();

export const ExpenseTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.neutral.gray[400],
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="bar-chart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={({ navigation }) => ({
          title: 'Add Expense',
          tabBarLabel: 'Add',
          headerShown: true,
          headerLeft: () => (
            <IconComponent
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="add-circle" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
