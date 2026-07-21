import { IconComponent } from '@/components/atoms/icon';
import { BlogsTabParamList } from '@/navigation/types';
import { PlaceholderScreen } from '@/screens/shared/placeholder';
import { ProfileScreen } from '@/screens/profile';
import { colors } from '@/theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

const Tab = createBottomTabNavigator<BlogsTabParamList>();

export const BlogsTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.neutral.gray[400],
        headerLeft: () => (
          <IconComponent name="arrow-back" onPress={() => navigation.goBack()} />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddBlog"
        component={PlaceholderScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="add-circle" color={color} size={size} />
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
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
