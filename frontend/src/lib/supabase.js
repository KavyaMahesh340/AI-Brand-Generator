// Mock Supabase client — replace with real credentials in .env
// VITE_SUPABASE_URL=https://yourproject.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
