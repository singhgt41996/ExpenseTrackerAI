import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const storageKeys = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  ONBOARDING_DONE: 'onboarding_done',
} as const;

export const storageHelpers = {
  setAuthToken: (token: string) => storage.set(storageKeys.AUTH_TOKEN, token),
  getAuthToken: () => storage.getString(storageKeys.AUTH_TOKEN),
  setRefreshToken: (token: string) =>
    storage.set(storageKeys.REFRESH_TOKEN, token),
  getRefreshToken: () => storage.getString(storageKeys.REFRESH_TOKEN),
  setUser: (user: any) => storage.set(storageKeys.USER, JSON.stringify(user)),
  getUser: (): any => {
    const userStr = storage.getString(storageKeys.USER);
    return userStr ? JSON.parse(userStr) : null;
  },
  clearAuth: () => {
    storage.remove(storageKeys.AUTH_TOKEN);
    storage.remove(storageKeys.REFRESH_TOKEN);
    storage.remove(storageKeys.USER);
  },
  clearAll: () => {
    storage.clearAll();
  },
};
