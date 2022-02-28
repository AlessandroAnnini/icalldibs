import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const isWeb = Platform.OS === 'web';

const supabaseUrl = 'https://wgcvvcsmpkjdjkbtbdlk.supabase.co'; // process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnY3Z2Y3NtcGtqZGprYnRiZGxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODQ4MDIsImV4cCI6MTk2MDg2MDgwMn0.ZeUB_U4li62ZKL-nAsugTXzH0zDypKA5J9feISLcuz8'; // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const options = isWeb
  ? undefined
  : {
      localStorage: AsyncStorage,
      detectSessionInUrl: false,
    };

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
