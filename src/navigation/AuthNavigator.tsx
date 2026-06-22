import { AuthStackParamList } from "@/navigation/types";
import { LoginScreen } from "@/screens/authscreen/login";
import { SignupScreen } from "@/screens/authscreen/signup";

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack  = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = ()=>{
    return(
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
        </Stack.Navigator>
    )
}