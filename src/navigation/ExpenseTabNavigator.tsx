import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExpenseTabParamList } from '@/navigation/types';
import { DashboardScreen } from '@/screens/appScreen/dashboard';
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
        options={({ navigation }) => ({
          // headerShown: false,
          // headerLeft: () => (
          //   <IconComponent
          //     name="arrow-back"
          //     onPress={() => navigation.goBack()} // bubbles up → pops to Hub
          //   />
          // ),
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="home" color={color} size={size} />
          ),
        })}
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
        component={PlaceholderScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
