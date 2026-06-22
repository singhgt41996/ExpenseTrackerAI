import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStackParamList } from "@/navigation/types";
import { DashboardScreen } from "@/screens/appScreen/dashboard";


const Tab =  createBottomTabNavigator<AppStackParamList>()

export const MainNavigator = ()=>{
    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name="Dashboard" component={DashboardScreen}/>
        </Tab.Navigator>
    )
}