-- INITIAL SCHEMA FOR MERIDIAN WEBSITE (Corrected for existing Site_stats)
-- Handles member registration and live site statistics

-- 1. MEMBERS TABLE (Ensuring lowercase name as found in remote)
CREATE TABLE IF NOT EXISTS public.members (
    id UUID DEFAULT gen_random_uuid() UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT PRIMARY KEY,
    role TEXT,
    role_other TEXT,
    institution TEXT,
    institution_other TEXT,
    interests TEXT[] DEFAULT '{}',
    heard_from TEXT,
    volunteer_interest TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for email searching
CREATE INDEX IF NOT EXISTS idx_members_email ON public.members (email);

-- 2. SITE STATS TABLE (Matching existing 'site_stats')
CREATE TABLE IF NOT EXISTS public.site_stats (
    id TEXT PRIMARY KEY,
    member_count INTEGER DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT now()
);

-- Initialize/Sync the member_count
INSERT INTO public.site_stats (id, member_count, last_updated)
VALUES ('meridian_global_stats', (SELECT count(*) FROM public.members), now())
ON CONFLICT (id) DO UPDATE 
SET member_count = (SELECT count(*) FROM public.members), 
    last_updated = now();

-- 3. TRIGGER FOR LIVE MEMBER COUNT
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

-- Create the trigger
DROP TRIGGER IF EXISTS on_member_change ON public.members;
CREATE TRIGGER on_member_change
AFTER INSERT OR DELETE ON public.members
FOR EACH ROW
EXECUTE FUNCTION public.handle_member_count_change();

-- 4. SECURITY (RLS)
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Policies for members
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.members;
CREATE POLICY "Allow anonymous inserts" ON public.members
FOR INSERT WITH CHECK (
    email IS NOT NULL AND 
    full_name IS NOT NULL AND
    char_length(email) > 5 AND
    char_length(full_name) > 2
);

DROP POLICY IF EXISTS "Admins can manage members" ON public.members;
CREATE POLICY "Admins can manage members" ON public.members
FOR ALL USING (auth.role() = 'authenticated');

-- Policies for site_stats
DROP POLICY IF EXISTS "Public can view stats" ON public.site_stats;
CREATE POLICY "Public can view stats" ON public.site_stats
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can edit stats" ON public.site_stats;
CREATE POLICY "Admins can edit stats" ON public.site_stats
FOR UPDATE USING (auth.role() = 'authenticated');
