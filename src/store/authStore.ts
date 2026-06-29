import { supabase } from '@/lib/supabase';
import { storageHelpers } from '@/utils/storage';
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  //   Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  //   Login Actions
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.session || !data.user) throw new Error('No Session Created');

      console.log('Login data:', data);
      // Save to MMKV (persistent storage)
      storageHelpers.setAuthToken(data.session.access_token);
      storageHelpers.setRefreshToken(data.session.refresh_token);
      storageHelpers.setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        avatar: data.user.user_metadata?.avatar,
      });

      // Save to Zustand (in-memory)
      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name,
          avatar: data.user.user_metadata?.avatar,
        },
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error: any) {
      console.log('Login error:', error);
      set({
        isAuthenticated: false,
        isLoading: false,
        error: error.message || 'Login Failed',
      });
      throw error;
    }
  },

  // Signup action
  signup: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    console.log('Payload before Sign up',email, password, name)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name } },
      });

      if (error){
        console.log('Error from the api ',error)
        throw error;
      }
      if (!data.session || !data.user) throw new Error('No session Found');
      console.log(data)

      // Save to MMKV
      storageHelpers.setAuthToken(data.session.access_token);
      storageHelpers.setRefreshToken(data.session.refresh_token);
      storageHelpers.setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        avatar: data.user.user_metadata?.avatar,
      });

      //   Save to Zustand

      set({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name,
          avatar: data.user.user_metadata?.avatar,
        },
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'SignUp Failed',
        isAuthenticated: false,
      });
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();

      // Clear MMKV storage
      storageHelpers.clearAuth();

      //   Clear Zustand store
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      // Force clear even if Supabase fails
      storageHelpers.clearAuth();
      set({
        isAuthenticated: false,
        user: null,
      });
      throw error;
    }
  },

  // Check authentication on app start
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = storageHelpers.getAuthToken();
      if (!token) {
        set({
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data.user) {
        console.log('Token invalid:', error?.message);
        storageHelpers.clearAuth();
        set({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
        return;
      }

      const savedUser = storageHelpers.getUser();
      set({
        user: savedUser || {
          id: data.user.id,
          name: data.user.user_metadata.name,
          email: data.user.email,
          avatar: data.user.user_metadata.avatar,
        },
        isAuthenticated: true,
        isLoading: false,
      });
      console.log('sssssss');
    } catch (error) {
      // Network error or other issues
      console.error('checkAuth error:', error);
      // When in doubt, clear and show login
      storageHelpers.clearAuth();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
