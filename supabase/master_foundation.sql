-- ==========================================
-- MERIDIAN PROJECT: MASTER FOUNDATION
-- ==========================================
-- Site Scope: Meridian Website / Core Registry
-- ==========================================

-- 0. ADMINISTRATIVE ENVIRONMENT SETUP
-- Run these commands in your SQL Editor to initialize the sovereign locks.
-----------------------------------------------------------------------------
-- ALTER DATABASE postgres SET "app.settings.porter_secret" = '5025';
-- ALTER DATABASE postgres SET "app.settings.member_secret" = '5025';

-- 1. EXTENSIONS
---------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. CORE MEMBER REGISTRY
---------------------------------------------
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    is_verified BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- 3. FOUNDATION SECURITY POLICIES
---------------------------------------------
DROP POLICY IF EXISTS "Members are private" ON public.members;
CREATE POLICY "Members are private" ON public.members
    FOR ALL USING (false);

-- 4. UTILITIES
---------------------------------------------
-- Ensure search path is safe
ALTER DATABASE postgres SET search_path TO public, extensions;
