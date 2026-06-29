import { IconComponent } from '@/components/atoms/icon';
import { BlogsTabParamList } from '@/navigation/types';
import { DashboardScreen } from '@/screens/appScreen/dashboard';
import { PlaceholderScreen } from '@/screens/shared/placeholder';
import { colors } from '@/theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

const Tab = createBottomTabNavigator<BlogsTabParamList>();

export const BlogsTabNavigator = () => {
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
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="home" color={color} size={size} />
          ),
          headerLeft: () => (
            <IconComponent
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Tab.Screen
        name="AddBlog"
        component={PlaceholderScreen}
        options={({ navigation }) => ({
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="home" color={color} size={size} />
          ),
          headerLeft: () => (
            <IconComponent
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Stats"
        component={PlaceholderScreen}
        options={({ navigation }) => ({
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="bar-chart" color={color} size={size} />
          ),
          headerLeft: () => (
            <IconComponent
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
        options={({ navigation }) => ({
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="person" color={color} size={size} />
          ),
          headerLeft: () => (
            <IconComponent
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
