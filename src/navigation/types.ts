import { NavigatorScreenParams } from '@react-navigation/native';

export type ExpenseTrackerParamList = {
  Tab: NavigatorScreenParams<ExpenseTabParamList> | undefined;
  // non-tab screens — month ('yyyy-MM', see @/utils/date#monthKey) tells the screen
  // which cached useTransactions(month) list to look the id up in.
  ExpenseDetail: { id: string; month: string };
  EditExpense: { id: string; month: string };
  // category is optional — set when arriving from a CategoryBreakdown row to pre-filter the list.
  AllTransactions: { category?: string } | undefined;
  CategoryBreakdown: undefined;
};
export type ExpenseTabParamList = {
  Home: undefined; // Dashboard
  Stats: undefined;
  AddExpense: undefined;
  Profile: undefined;
};

export type BlogsStackParamList = {
  Tabs: NavigatorScreenParams<BlogsTabParamList> | undefined;
  BlogDetail: { id: string };
};

export type BlogsTabParamList = {
  Home: undefined; // Blogs feed
  AddBlog: undefined;
  Stats: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type AppStackParamList = {
  Hub: undefined;
  ExpenseTracker: NavigatorScreenParams<ExpenseTrackerParamList> | undefined;
  Blogs: NavigatorScreenParams<BlogsStackParamList> | undefined;
};
