const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) env[key.trim()] = value.join('=').trim();
});

const anonClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function probeSecurity() {
  console.log('--- Public API Security Probe ---\n');

  // 1. Check if public can READ data
  const { data, error } = await anonClient.from('members').select('*').limit(1);
  if (error) {
    console.log('✔ RLS Block (Read): Public cannot read member data. (Good)');
  } else if (data.length > 0) {
    console.log('! Security Risk: Public can READ member data! RLS needs fixing.');
  }

  // 2. Check Uniqueness Constraint
  // We'll try to find an existing email first (using service role in a separate client)
  const serviceClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: existing } = await serviceClient.from('members').select('email').limit(1).single();
  
  if (existing) {
    console.log(`\nTesting uniqueness for: ${existing.email}`);
    const { error: insertError } = await anonClient.from('members').insert([{ email: existing.email, full_name: 'Probe Test' }]);
    if (insertError && insertError.code === '23505') {
       console.log('✔ DB Constraint: Unique email constraint is ACTIVE.');
    } else if (insertError) {
       console.log(`- Insert failed but with different error: ${insertError.message}`);
    } else {
       console.log('! Security Risk: Successfully inserted duplicate email!');
    }
  }
}

probeSecurity();
