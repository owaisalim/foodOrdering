import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://kylyvbzsickeshkxayip.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bHl2YnpzaWNrZXNoa3hheWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwOTY1MzcsImV4cCI6MjAzODY3MjUzN30._2f2bkCv4HNQ0FS--OKyDu2QRQz55KvfvA3NSMqTrCY"
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,  
    persistSession: true,
    detectSessionInUrl: false,
  },
});