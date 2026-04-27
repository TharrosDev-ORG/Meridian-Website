-- ==========================================
-- MERIDIAN PROJECT: SOVEREIGN HARDENING MIGRATION
-- ==========================================
-- Scope: Fixes Supabase Linter Warnings & Hardens RPC Security
-- ==========================================

-- 1. SEARCH PATH HARDENING (Fixes 0011_function_search_path_mutable)
---------------------------------------------
ALTER FUNCTION public.generate_member_number() SET search_path = public;
ALTER FUNCTION public.tr_assign_member_number() SET search_path = public;
ALTER FUNCTION public.tr_lock_member_number() SET search_path = public;
ALTER FUNCTION public.handle_member_count_change() SET search_path = public;
ALTER FUNCTION public.handle_member_join_date() SET search_path = public;
ALTER FUNCTION public.resolve_member_identity(text, text) SET search_path = public;
ALTER FUNCTION public.secure_create_event(text, timestamptz, text, integer, text, boolean, text) SET search_path = public;
ALTER FUNCTION public.secure_register_for_event(uuid, text, text) SET search_path = public;
ALTER FUNCTION public.update_event_rsvp_count() SET search_path = public;
ALTER FUNCTION public.log_archival_action(text, text, text, jsonb) SET search_path = public;
ALTER FUNCTION public.initialize_archival_vault(text) SET search_path = public;
ALTER FUNCTION public.get_archival_setting(text) SET search_path = public;

-- 2. EXECUTE LOCKDOWN (Fixes 0028_anon_security_definer_function_executable)
---------------------------------------------
-- REVOKE from everyone first
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM anon;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM authenticated;

-- GRANT only to the service_role (What the Website's Server Actions use)
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- 3. RLS REPAIRS (Fixes 0024_permissive_rls_policy)
---------------------------------------------

-- Fix speaker_activity_log (Restrict to authenticated admin only)
DO $$ BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'speaker_activity_log') THEN
        DROP POLICY IF EXISTS "Allow all OS operations" ON public.speaker_activity_log;
        CREATE POLICY "Admin access to logs" ON public.speaker_activity_log
            FOR ALL TO authenticated
            USING ((SELECT auth.jwt() ->> 'email') = 'magnus.abdelnour@gmail.com');
    END IF;
END $$;

-- Fix speaker_notes (Restrict to authenticated admin only)
DO $$ BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'speaker_notes') THEN
        DROP POLICY IF EXISTS "Allow all OS operations" ON public.speaker_notes;
        CREATE POLICY "Admin access to notes" ON public.speaker_notes
            FOR ALL TO authenticated
            USING ((SELECT auth.jwt() ->> 'email') = 'magnus.abdelnour@gmail.com');
    END IF;
END $$;

-- Fix speaker_applications (Allow public INSERT but NO public SELECT/UPDATE)
DO $$ BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'speaker_applications') THEN
        DROP POLICY IF EXISTS "Allow public insertion for applications" ON public.speaker_applications;
        CREATE POLICY "Public can apply" ON public.speaker_applications
            FOR INSERT TO public WITH CHECK (true);
        
        CREATE POLICY "Admin can manage applications" ON public.speaker_applications
            FOR ALL TO authenticated
            USING ((SELECT auth.jwt() ->> 'email') = 'magnus.abdelnour@gmail.com');
    END IF;
END $$;

-- Hardening standard formatting functions (Safe to be Invoker)
ALTER FUNCTION public.format_member_date(timestamptz) SECURITY INVOKER;
