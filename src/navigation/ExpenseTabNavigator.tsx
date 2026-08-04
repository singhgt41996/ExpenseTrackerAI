import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExpenseTabParamList } from '@/navigation/types';
import { HomeScreen } from '@/screens/expense/home';
import { AddExpenseScreen } from '@/screens/expense/addExpense';
import { ProfileScreen } from '@/screens/profile';
import { IconComponent } from '@/components/atoms/icon';
import { colors } from '@/theme';
import StatsScreen from '@/screens/expense/stats';

const Tab = createBottomTabNavigator<ExpenseTabParamList>();

export const ExpenseTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.neutral.gray[400],
        // tabBarBackground: () => (
        //   <View
        //     style={{ flex: 1, backgroundColor: colors.primary[900] }}
        //   ></View>
        // ),
        tabBarStyle: {
          backgroundColor: colors.primary[900],
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
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
