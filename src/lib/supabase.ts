import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';
import { mmkvStorage } from '@/utils/mmkvStorage';

const supaBaseUrl = 'https://jofbvhvmebxpnelmytte.supabase.co';
const supaBaseAnonKey = 'sb_publishable_iaAUbjr-MEua1HmigAaBQw_nksQjBUh';

export const supabase = createClient(supaBaseUrl, supaBaseAnonKey, {
  auth: {
    storage: mmkvStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
