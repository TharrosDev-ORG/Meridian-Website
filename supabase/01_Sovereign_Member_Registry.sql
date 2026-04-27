-- ==========================================
-- MERIDIAN PROJECT: 01 - SOVEREIGN MEMBER REGISTRY
-- ==========================================
-- Site Scope: Meridian Website / Core Registry
-- ==========================================

-- 1. EXTENSIONS
---------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;

-- 2. ENUM TYPES
---------------------------------------------
DO $$ BEGIN
    CREATE TYPE public.institution_name AS ENUM ('Carleton University', 'University of Ottawa', 'Algonquin College', 'Other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE public.member_role AS ENUM ('Student', 'Alumni', 'Professor / Faculty', 'Professional', 'Other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE public.referral_source AS ENUM ('Friend or Peer', 'Professor', 'Social Media', 'Campus Event', 'Current Member');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE public.volunteer_level AS ENUM ('Yes', 'Maybe', 'Not at this time');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 3. CORE MEMBER REGISTRY
---------------------------------------------
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    email extensions.citext UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role public.member_role,
    role_other TEXT,
    institution public.institution_name,
    institution_other TEXT,
    interests TEXT[] DEFAULT '{}',
    heard_from public.referral_source,
    volunteer_interest public.volunteer_level,
    join_date_readable TEXT,
    member_number TEXT UNIQUE,
    is_verified BOOLEAN DEFAULT false,
    accepted_terms BOOLEAN NOT NULL DEFAULT false
);

-- 3.1 MEMBER NUMBER GENERATION
---------------------------------------------
CREATE SEQUENCE IF NOT EXISTS public.member_number_seq START 1001;

CREATE OR REPLACE FUNCTION public.generate_member_number()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_seq_val BIGINT;
    v_year TEXT;
BEGIN
    SELECT nextval('public.member_number_seq') INTO v_seq_val;
    SELECT to_char(now(), 'YY') INTO v_year;
    RETURN 'M' || v_year || '-' || lpad(v_seq_val::text, 4, '0');
END;
$$;

CREATE OR REPLACE FUNCTION public.tr_assign_member_number()
RETURNS trigger 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NEW.member_number IS NULL THEN
        NEW.member_number := public.generate_member_number();
    END IF;
    RETURN NEW;
END;
$$;
CREATE OR REPLACE FUNCTION public.tr_lock_member_number()
RETURNS trigger 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF OLD.member_number IS NOT NULL AND NEW.member_number != OLD.member_number THEN
        RAISE EXCEPTION 'Member number is immutable and cannot be changed.';
    END IF;
    RETURN NEW;
END;
$$;
COMMENT ON TABLE public.members IS 'Archival member directory. Identity core for the Meridian Society.';
COMMENT ON COLUMN public.members.email IS 'Case-insensitive primary contact email.';

-- 4. SITE STATISTICS
---------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_stats (
    id TEXT PRIMARY KEY,
    member_count INTEGER DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT now()
);

-- 5. REGISTRY FUNCTIONS
---------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_member_count_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.site_stats SET member_count = member_count + 1, last_updated = now() WHERE id = 'meridian_global_stats';
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.site_stats SET member_count = member_count - 1, last_updated = now() WHERE id = 'meridian_global_stats';
    END IF;
    RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_member_join_date()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.created_at = COALESCE(NEW.created_at, now());
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.resolve_member_identity(p_name text, p_email text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_member_id UUID;
BEGIN
    INSERT INTO members (full_name, email, is_verified)
    VALUES (p_name, p_email, false)
    ON CONFLICT (email) DO UPDATE 
    SET full_name = CASE WHEN members.is_verified THEN members.full_name ELSE EXCLUDED.full_name END
    RETURNING id INTO v_member_id;

    RETURN v_member_id;
END;
$$;

-- REVOKE PUBLIC EXECUTE (Sovereign Lockdown)
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM anon;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- 6. REGISTRY TRIGGERS
---------------------------------------------
DROP TRIGGER IF EXISTS on_member_change ON public.members;
CREATE TRIGGER on_member_change
AFTER INSERT OR DELETE ON public.members
FOR EACH ROW EXECUTE FUNCTION public.handle_member_count_change();

DROP TRIGGER IF EXISTS tr_member_join_date ON public.members;
CREATE TRIGGER tr_member_join_date
BEFORE INSERT ON public.members
FOR EACH ROW EXECUTE FUNCTION public.handle_member_join_date();

DROP TRIGGER IF EXISTS tr_assign_member_number ON public.members;
CREATE TRIGGER tr_assign_member_number
BEFORE INSERT ON public.members
FOR EACH ROW EXECUTE FUNCTION public.tr_assign_member_number();

DROP TRIGGER IF EXISTS tr_lock_member_number ON public.members;
CREATE TRIGGER tr_lock_member_number
BEFORE UPDATE ON public.members
FOR EACH ROW EXECUTE FUNCTION public.tr_lock_member_number();

-- 7. FOUNDATION SECURITY POLICIES
---------------------------------------------
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Members: Admin Access (Magnus)
DROP POLICY IF EXISTS "Admin full access" ON public.members;
CREATE POLICY "Admin full access" ON public.members
    FOR ALL
    TO authenticated
    USING ((SELECT auth.jwt() ->> 'email') = 'magnus.abdelnour@gmail.com')
    WITH CHECK ((SELECT auth.jwt() ->> 'email') = 'magnus.abdelnour@gmail.com');

-- Members: Self-Read
DROP POLICY IF EXISTS "Members read self" ON public.members;
CREATE POLICY "Members read self" ON public.members
    FOR SELECT
    TO authenticated
    USING ((SELECT auth.jwt() ->> 'email') = email);

-- Members: Private by default
DROP POLICY IF EXISTS "Members are strictly private" ON public.members;
CREATE POLICY "Members are strictly private" ON public.members
    FOR ALL TO anon USING (false);

-- Stats: Public Read
DROP POLICY IF EXISTS "Public Read Stats" ON public.site_stats;
CREATE POLICY "Public Read Stats" ON public.site_stats
    FOR SELECT TO public USING (true);
