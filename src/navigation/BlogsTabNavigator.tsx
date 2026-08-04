import { IconComponent } from '@/components/atoms/icon';
import { BlogsTabParamList } from '@/navigation/types';
import { ProfileScreen } from '@/screens/profile';
import { colors } from '@/theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BlogsHomeScreen } from '@/screens/blogs/home';
import { AddBlogsScreen } from '@/screens/blogs/addBlogs';

const Tab = createBottomTabNavigator<BlogsTabParamList>();

export const BlogsTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary[400],
        tabBarInactiveTintColor: colors.secondary[50],
        tabBarStyle: { backgroundColor: colors.secondary[600] },
      }}
    >
      <Tab.Screen
        name="Home"
        component={BlogsHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddBlog"
        component={AddBlogsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Create Blog',
          tabBarLabel: 'Add',
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
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
