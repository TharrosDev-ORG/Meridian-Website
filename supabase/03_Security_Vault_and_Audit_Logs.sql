-- ==========================================
-- MERIDIAN PROJECT: 03 - SECURITY VAULT AND AUDIT LOGS
-- ==========================================
-- Site Scope: Meridian Website / Security & Audit
-- ==========================================

-- 1. EXTENSIONS
---------------------------------------------
CREATE EXTENSION IF NOT EXISTS moddatetime WITH SCHEMA extensions;

-- 2. AUDIT & MONITORING TABLES
---------------------------------------------

CREATE TABLE IF NOT EXISTS public.security_intercepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    intercept_type TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    payload JSONB,
    details TEXT
);

COMMENT ON TABLE public.security_intercepts IS 'Logs for honeypot (fax_number) hits and suspicious registration activity.';

-- 3. SYSTEM CONFIGURATION
---------------------------------------------
CREATE TABLE IF NOT EXISTS public.archival_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.archival_settings IS 'High-security system settings. Restricted access.';

CREATE TABLE IF NOT EXISTS public.system_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. AUDIT & VAULT FUNCTIONS
---------------------------------------------

CREATE OR REPLACE FUNCTION public.initialize_archival_vault(p_secret text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO archival_settings (key, value)
    VALUES ('porter_secret', p_secret)
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
    RETURN 'Sovereign Vault Initialized successfully.';
END;
$$;

CREATE OR REPLACE FUNCTION public.get_archival_setting(p_key text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN (SELECT value FROM archival_settings WHERE key = p_key);
END;
$$;

-- REVOKE PUBLIC EXECUTE (Sovereign Lockdown)
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM anon;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- 5. AUTOMATION TRIGGERS
---------------------------------------------
DROP TRIGGER IF EXISTS handle_updated_at_system_config ON public.system_config;
CREATE TRIGGER handle_updated_at_system_config
BEFORE UPDATE ON public.system_config
FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime(updated_at);

DROP TRIGGER IF EXISTS handle_updated_at_archival_settings ON public.archival_settings;
CREATE TRIGGER handle_updated_at_archival_settings
BEFORE UPDATE ON public.archival_settings
FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime(updated_at);

-- 6. AUDIT SECURITY POLICIES
---------------------------------------------
ALTER TABLE public.security_intercepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archival_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- Strictly Private for all public roles

DROP POLICY IF EXISTS "Intercepts are strictly private" ON public.security_intercepts;
CREATE POLICY "Intercepts are strictly private" ON public.security_intercepts FOR ALL TO public USING (false);

DROP POLICY IF EXISTS "Vault is strictly private" ON public.archival_settings;
CREATE POLICY "Vault is strictly private" ON public.archival_settings FOR ALL TO public USING (false);

DROP POLICY IF EXISTS "System config is private" ON public.system_config;
CREATE POLICY "System config is private" ON public.system_config FOR ALL TO public USING (false);
