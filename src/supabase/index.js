import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxhyxadnfhoacsamoigo.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4aHl4YWRuZmhvYWNzYW1vaWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMxMTE1MTUsImV4cCI6MTk3ODY4NzUxNX0.Z1F_HYyqhn-YzrN_Jw1vyr0PITty31bkY6d4YLKzm0k';

export default createClient(supabaseUrl, supabaseAnonToken);
