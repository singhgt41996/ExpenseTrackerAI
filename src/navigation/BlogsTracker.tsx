import { IconComponent } from '@/components/atoms/icon';
import { BlogsTabNavigator } from '@/navigation/BlogsTabNavigator';
import { BlogsStackParamList } from '@/navigation/types';
import { BlogDetailScreen } from '@/screens/blogs/blogDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<BlogsStackParamList>();

export const BlogsTracker = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BlogsTabNavigator} />
      <Stack.Screen
        name="BlogDetail"
        component={BlogDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <IconComponent
              name="arrow-back"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
