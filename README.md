# Bagas Prasetyo Portfolio

Personal portfolio web application built with Next.js 15 App Router, Supabase, Tailwind CSS v4, and Auth.js v5.

## Setup Steps

1. `npm install`
2. Setup Supabase (buat project, jalankan `supabase/schema.sql` di SQL Editor)
3. Copy `.env.example` menjadi `.env.local` dan isi dengan nilai dari Supabase
4. `npm run dev`

## Upload Foto Profil

1. Buka Supabase Dashboard → Storage
2. Buat bucket **"portfolio"** (Public)
3. Upload foto pilihanmu
4. Copy URL gambar tersebut → paste di form Dashboard `/admin/hero` pada field `URL Foto Profil`

## Deploy ke Vercel

1. Push repository ke GitHub
2. Connect di [Vercel.com](https://vercel.com)
3. Tambahkan semua _environment variables_ yang ada di `.env.local`
4. Ubah `AUTH_URL` ke domain produksimu (misal: `https://bagasprasetyo.vercel.app`)
5. Deploy!

## Routes & Pages

- `/` → Portofolio publik
- `/login` → Login admin (kredensial di .env.local)
- `/admin` → Dashboard Utama Admin
- `/admin/hero` → Edit hero section
- `/admin/projects` → Kelola projects
- `/admin/skills` → Kelola skills & groups
- `/admin/experience` → Kelola pengalaman kerja & pendidikan
- `/admin/contact` → Kelola contact social links
