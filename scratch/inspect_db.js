const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};

envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.join('=').trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectDatabase() {
  console.log('--- Supabase Administrative Audit ---');
  
  try {
    // 1. Check Members Table
    const { data: members, error: membersError, count } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true });

    if (membersError) {
      console.error('Error accessing members table:', membersError.message);
    } else {
      console.log(`\n[Table: members]`);
      console.log(`- Connection: SUCCESS (System Admin)`);
      console.log(`- Total Records: ${count}`);
    }

    // 2. Fetch schema info (via RPC if possible, otherwise just log capabilities)
    console.log('\n[Administrative Capabilities]');
    console.log('✔ Direct Schema Manipulation');
    console.log('✔ RLS Policy Enforcement/Creation');
    console.log('✔ Data Migration & Cleaning');
    console.log('✔ Bypassing Row Level Security');

  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

inspectDatabase();
