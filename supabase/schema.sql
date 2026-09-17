-- ===================================================
-- JYC Technical Club - Doubts & Q&A Supabase Schema
-- ===================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Doubts Table
CREATE TABLE IF NOT EXISTS public.doubts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    author_name TEXT NOT NULL DEFAULT 'Anonymous Student',
    category TEXT NOT NULL DEFAULT 'General',
    upvotes INTEGER NOT NULL DEFAULT 0,
    answers_count INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'open', -- 'open', 'resolved'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create Answers Table
CREATE TABLE IF NOT EXISTS public.answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doubt_id UUID NOT NULL REFERENCES public.doubts(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL DEFAULT 'Club Mentor',
    author_role TEXT NOT NULL DEFAULT 'Technical Member',
    content TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    upvotes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Indexes for High Performance Queries
CREATE INDEX IF NOT EXISTS idx_doubts_category ON public.doubts(category);
CREATE INDEX IF NOT EXISTS idx_doubts_created_at ON public.doubts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_answers_doubt_id ON public.answers(doubt_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Doubts
CREATE POLICY "Allow public read access on doubts"
    ON public.doubts FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert on doubts"
    ON public.doubts FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public update on doubts (for upvotes and answer count)"
    ON public.doubts FOR UPDATE
    USING (true);

-- 6. RLS Policies for Answers
CREATE POLICY "Allow public read access on answers"
    ON public.answers FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert on answers"
    ON public.answers FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public update on answers (for upvotes)"
    ON public.answers FOR UPDATE
    USING (true);

-- 7. Trigger to automatically increment answers_count in doubts when an answer is posted
CREATE OR REPLACE FUNCTION public.increment_doubt_answers_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.doubts
    SET answers_count = answers_count + 1
    WHERE id = NEW.doubt_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_increment_answers_count
AFTER INSERT ON public.answers
FOR EACH ROW
EXECUTE FUNCTION public.increment_doubt_answers_count();
