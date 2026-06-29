import {NavigatorScreenParams} from '@react-navigation/native'

export type ExpenseTrackerParamList = {
    Tab : NavigatorScreenParams<ExpenseTabParamList> | undefined,
    ExpenseDetail: { id: string };   // non-tab screens
    EditExpense: { id: string };
}
export type ExpenseTabParamList = {
    Home: undefined;       // Dashboard
    Stats: undefined;
    AddExpense: undefined;
    Profile: undefined;   
}


export type BlogsStackParamList = {
    Tabs: NavigatorScreenParams<BlogsTabParamList> | undefined;
    BlogDetail: { id: string };
};

export type BlogsTabParamList = {
    Home: undefined;       // Blogs feed
    AddBlog: undefined;
    Stats: undefined;
    Profile: undefined;
};

export type AuthStackParamList = {
    Login : undefined,
    Signup : undefined,
}

export type AppStackParamList = {
    Hub : undefined,
    ExpenseTracker: NavigatorScreenParams<ExpenseTrackerParamList> | undefined,
    Blogs: NavigatorScreenParams<BlogsStackParamList> | undefined,
}
