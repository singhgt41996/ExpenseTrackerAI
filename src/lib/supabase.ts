import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createClient } from '@supabase/supabase-js';

const supaBaseUrl = 'https://jofbvhvmebxpnelmytte.supabase.co';
const supaBaseAnonKey = 'sb_publishable_iaAUbjr-MEua1HmigAaBQw_nksQjBUh';

export const supabase = createClient(supaBaseUrl, supaBaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
