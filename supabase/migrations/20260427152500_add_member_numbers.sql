-- MIGRATION: Add Unique Member Numbers
-- Created at: 2026-04-27

-- 1. Create Sequence
CREATE SEQUENCE IF NOT EXISTS public.member_number_seq START 1001;

-- 2. Add Column
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS member_number TEXT UNIQUE;

-- 3. Create Generation Function
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

-- 4. Create Trigger Function
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

-- 5. Attach Trigger
DROP TRIGGER IF EXISTS tr_assign_member_number ON public.members;
CREATE TRIGGER tr_assign_member_number
BEFORE INSERT ON public.members
FOR EACH ROW EXECUTE FUNCTION public.tr_assign_member_number();

-- 6. Backfill existing members (Optional, but recommended)
UPDATE public.members 
SET member_number = public.generate_member_number() 
WHERE member_number IS NULL;
