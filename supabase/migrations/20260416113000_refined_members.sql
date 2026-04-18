-- REFINED MEMBERS SCHEMA
-- Implements ENUMs for dropdowns and formatted join dates for the dashboard

-- 1. CREATE ENUM TYPES (Schema-qualified for safety)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'member_role') THEN
        CREATE TYPE public.member_role AS ENUM ('Student', 'Alumni', 'Professor / Faculty', 'Professional', 'Other');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'institution_name') THEN
        CREATE TYPE public.institution_name AS ENUM ('Carleton University', 'University of Ottawa', 'Algonquin College', 'Other');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'referral_source') THEN
        CREATE TYPE public.referral_source AS ENUM ('Friend or Peer', 'Professor', 'Social Media', 'Campus Event', 'Current Member');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'volunteer_level') THEN
        CREATE TYPE public.volunteer_level AS ENUM ('Yes', 'Maybe', 'Not at this time');
    END IF;
END $$;

-- 2. ALTER TABLE TO USE ENUMS
-- We use USING clause to cast existing text to the new enums.
-- This ensures existing data is preserved and strictly validated.
ALTER TABLE public.members 
    ALTER COLUMN role TYPE public.member_role USING (role::public.member_role),
    ALTER COLUMN institution TYPE public.institution_name USING (institution::public.institution_name),
    ALTER COLUMN heard_from TYPE public.referral_source USING (heard_from::public.referral_source),
    ALTER COLUMN volunteer_interest TYPE public.volunteer_level USING (volunteer_interest::public.volunteer_level);

-- 3. ADD FORMATTED JOIN DATE (Generated Column)
-- Format: MM/DD/YYYY. We use AT TIME ZONE 'UTC' to ensure immutability for the generated column.
ALTER TABLE public.members 
    DROP COLUMN IF EXISTS join_date_readable;

ALTER TABLE public.members 
    ADD COLUMN join_date_readable TEXT 
    GENERATED ALWAYS AS (to_char(created_at AT TIME ZONE 'UTC', 'MM/DD/YYYY')) STORED;

-- 4. ADD COLUMN COMMENTS FOR DASHBOARD TOOLTIPS
-- These tooltip annotations provide instant context within the Supabase Table Editor.
COMMENT ON COLUMN public.members.full_name IS 'Registrant full legal or preferred name';
COMMENT ON COLUMN public.members.email IS 'Primary contact email (normalized to lowercase)';
COMMENT ON COLUMN public.members.role IS 'Current professional or academic standing (Dropdown)';
COMMENT ON COLUMN public.members.institution IS 'Associated academic institution (Dropdown)';
COMMENT ON COLUMN public.members.interests IS 'Selected topics of interest (Array)';
COMMENT ON COLUMN public.members.heard_from IS 'How the member discovered the Meridian Society (Dropdown)';
COMMENT ON COLUMN public.members.volunteer_interest IS 'Level of interest in supporting future events (Dropdown)';
COMMENT ON COLUMN public.members.join_date_readable IS 'Pre-formatted registration date (MM/DD/YYYY) for quick scanning';
COMMENT ON COLUMN public.members.created_at IS 'Precise timestamp of registration';
