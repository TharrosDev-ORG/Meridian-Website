-- 🛡️ SECURITY AUDIT: RPC LOCKDOWN (2026-04-17)
-- Purpose: Close the default PostgreSQL behavior where PUBLIC/anon can execute functions.
-- Impact: Restricts sensitive administrative and system functions to 'service_role' and 'postgres' only.

-- 1. REVOKE DEFAULT PRIVILEGES
-- By default, PUBLIC is granted EXECUTE on all functions in the public schema.
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;

-- 2. RE-GRANT TO INTERNAL ROLES
-- Only 'service_role' (used by our Server Actions) and internal roles should execute functions.
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- 3. SPECIFIC EXEMPTIONS (If any)
-- If we ever need a public function (e.g., for some non-sensitive data), we would grant it here.
-- Currently, all sensitive logic is handled via Server Actions using the service client.

-- 4. HARDEN SENSITIVE FUNCTIONS SPECIFICALLY
-- Extra layer of protection for OS-critical functions
ALTER FUNCTION public.verify_master_signature(text) OWNER TO postgres;
ALTER FUNCTION public.set_master_signature(text) OWNER TO postgres;

-- 5. AUDIT COMMENT
COMMENT ON FUNCTION public.set_master_signature(text) IS 'CRITICAL: High-privilege mutation. Restricted to service_role only.';
