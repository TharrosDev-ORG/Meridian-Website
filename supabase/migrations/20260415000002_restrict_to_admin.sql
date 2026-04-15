-- REVISION: SIMPLIFIED API LOCKDOWN
-- Based on user request to remove admin metadata management.
-- Registrations still work via the website form (Server Actions with service_role).
-- All other direct API access to the member list is blocked.

-- 1. CLEANUP ALL OLD POLICIES
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.members;
DROP POLICY IF EXISTS "Admins can manage members" ON public.members;
DROP POLICY IF EXISTS "Admins can edit stats" ON public.site_stats;

-- 2. SECURE MEMBERS TABLE (Full API Lockdown)
-- By enabling RLS but adding NO policies, we block all direct API access (anon/authenticated).
-- Your registrations safely continue using 'service_role'.
-- You can still see and manage everything in the Supabase Dashboard.
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- 3. SECURE SITE STATS TABLE
-- Public can still view for the live counter.
-- All other API modifications are blocked.
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view stats" ON public.site_stats;
CREATE POLICY "Public can view stats" ON public.site_stats
FOR SELECT USING (true);
