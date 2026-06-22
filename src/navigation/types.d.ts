import {NavigatorScreenParams} from '@react-navigation/native'

export type AuthStackParamList = {
    Login : undefined,
    Signup : undefined,
}

export type AppStackParamList = {
    Dashboard : undefined,
    Feed : undefined,
    Profile : undefined,
}

export type RootStackParamList = {
    Auth : NavigatorScreenParams<AuthStackParamList>,
    App : NavigatorScreenParams<AppStackParamList>,
}