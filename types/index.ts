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
