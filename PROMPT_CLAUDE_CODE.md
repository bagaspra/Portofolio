# Prompt untuk Claude Code — Portfolio Bagas Prasetyo

> **Cara pakai:** Copy seluruh isi prompt ini, paste ke Claude Code, lalu jalankan.
> Pastikan file `portfolio_bagas_grid_bg.html` ada di root folder project kamu
> sebelum menjalankan perintah ini.

---

## 🎯 Misi Utama

Bangun **website portofolio pribadi** milik Bagas Prasetyo yang terdiri dari:
1. **Halaman publik** — portfolio yang bisa diakses siapa saja
2. **Admin panel** — halaman khusus pemilik untuk mengelola semua konten secara dinamis (CRUD)
3. **Sistem autentikasi** — login sederhana username & password untuk admin

Semua konten portofolio (projects, skills, experience, contact) disimpan di **Supabase** sehingga bisa diubah kapan saja melalui admin panel tanpa perlu edit kode.

---

## 🎨 Referensi Desain

File `portfolio_bagas_grid_bg.html` di root project adalah **mockup desain final** yang harus dijadikan referensi utama. Baca dan analisa file HTML tersebut terlebih dahulu sebelum mulai coding untuk memahami:

- Layout keseluruhan dan struktur section
- Warna, tipografi, dan spacing yang digunakan
- Komponen-komponen spesifik (floating nav, hero inline badges, marquee, project cards, timeline, contact cards)
- Animasi dan efek visual yang ada

**Terapkan desain tersebut seakurat mungkin** pada implementasi Next.js. Jika ada detail desain yang tidak tertulis di prompt ini, **selalu prioritaskan apa yang ada di file HTML tersebut.**

---

## ⚙️ Tech Stack (Semua Versi Terbaru)

```json
{
  "next": "latest",
  "react": "latest",
  "react-dom": "latest",
  "typescript": "latest",
  "tailwindcss": "latest",
  "@tailwindcss/postcss": "latest",
  "@supabase/supabase-js": "latest",
  "next-auth": "latest",
  "motion": "latest"
}
```

**Catatan penting:**
- Gunakan **Next.js 15** dengan **App Router** (bukan Pages Router)
- Gunakan **React 19**
- Gunakan **Tailwind CSS v4** — konfigurasi via CSS (`@import "tailwindcss"`) bukan via `tailwind.config.ts`
- Gunakan **Auth.js v5** (next-auth@5) — bukan v4. Pola baru dengan `auth.ts` di root dan `handlers`
- Gunakan **Motion** (Framer Motion terbaru) untuk animasi
- Gunakan **TypeScript** untuk semua file

---

## 📁 Struktur Project

```
portfolio-bagas/
├── auth.ts                          # Auth.js v5 config
├── middleware.ts                    # Proteksi route /admin/*
├── next.config.ts
├── postcss.config.mjs
├── .env.local                       # (buat dari .env.example)
├── .env.example
│
├── lib/
│   └── supabase.ts                  # Supabase client (public + admin)
│
├── types/
│   └── index.ts                     # Semua TypeScript interfaces
│
├── supabase/
│   └── schema.sql                   # SQL untuk dijalankan di Supabase
│
├── app/
│   ├── globals.css                  # Tailwind v4 + animasi CSS
│   ├── layout.tsx                   # Root layout + SessionProvider
│   ├── page.tsx                     # Portofolio publik (server component)
│   │
│   ├── login/
│   │   └── page.tsx                 # Login admin
│   │
│   ├── admin/
│   │   ├── layout.tsx               # Admin layout (sidebar)
│   │   ├── page.tsx                 # Dashboard
│   │   ├── hero/page.tsx            # Editor hero section
│   │   ├── projects/page.tsx        # CRUD projects
│   │   ├── skills/page.tsx          # CRUD skill groups & items
│   │   ├── experience/page.tsx      # CRUD experience & education
│   │   └── contact/page.tsx         # CRUD contact links
│   │
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── hero/route.ts
│       ├── projects/route.ts
│       ├── projects/[id]/route.ts
│       ├── skills/route.ts
│       ├── skills/[id]/route.ts
│       ├── skills/groups/route.ts
│       ├── skills/groups/[id]/route.ts
│       ├── experience/route.ts
│       ├── experience/[id]/route.ts
│       ├── contact/route.ts
│       └── contact/[id]/route.ts
```

---

## 🗄️ Database Schema (Supabase)

Buat file `supabase/schema.sql` dengan isi berikut dan instruksikan user untuk menjalankannya di Supabase SQL Editor:

```sql
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

-- ── Seed Data ─────────────────────────────────────────────

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

-- ── Row Level Security ────────────────────────────────────
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
```

---

## 🔐 Autentikasi (Auth.js v5)

Gunakan pola **Auth.js v5** (bukan NextAuth v4). Perbedaan utama:

```typescript
// auth.ts (di root project — BUKAN di app/)
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin" }
        }
        return null
      },
    }),
  ],
  pages: { signIn: "/login" },
})
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

```typescript
// middleware.ts
import { auth } from "@/auth"
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/login", req.url))
  }
})
export const config = { matcher: ["/admin/:path*"] }
```

---

## 🌐 TypeScript Types

```typescript
// types/index.ts
export interface HeroData {
  id: string
  name: string
  tagline: string
  role1: string
  role2: string
  description: string
  photo_url: string
  cv_url: string
  email: string
}

export interface Project {
  id: string
  name: string
  description: string
  category: 'web' | 'ai' | 'combo'
  github_url: string
  demo_url: string
  thumbnail_emoji: string
  sort_order: number
}

export interface SkillGroup {
  id: string
  name: string
  icon: string
  sort_order: number
  skills?: Skill[]
}

export interface Skill {
  id: string
  group_id: string
  name: string
  sort_order: number
}

export interface Experience {
  id: string
  title: string
  subtitle: string
  date_range: string
  type: 'work' | 'education'
  sort_order: number
}

export interface ContactLink {
  id: string
  platform: string
  handle: string
  url: string
  icon: string
  sort_order: number
}
```

---

## 📄 Environment Variables

Buat `.env.example`:

```env
# Supabase — dari Settings > API di dashboard Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Auth.js v5
AUTH_SECRET=random_string_minimal_32_karakter   # openssl rand -base64 32

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password_aman_kamu

# Untuk production di Vercel:
# AUTH_URL=https://bagasprasetyo.vercel.app
```

---

## 📋 Spesifikasi Halaman Publik (`/`)

Halaman publik adalah **Server Component** yang fetch data dari Supabase saat render. Gunakan `export const revalidate = 60` agar di-cache 60 detik.

### Komponen yang Harus Ada

**1. Floating Navigation**
- Posisi: `sticky top-4`, centered, z-index tinggi
- Background: `#1C1C1E` (gelap), bentuk `rounded-full` (pill)
- Link: Home, Projects, Skills, Experience, Contact (anchor scroll)
- Tombol language toggle: `ID / EN` (state management di client)
- Tombol Resume: link ke `hero.cv_url`
- Tambahkan animasi masuk (fade + slide down) saat halaman load

**2. Hero Section**
- Centered layout, max-width 640px
- Baris 1: `Hello, I'm **{hero.name}**` + avatar inline (foto bulat kecil, atau inisial jika belum ada foto)
- Baris 2: `{hero.role1} &` + role2 dalam dark pill badge dengan dot biru
- Baris 3: `Building intelligent` + `Web Applications` pill badge putih dengan dot hijau
- Deskripsi: paragraf dengan keyword badges inline (Web Development, Machine Learning, AI-powered apps, 3+ years)
- 2 CTA button: "👀 View Projects" (dark, anchor ke #projects) + "📋 Copy Email" (light, copy `hero.email` ke clipboard)
- Animasi: staggered fade-in untuk setiap baris

**3. Marquee (Scrolling Skills)**
- Full width, border atas-bawah tipis
- Background semi-transparan putih
- Scroll otomatis tanpa henti ke kiri (CSS animation `marquee`)
- Items: Web Development · Machine Learning · Next.js · Python · AI Integration · REST API · Deep Learning · React · NLP · TypeScript · FastAPI · LangChain
- Duplikat items untuk loop seamless

**4. Projects Section** (`#projects`)
- Label section: uppercase kecil berwarna biru
- Filter tabs: All / Web Dev / AI/ML / Web+AI — **client component** karena perlu state
- Grid: 3 kolom (responsive: 1 kolom mobile, 2 tablet, 3 desktop)
- Project card:
  - Thumbnail area: emoji besar di background warna sesuai kategori
    - web: `bg-gray-50`, ai: `bg-blue-50`, combo: `bg-green-50`
  - Category badge pill berwarna
  - Nama project (medium weight)
  - Deskripsi (small, muted)
  - Link badges: GitHub + Live Demo (hanya tampil jika URL ada)
- Animasi: cards masuk dengan stagger saat scroll ke section

**5. Skills Section** (`#skills`)
- 3 kolom card putih rounded-2xl
- Setiap card: icon + nama grup, lalu skill tags pill
- Animasi masuk saat scroll

**6. Experience & Education** (`#experience`)
- Vertical timeline
- Dot biru di kiri, garis vertikal tipis menghubungkan
- Setiap item: judul (bold), subtitle (muted), tanggal (biru kecil)
- Item terakhir tidak punya garis bawah

**7. Contact Section** (`#contact`)
- Deskripsi singkat
- 2×2 grid social cards (putih, rounded-xl)
- Setiap card: icon kotak rounded, nama platform, handle, arrow ↗
- Tap/click membuka URL di tab baru

**8. Footer**
- `© 2026 Bagas Prasetyo · Built with Next.js · Deployed on Vercel`
- Centered, text kecil muted

---

## 🔧 Admin Panel (`/admin/*`)

Admin panel adalah **Client Components** yang fetch data via API routes. Gunakan `useEffect` + `fetch` untuk operasi CRUD.

### Layout Admin (`/admin/layout.tsx`)

Sidebar gelap kiri (`bg-[#1C1C1E]`, lebar `w-56`) + konten kanan:

**Sidebar items:**
- Header: "Portfolio Admin" + "Bagas Prasetyo" (muted kecil)
- Nav links (highlight active): Dashboard · Hero · Projects · Skills · Experience · Contact
- Footer sidebar: "↗ Lihat Portofolio" (buka `/` di tab baru) + "← Keluar" (sign out Auth.js v5)

### Dashboard (`/admin`)

- Judul + sapaan: "Selamat datang kembali, Bagas 👋"
- 4 stat cards (fetch dari API): jumlah Projects, Skills, Experience, Contacts
- Grid shortcut cards ke setiap halaman admin (icon + judul + deskripsi singkat)

### Hero Editor (`/admin/hero`)

Form single-page untuk edit semua field hero:
- Nama Lengkap
- Tagline
- Role 1 (kiri badge)
- Role 2 (kanan badge / isi badge)
- Deskripsi (textarea)
- Email
- URL Foto Profil (text input URL, dengan preview kecil jika valid)
- URL CV / Resume
- Tombol "Simpan" dengan loading state + feedback "✓ Tersimpan!"
- Auto-fetch data existing saat halaman load

### Projects Manager (`/admin/projects`)

**List view:**
- Header: judul + jumlah + tombol "+ Tambah Project"
- Setiap item: emoji thumbnail + nama + category badge + deskripsi singkat + tombol Edit & Hapus
- Konfirmasi sebelum hapus

**Modal Add/Edit:**
- Field: Nama, Deskripsi (textarea), Kategori (dropdown: Web Dev/AI ML/Web+AI), Emoji Thumbnail, GitHub URL, Live Demo URL, Urutan (sort_order)
- Tombol Simpan (loading state) + Batal

### Skills Manager (`/admin/skills`)

**Layout berbasis group:**
- Tombol "+ Tambah Grup" di header
- Setiap grup tampil sebagai card dengan:
  - Header grup: icon emoji + nama + jumlah skill + tombol "Edit Grup", "Hapus Grup", "+ Tambah Skill"
  - Body: skill tags dengan tombol edit (✏) dan hapus (✕) per skill

**Modal Grup:** nama + icon (emoji)

**Modal Skill:** nama skill

### Experience Manager (`/admin/experience`)

- List dengan color indicator kiri: biru untuk work, hijau untuk education
- Setiap item: judul + subtitle + periode + badge tipe
- Modal: Judul, Deskripsi, Periode, Tipe (dropdown Work/Education), Urutan

### Contact Manager (`/admin/contact`)

- List dengan icon platform
- Setiap item: icon + nama platform + handle + URL (truncated) + Edit/Hapus
- Modal: Nama Platform, Handle/Username, URL, Ikon (dropdown: LinkedIn/GitHub/Twitter-X/Email), Urutan

---

## 🔌 API Routes

Semua API routes di `/app/api/` menggunakan `supabaseAdmin` (service role key, bypass RLS) untuk operasi write. `GET` publik bisa pakai `supabase` (anon key).

**Pattern standar untuk setiap resource:**

```typescript
// GET  /api/[resource]         → list semua, diurutkan sort_order
// POST /api/[resource]         → create baru
// PUT  /api/[resource]/[id]    → update by id
// DELETE /api/[resource]/[id]  → delete by id
```

**Hero** adalah khusus: hanya ada 1 row. `PUT /api/hero` harus update jika sudah ada, insert jika belum.

**Skills** punya dua sub-resource:
- `/api/skills` → GET (mengembalikan groups + skills ter-merge), POST skill item
- `/api/skills/groups` → POST group baru
- `/api/skills/groups/[id]` → PUT, DELETE group
- `/api/skills/[id]` → PUT, DELETE skill item

Semua API routes harus return JSON. Error response: `{ error: string }` dengan status 500.

---

## 🎬 Animasi & Motion

Gunakan library **Motion** (package `motion`, sebelumnya Framer Motion) untuk:

1. **Page load stagger** — hero section: setiap baris muncul dengan delay bertahap
2. **Scroll reveal** — sections (projects, skills, experience, contact) fade-in + slide-up saat masuk viewport
3. **Filter transition** — project cards animate out/in saat filter berubah
4. **Hover states** — project cards subtle lift, social cards glow

Contoh pola yang digunakan:
```tsx
import { motion } from "motion/react"

// Scroll reveal
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

---

## 🎨 Design Tokens (dari file HTML referensi)

```css
/* Warna utama */
--bg-page:     #EFEFEB   /* background halaman */
--bg-nav:      #1C1C1E   /* floating nav & dark elements */
--bg-card:     #FFFFFF   /* cards */
--accent-blue: #185FA5   /* link, dot active, label section */
--accent-mid:  #378ADD   /* marquee dot, subtle blue */
--text-primary:#1C1C1E
--text-muted:  #888888
--text-hint:   #AAAAAA
--border:      rgba(0,0,0,0.07)

/* Border radius */
--radius-pill: 9999px
--radius-card: 16px   /* rounded-2xl */
--radius-sm:   10px   /* rounded-xl */
```

---

## 📦 Urutan Implementasi yang Disarankan

Lakukan langkah-langkah ini secara berurutan:

1. **Init project** — `npx create-next-app@latest portfolio-bagas --typescript --tailwind --app --src-dir no`
2. **Install dependencies** — supabase, next-auth@latest, motion
3. **Setup Tailwind v4** — update `globals.css` dengan `@import "tailwindcss"`
4. **Buat file-file config** — `auth.ts`, `middleware.ts`, `lib/supabase.ts`, `types/index.ts`
5. **Buat `supabase/schema.sql`** — lengkap dengan seed data
6. **Buat API routes** semua resource (hero, projects, skills, experience, contact)
7. **Buat Login page** (`/login`)
8. **Buat Admin layout + Dashboard**
9. **Buat semua Admin pages** (hero, projects, skills, experience, contact)
10. **Baca `portfolio_bagas_grid_bg.html`** — analisa dan implementasikan sebagai public portfolio page
11. **Tambahkan animasi** dengan Motion di public page
12. **Testing** semua CRUD dan autentikasi
13. **Buat `.env.example`** dan **`README.md`** lengkap

---

## 📖 README yang Harus Dibuat

README harus mencakup:

```markdown
# Setup Steps
1. npm install
2. Setup Supabase (buat project, jalankan schema.sql)
3. cp .env.example .env.local (isi dengan nilai dari Supabase)
4. npm run dev

# Upload Foto Profil
1. Buka Supabase Dashboard → Storage
2. Buat bucket "portfolio" (public)
3. Upload foto
4. Copy URL → paste di /admin/hero

# Deploy ke Vercel
1. Push ke GitHub
2. Connect di vercel.com
3. Tambahkan semua env vars
4. Ubah AUTH_URL ke domain produksi
5. Deploy!

# Routes
/ → Portofolio publik
/login → Login admin
/admin → Dashboard
/admin/hero → Edit hero
/admin/projects → Kelola projects
/admin/skills → Kelola skills
/admin/experience → Kelola experience
/admin/contact → Kelola contact
```

---

## ✅ Checklist Final Sebelum Selesai

Pastikan semua item ini terpenuhi sebelum menyatakan project selesai:

- [ ] File `portfolio_bagas_grid_bg.html` sudah dibaca dan desainnya terimplementasi akurat
- [ ] Semua section publik ada: Hero, Marquee, Projects, Skills, Experience, Contact, Footer
- [ ] Filter project (All/Web Dev/AI ML/Web+AI) berfungsi
- [ ] Tombol "Copy Email" menyalin email ke clipboard
- [ ] Scroll smooth ke section saat nav link diklik
- [ ] Admin login berfungsi (username + password dari .env)
- [ ] Semua CRUD berfungsi: Projects, Skills (grup + item), Experience, Contact
- [ ] Hero editor menyimpan semua field
- [ ] Logout dari admin berfungsi
- [ ] Middleware melindungi semua route `/admin/*`
- [ ] `supabase/schema.sql` lengkap dengan seed data
- [ ] `.env.example` ada semua variabel yang dibutuhkan
- [ ] `README.md` berisi instruksi setup lengkap
- [ ] Tidak ada TypeScript error
- [ ] `npm run build` berhasil tanpa error

---

*Mulai dengan membaca `portfolio_bagas_grid_bg.html` terlebih dahulu, lalu ikuti urutan implementasi di atas.*
