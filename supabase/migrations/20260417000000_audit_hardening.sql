-- 🛡️ SECURITY AUDIT HARDENING (2026-04-17)
-- Purpose: Close the public "Back Door" by removing direct anonymous inserts.
-- Impact: Forces all registrations through the Website's hardened Server Action.
-- Compatibility: Preserves all Member OS administrative policies.

-- 1. DROP INSECURE PUBLIC ENTRY
-- This policy allowed anyone with the 'anon' key to insert data directly.
-- We now rely on the Website's Server Action (Service Role) for all signups.
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.members;

-- 2. HARDEN SITE STATISTICS
-- Explicitly restrict anonymous access to SELECT only.
DROP POLICY IF EXISTS "Public can view stats" ON public.site_stats;
CREATE POLICY "Public can view stats (Read-Only)" ON public.site_stats
    FOR SELECT 
    TO anon
    USING (true);

-- 3. HARDEN CORE AUTH FUNCTIONS (Consistency Sync)
-- Redefine OS-critical functions with SECURITY DEFINER and SET search_path = ''.
CREATE OR REPLACE FUNCTION public.verify_master_signature(p_hash text)
RETURNS boolean AS $$
DECLARE
    v_stored_hash text;
BEGIN
    SELECT value INTO v_stored_hash FROM public.system_config WHERE key = 'master_signature_hash';
    RETURN (v_stored_hash = p_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.set_master_signature(p_new_hash text)
RETURNS void AS $$
BEGIN
    UPDATE public.system_config 
    SET value = p_new_hash, 
        updated_at = now() 
    WHERE key = 'master_signature_hash';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 4. VALIDATE RLS IS ENABLED
-- Ensures all tables are under the RLS umbrella.
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY; -- OS Sensitive Table

-- 4. LOGGING (Audit Comment)
COMMENT ON TABLE public.members IS 'Member directory. Enrollment strictly controlled via Server Actions.';
COMMENT ON TABLE public.site_stats IS 'Public performance indicators. Read-only for anonymous users.';
