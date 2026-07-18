import type { HeroData, Project, SkillGroup, Experience, ContactLink } from "@/types/index";

// Static fallback data — used automatically when Supabase is unreachable
// (e.g. account paused, env keys missing, or tables empty).
// Once Supabase returns valid data, this is ignored entirely. No manual cleanup needed.

export const fallbackHero: HeroData = {
  id: "static-hero",
  name: "Bagas Prasetyo",
  tagline: "Full-Stack Developer & AI Engineer",
  role1: "Full-Stack Developer",
  role2: "AI Engineer",
  description:
    "Software developer focused on building functional web applications. Currently developing tools that integrate OCR, local databases, and lightweight NLP models to solve practical problems.",
  photo_url: "/profile.png",
  cv_url: "/resume.pdf",
  email: "bagasprasetyo36@gmail.com",
};

export const fallbackProjects: Project[] = [
  {
    id: "static-shokusafe",
    name: "ShokuSafe",
    description:
      "A menu scanner PWA built with React, FastAPI, and PaddleOCR to help travelers identify Halal status and allergens. Uses a multi-layered verification funnel to guarantee zero false-negative safety.",
    category: "combo",
    github_url: "https://github.com/bagaspra07/ShokuSafe",
    demo_url: "http://43.133.37.252:4173",
    thumbnail_emoji: "🍱",
    sort_order: 1,
  },
  {
    id: "static-portfolio",
    name: "Portfolio Website",
    description:
      "Personal showcase website built using Next.js 16 (App Router), Tailwind CSS v4, and Supabase. Features an administrative panel for project catalog management.",
    category: "web",
    github_url: "https://github.com/bagaspra07",
    demo_url: "",
    thumbnail_emoji: "💼",
    sort_order: 2,
  },
  {
    id: "static-nihongo",
    name: "Nihongo Quiz",
    description:
      "JLPT vocabulary quiz app built to practice Japanese daily with spaced-repetition style review.",
    category: "web",
    github_url: "https://github.com/bagaspra07",
    demo_url: "",
    thumbnail_emoji: "📚",
    sort_order: 3,
  },
  {
    id: "static-manga",
    name: "Manga Translator",
    description:
      "OCR + LLM pipeline that translates Japanese manga panels to English with layout-preserving output.",
    category: "ai",
    github_url: "https://github.com/bagaspra07",
    demo_url: "",
    thumbnail_emoji: "🌸",
    sort_order: 4,
  },
];

export const fallbackSkillGroups: SkillGroup[] = [
  {
    id: "static-sg-web",
    name: "Web Development",
    icon: "Code2",
    sort_order: 1,
    skills: [
      { id: "s1", group_id: "static-sg-web", name: "Next.js", sort_order: 1 },
      { id: "s2", group_id: "static-sg-web", name: "React", sort_order: 2 },
      { id: "s3", group_id: "static-sg-web", name: "TypeScript", sort_order: 3 },
      { id: "s4", group_id: "static-sg-web", name: "Tailwind CSS", sort_order: 4 },
      { id: "s5", group_id: "static-sg-web", name: "FastAPI", sort_order: 5 },
    ],
  },
  {
    id: "static-sg-ai",
    name: "AI / ML",
    icon: "BrainCircuit",
    sort_order: 2,
    skills: [
      { id: "s6", group_id: "static-sg-ai", name: "Python", sort_order: 1 },
      { id: "s7", group_id: "static-sg-ai", name: "PyTorch", sort_order: 2 },
      { id: "s8", group_id: "static-sg-ai", name: "HuggingFace", sort_order: 3 },
      { id: "s9", group_id: "static-sg-ai", name: "PaddleOCR", sort_order: 4 },
      { id: "s10", group_id: "static-sg-ai", name: "LangChain", sort_order: 5 },
    ],
  },
];

export const fallbackExperience: Experience[] = [
  {
    id: "static-exp-1",
    title: "Self-Taught Full-Stack & AI Developer",
    subtitle: "Personal Projects & Portfolio",
    date_range: "2025 - Present",
    type: "work",
    sort_order: 1,
  },
  {
    id: "static-exp-2",
    title: "JLPT N3 Certified",
    subtitle: "Japanese Language Proficiency",
    date_range: "2026",
    type: "education",
    sort_order: 2,
  },
];

export const fallbackContact: ContactLink[] = [
  {
    id: "static-c1",
    platform: "GitHub",
    handle: "bagaspra07",
    url: "https://github.com/bagaspra07",
    icon: "Github",
    sort_order: 1,
  },
  {
    id: "static-c2",
    platform: "LinkedIn",
    handle: "bagas-prasetyo",
    url: "https://linkedin.com/in/bagas-prasetyo",
    icon: "Linkedin",
    sort_order: 2,
  },
  {
    id: "static-c3",
    platform: "Email",
    handle: "bagasprasetyo36@gmail.com",
    url: "mailto:bagasprasetyo36@gmail.com",
    icon: "Mail",
    sort_order: 3,
  },
];
