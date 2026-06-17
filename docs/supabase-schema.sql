-- ==========================================================
-- ISS Industrial Solutions — Supabase SQL Schema
-- Core Database Schema, Security Roles, and RLS Policies
-- ==========================================================

-- Enable extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------
-- 1. ENUMS & TYPES
-- ----------------------------------------------------------
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'content_manager',
  'product_manager',
  'academy_manager',
  'marketing_manager'
);

CREATE TYPE content_status AS ENUM (
  'draft',
  'active'
);

-- ----------------------------------------------------------
-- 2. CORE USERS & PROFILES
-- ----------------------------------------------------------
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'content_manager' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------
-- 3. MEDIA LIBRARY
-- ----------------------------------------------------------
CREATE TABLE media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Storage bucket path
  file_type TEXT NOT NULL, -- mime-type
  file_size INT NOT NULL,  -- size in bytes
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------
-- 4. PRODUCTS & CATEGORIES
-- ----------------------------------------------------------
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_de TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_de TEXT,
  description_en TEXT,
  icon TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  name_de TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_de TEXT,
  description_en TEXT,
  status content_status DEFAULT 'draft' NOT NULL,
  is_featured BOOLEAN DEFAULT false NOT NULL,
  display_order INT DEFAULT 0,
  
  -- SEO Fields
  meta_title TEXT,
  meta_description TEXT,
  seo_slug TEXT,
  canonical_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Product Specifications (Specs Table)
CREATE TABLE product_specs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  spec_key TEXT NOT NULL, -- e.g., 'mix_ratio', 'coverage'
  spec_value_de TEXT NOT NULL,
  spec_value_en TEXT NOT NULL,
  display_order INT DEFAULT 0
);

-- Product Dynamic Images (Multiple Images)
CREATE TABLE product_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  media_id UUID REFERENCES media(id) ON DELETE CASCADE NOT NULL,
  is_primary BOOLEAN DEFAULT false NOT NULL,
  display_order INT DEFAULT 0
);

-- Product Downloads (PDFs & Technical Sheets)
CREATE TABLE product_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  media_id UUID REFERENCES media(id) ON DELETE CASCADE NOT NULL,
  title_de TEXT NOT NULL,
  title_en TEXT NOT NULL,
  file_type TEXT DEFAULT 'pdf' NOT NULL, -- technical_sheet, safety_datasheet, brochures
  display_order INT DEFAULT 0
);

-- Product Related Products (Self-referencing mapping)
CREATE TABLE product_related (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  related_product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, related_product_id),
  CONSTRAINT self_rel_check CHECK (product_id <> related_product_id)
);

-- ----------------------------------------------------------
-- 5. ACADEMY (COURSES & INSTRUCTORS)
-- ----------------------------------------------------------
CREATE TABLE instructors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  bio_de TEXT,
  bio_en TEXT,
  profile_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category_id TEXT NOT NULL, -- e.g. 'epoxy-science', 'microcement-science'
  name_de TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_de TEXT,
  description_en TEXT,
  duration TEXT,
  level TEXT, -- beginner, intermediate, advanced
  is_free BOOLEAN DEFAULT true NOT NULL,
  course_price NUMERIC(10,2) DEFAULT 0.00 NOT NULL,
  enrollment_limit INT, -- null means unlimited
  certificate_enabled BOOLEAN DEFAULT false NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  instructor_id UUID REFERENCES instructors(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE course_modules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title_de TEXT NOT NULL,
  title_en TEXT NOT NULL,
  lessons INT DEFAULT 0 NOT NULL,
  display_order INT DEFAULT 0
);

CREATE TABLE course_outcomes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  outcome_de TEXT NOT NULL,
  outcome_en TEXT NOT NULL,
  display_order INT DEFAULT 0
);

-- ----------------------------------------------------------
-- 6. BLOG & ARTICLES
-- ----------------------------------------------------------
CREATE TABLE articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_de TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_de TEXT NOT NULL,
  content_en TEXT NOT NULL,
  category TEXT NOT NULL, -- 'industry-insights', 'articles', 'technical-publications'
  published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status content_status DEFAULT 'draft' NOT NULL,
  cover_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
  
  -- SEO Fields
  meta_title TEXT,
  meta_description TEXT,
  seo_slug TEXT,
  canonical_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------
-- 7. TESTIMONIALS, CERTIFICATIONS & PARTNERS (MARKETING)
-- ----------------------------------------------------------
CREATE TABLE certifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description_de TEXT,
  description_en TEXT,
  media_id UUID REFERENCES media(id) ON DELETE SET NULL,
  display_order INT DEFAULT 0
);

CREATE TABLE partners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_id UUID REFERENCES media(id) ON DELETE SET NULL,
  display_order INT DEFAULT 0
);

CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company TEXT,
  quote_de TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  avatar_id UUID REFERENCES media(id) ON DELETE SET NULL,
  display_order INT DEFAULT 0
);

-- ----------------------------------------------------------
-- 8. FORMS & LEADS (CONTACT / AGENT FORM)
-- ----------------------------------------------------------
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE agent_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' NOT NULL, -- pending, reviewed, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------
-- 9. TRANSLATIONS & SETTINGS
-- ----------------------------------------------------------
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_related ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------
-- Helpers: User Check Functions
-- ----------------------------------------------------------

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('super_admin', 'content_manager', 'product_manager', 'academy_manager', 'marketing_manager')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ----------------------------------------------------------
-- RLS Policy Definitions
-- ----------------------------------------------------------

-- Profiles: Anyone can view their own profile, only super_admin can view all/modify roles.
CREATE POLICY "Allow users to read own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow super_admin complete access to profiles" ON profiles 
  FOR ALL USING (get_user_role() = 'super_admin');

-- Public tables: Read-only access to general public (where status = active).
CREATE POLICY "Public Read Access for Categories" ON categories FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Active Products" ON products FOR SELECT TO public USING (status = 'active');
CREATE POLICY "Public Read Access for Specs" ON product_specs FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Images" ON product_images FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Files" ON product_files FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Related products" ON product_related FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Instructors" ON instructors FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Active Courses" ON courses FOR SELECT TO public USING (status = 'active');
CREATE POLICY "Public Read Access for Course Modules" ON course_modules FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Course Outcomes" ON course_outcomes FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Active Articles" ON articles FOR SELECT TO public USING (status = 'active');
CREATE POLICY "Public Read Access for Certifications" ON certifications FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Partners" ON partners FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Testimonials" ON testimonials FOR SELECT TO public USING (true);
CREATE POLICY "Public Read Access for Site Settings" ON site_settings FOR SELECT TO public USING (true);

-- Authenticated Admin operations
CREATE POLICY "Admin CRUD Access for Categories" ON categories FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Products" ON products FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Specs" ON product_specs FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Images" ON product_images FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Files" ON product_files FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Related products" ON product_related FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Instructors" ON instructors FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Courses" ON courses FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Course Modules" ON course_modules FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Course Outcomes" ON course_outcomes FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Articles" ON articles FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Certifications" ON certifications FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Partners" ON partners FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Testimonials" ON testimonials FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Site Settings" ON site_settings FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Admin CRUD Access for Media Library" ON media FOR ALL TO authenticated USING (is_admin());

-- Form Submissions policies (Public write access, Admin read/write)
CREATE POLICY "Public submission for Contact messages" ON contact_messages FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin CRUD Access for Contact messages" ON contact_messages FOR ALL TO authenticated USING (is_admin());

CREATE POLICY "Public submission for Agent Applications" ON agent_applications FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin CRUD Access for Agent Applications" ON agent_applications FOR ALL TO authenticated USING (is_admin());

-- ----------------------------------------------------------
-- STORAGE POLICIES (Supabase Storage Buckets)
-- ----------------------------------------------------------
-- Assume buckets are 'media' and 'documents'
-- Public read access, Admin write/delete access.

-- To be executed in storage schema if configured via Supabase UI:
-- CREATE POLICY "Public Storage Read Access" ON storage.objects FOR SELECT TO public USING (bucket_id IN ('media', 'documents'));
-- CREATE POLICY "Admin Storage Insert Access" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('media', 'documents') AND is_admin());
-- CREATE POLICY "Admin Storage Delete Access" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('media', 'documents') AND is_admin());
