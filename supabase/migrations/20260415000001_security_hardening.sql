-- SECURITY HARDENING FOR MERIDIAN WEBSITE
-- Addresses "Function Search Path Mutable" and "RLS Policy Always True" lint warnings

-- 1. DROP OLD TRIGGERS (Cleanup of legacy member count systems)
DROP TRIGGER IF EXISTS tr_increment_member_count ON public.members;
DROP TRIGGER IF EXISTS tr_sync_member_count ON public.members;

-- 2. DROP UNUSED FUNCTIONS (Flagged by linter but not in codebase)
DROP FUNCTION IF EXISTS public.increment_member_count();
DROP FUNCTION IF EXISTS public.sync_member_count();
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- 2. HARDEN EXISTING FUNCTIONS
-- Redefine with SET search_path = '' and schema-qualified names
CREATE OR REPLACE FUNCTION public.handle_member_count_change()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.site_stats
        SET member_count = member_count + 1,
            last_updated = now()
        WHERE id = 'meridian_global_stats';
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.site_stats
        SET member_count = member_count - 1,
            last_updated = now()
        WHERE id = 'meridian_global_stats';
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 3. REFINE RLS POLICIES
-- Tighten "Allow anonymous inserts" to ensure basic data integrity
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.members;
CREATE POLICY "Allow anonymous inserts" ON public.members
FOR INSERT WITH CHECK (
    email IS NOT NULL AND 
    full_name IS NOT NULL AND
    char_length(email) > 5 AND
    char_length(full_name) > 2
);

-- Ensure "Allow members to join" (if it exists) is also refined or removed
DROP POLICY IF EXISTS "Allow members to join" ON public.members;
