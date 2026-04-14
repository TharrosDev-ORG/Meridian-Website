const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) env[key.trim()] = value.join('=').trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function auditProject() {
  console.log('--- Comprehensive Meridian Audit ---\n');

  // 1. Data Sanitization Audit
  const { data: members, error } = await supabase.from('members').select('*');
  if (error) return console.error(error);

  console.log(`[Data Audit: ${members.length} Members]`);
  let issuesFound = 0;
  
  members.forEach(m => {
    const hasWhitespace = m.full_name !== m.full_name.trim() || m.email !== m.email.trim();
    const hasUpperCaseEmail = m.email !== m.email.toLowerCase();
    
    if (hasWhitespace || hasUpperCaseEmail) {
      console.log(`- Issue in record: "${m.full_name}" <${m.email}>`);
      issuesFound++;
    }
  });
  
  if (issuesFound === 0) console.log('✔ All existing records are properly sanitized.');
  else console.log(`! Found ${issuesFound} records needing sanitization.`);

  // 2. Schema Intelligence (via RPC or common patterns)
  console.log('\n[Schema Intelligence]');
  // Checking for created_at (standard Supabase field)
  const hasTimestamp = members.every(m => m.created_at);
  console.log(hasTimestamp ? '✔ Timestamping (created_at) is active.' : '! Missing timestamps.');

  // Check for expected fields from new form
  const fields = Object.keys(members[0] || {});
  const expected = ['full_name', 'email', 'role', 'institution', 'interests', 'heard_from', 'volunteer_interest'];
  const missing = expected.filter(f => !fields.includes(f));
  
  if (missing.length > 0) console.log(`! Missing schema columns: ${missing.join(', ')}`);
  else console.log('✔ Schema is up-to-date with current form requirements.');
}

auditProject();
