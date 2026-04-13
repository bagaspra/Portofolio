-- Hero
CREATE TABLE IF NOT EXISTS hero (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT DEFAULT 'Bagas Prasetyo',
  tagline     TEXT DEFAULT 'Full-Stack Developer & AI Engineer',
  role1       TEXT DEFAULT 'Full-Stack Developer',
  role2       TEXT DEFAULT 'AI Engineer',
  description TEXT DEFAULT 'Specializing in Web Development, Machine Learning, and AI-powered apps backed by 3+ years of experience.',
  photo_url   TEXT DEFAULT '',
  cv_url      TEXT DEFAULT '',
  email       TEXT DEFAULT 'bagasprasetyo36@gmail.com',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT NOT NULL,
  description     TEXT DEFAULT '',
  category        TEXT CHECK (category IN ('web','ai','combo')) DEFAULT 'web',
  github_url      TEXT DEFAULT '',
  demo_url        TEXT DEFAULT '',
  thumbnail_emoji TEXT DEFAULT '🌐',
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Skill Groups
CREATE TABLE IF NOT EXISTS skill_groups (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  icon       TEXT DEFAULT '⚡',
  sort_order INTEGER DEFAULT 0
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id   UUID REFERENCES skill_groups(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Experience
CREATE TABLE IF NOT EXISTS experience (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT NOT NULL,
  subtitle   TEXT DEFAULT '',
  date_range TEXT DEFAULT '',
  type       TEXT CHECK (type IN ('work','education')) DEFAULT 'work',
  sort_order INTEGER DEFAULT 0
);

-- Contact Links
CREATE TABLE IF NOT EXISTS contact_links (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform   TEXT NOT NULL,
  handle     TEXT DEFAULT '',
  url        TEXT DEFAULT '#',
  icon       TEXT DEFAULT 'in',
  sort_order INTEGER DEFAULT 0
);

-- Seed Data

INSERT INTO hero (name, tagline, role1, role2, description, email) VALUES (
  'Bagas Prasetyo',
  'Full-Stack Developer & AI Engineer',
  'Full-Stack Developer',
  'AI Engineer',
  'Specializing in Web Development, Machine Learning, and AI-powered apps backed by 3+ years of experience.',
  'bagasprasetyo36@gmail.com'
);

INSERT INTO projects (name, description, category, thumbnail_emoji, sort_order) VALUES
  ('E-Commerce Dashboard', 'Admin panel dengan React & Node.js', 'web', '🌐', 1),
  ('Sentiment Analysis', 'NLP model untuk analisis ulasan produk', 'ai', '🤖', 2),
  ('AI Chat App', 'Aplikasi chat berbasis LLM + Next.js', 'combo', '✨', 3);

DO $$
DECLARE fe UUID; be UUID; ai UUID;
BEGIN
  INSERT INTO skill_groups (name, icon, sort_order) VALUES ('Frontend','🖥',1) RETURNING id INTO fe;
  INSERT INTO skill_groups (name, icon, sort_order) VALUES ('Backend','⚙️',2) RETURNING id INTO be;
  INSERT INTO skill_groups (name, icon, sort_order) VALUES ('AI / ML','🧠',3) RETURNING id INTO ai;
  INSERT INTO skills (group_id, name, sort_order) VALUES
    (fe,'React',1),(fe,'Next.js',2),(fe,'TypeScript',3),(fe,'Tailwind',4);
  INSERT INTO skills (group_id, name, sort_order) VALUES
    (be,'Node.js',1),(be,'Python',2),(be,'FastAPI',3),(be,'PostgreSQL',4);
  INSERT INTO skills (group_id, name, sort_order) VALUES
    (ai,'PyTorch',1),(ai,'Scikit-learn',2),(ai,'LangChain',3),(ai,'HuggingFace',4);
END $$;

INSERT INTO experience (title, subtitle, date_range, type, sort_order) VALUES
  ('Full-Stack Developer — Company Name','Membangun aplikasi web skala besar','2023 – Sekarang','work',1),
  ('ML Engineer Intern — Company Name','Pengembangan model prediktif & pipeline data','2022 – 2023','work',2),
  ('S1 Ilmu Komputer — Universitas','Fokus pada rekayasa perangkat lunak & kecerdasan buatan','2018 – 2022','education',3);

INSERT INTO contact_links (platform, handle, url, icon, sort_order) VALUES
  ('LinkedIn','linkedin.com/in/bagas','#','in',1),
  ('GitHub','github.com/bagas','#','gh',2),
  ('Twitter / X','@bagasprasetyo','#','tw',3),
  ('Email','bagasprasetyo36@gmail.com','mailto:bagasprasetyo36@gmail.com','em',4);

-- Row Level Security
ALTER TABLE hero          ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects      ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_groups  ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills        ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience    ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read" ON hero          FOR SELECT USING (true);
CREATE POLICY "public read" ON projects      FOR SELECT USING (true);
CREATE POLICY "public read" ON skill_groups  FOR SELECT USING (true);
CREATE POLICY "public read" ON skills        FOR SELECT USING (true);
CREATE POLICY "public read" ON experience    FOR SELECT USING (true);
CREATE POLICY "public read" ON contact_links FOR SELECT USING (true);
