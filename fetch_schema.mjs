import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchSchema() {
  const { data: au, error: auErr } = await supabase.from('admin_users').select('*').limit(1);
  const { data: bd, error: bdErr } = await supabase.from('blocked_dates').select('*').limit(1);
  console.log('admin_users', au, auErr);
  console.log('blocked_dates', bd, bdErr);
}

fetchSchema();
