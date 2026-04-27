-- ==========================================
-- MERIDIAN PROJECT: 02 - MERIDIAN EVENT OS ENGINE
-- ==========================================
-- Site Scope: Meridian Website / Event Orchestration
-- ==========================================

-- 1. EVENT TABLES
---------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    location TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'cancelled')),
    is_members_only BOOLEAN DEFAULT false,
    rsvp_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    event_id UUID NOT NULL REFERENCES public.events(id),
    member_id UUID REFERENCES public.members(id),
    member_name TEXT NOT NULL,
    email extensions.citext NOT NULL,
    attended BOOLEAN DEFAULT false,
    qr_code_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex')
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON public.event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_member_id ON public.event_registrations(member_id);

-- 2. EVENT FUNCTIONS
---------------------------------------------
CREATE OR REPLACE FUNCTION public.secure_create_event(
    p_name text, 
    p_date timestamp with time zone, 
    p_location text, 
    p_capacity integer, 
    p_description text, 
    p_is_members_only boolean, 
    p_admin_secret text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_event_id UUID;
    v_true_secret TEXT;
BEGIN
    v_true_secret := (SELECT value FROM archival_settings WHERE key = 'porter_secret');
    IF v_true_secret IS NULL OR p_admin_secret != v_true_secret THEN
        RETURN jsonb_build_object('success', false, 'message', 'Unauthorized: Invalid Porter Key');
    END IF;

    INSERT INTO events (name, date, location, capacity, description, is_members_only, status)
    VALUES (p_name, p_date, p_location, p_capacity, p_description, COALESCE(p_is_members_only, false), 'active')
    RETURNING id INTO v_event_id;

    RETURN jsonb_build_object('success', true, 'message', 'Event established in archives.', 'event_id', v_event_id);
END;
$$;

CREATE OR REPLACE FUNCTION public.secure_register_for_event(p_event_id uuid, p_member_name text, p_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_is_members_only BOOLEAN;
    v_is_verified_member BOOLEAN;
    v_member_id UUID;
    v_reg_id UUID;
    v_token TEXT;
BEGIN
    SELECT is_members_only INTO v_is_members_only FROM events WHERE id = p_event_id;
    v_member_id := (SELECT public.resolve_member_identity(p_member_name, p_email));
    v_is_verified_member := (SELECT is_verified FROM members WHERE id = v_member_id);

    IF v_is_members_only AND NOT v_is_verified_member THEN
        RETURN jsonb_build_object('success', false, 'message', 'Reserved for Society members. Please register through MemberOS.');
    END IF;

    INSERT INTO event_registrations (event_id, member_id, member_name, email)
    VALUES (p_event_id, v_member_id, p_member_name, p_email)
    RETURNING id, qr_code_token INTO v_reg_id, v_token;

    RETURN jsonb_build_object('success', true, 'message', 'Entry successfully recorded.', 'data', jsonb_build_object('id', v_reg_id, 'token', v_token));
END;
$$;

CREATE OR REPLACE FUNCTION public.update_event_rsvp_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.events SET rsvp_count = rsvp_count + 1 WHERE id = NEW.event_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.events SET rsvp_count = rsvp_count - 1 WHERE id = OLD.event_id;
    END IF;
    RETURN NULL;
END;
$$;

-- REVOKE PUBLIC EXECUTE (Sovereign Lockdown)
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM anon;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- 3. EVENT TRIGGERS
---------------------------------------------
DROP TRIGGER IF EXISTS tr_sync_rsvp_count_insert ON public.event_registrations;
CREATE TRIGGER tr_sync_rsvp_count_insert
AFTER INSERT ON public.event_registrations
FOR EACH ROW EXECUTE FUNCTION public.update_event_rsvp_count();

DROP TRIGGER IF EXISTS tr_sync_rsvp_count_delete ON public.event_registrations;
CREATE TRIGGER tr_sync_rsvp_count_delete
AFTER DELETE ON public.event_registrations
FOR EACH ROW EXECUTE FUNCTION public.update_event_rsvp_count();

-- 4. EVENT SECURITY POLICIES
---------------------------------------------
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Events: Public Read
DROP POLICY IF EXISTS "Public Events are viewable" ON public.events;
CREATE POLICY "Public Events are viewable" ON public.events
    FOR SELECT TO public USING (true);

-- Events: Insert Restricted (Via RPC Only)
DROP POLICY IF EXISTS "Only RPC can insert events" ON public.events;
CREATE POLICY "Only RPC can insert events" ON public.events
    FOR INSERT TO public WITH CHECK (false);

-- Registrations: Strictly Private
DROP POLICY IF EXISTS "Registrations are strictly private" ON public.event_registrations;
CREATE POLICY "Registrations are strictly private" ON public.event_registrations
    FOR ALL TO public USING (false);
