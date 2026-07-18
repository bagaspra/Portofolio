import { supabase } from '@/lib/supabase'
import PortfolioClient from './PortfolioClient'
import {
  fallbackHero,
  fallbackProjects,
  fallbackSkillGroups,
  fallbackExperience,
  fallbackContact
} from '@/lib/fallbackData'

export const revalidate = 60

export default async function Page() {
  let hero = {}
  let projects = []
  let skillGroups = []
  let experience = []
  let contact = []

  try {
    const [heroRes, projectsRes, groupsRes, skillsRes, experienceRes, contactRes] = await Promise.all([
      supabase.from('hero').select('*').single(),
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('skill_groups').select('*').order('sort_order'),
      supabase.from('skills').select('*').order('sort_order'),
      supabase.from('experience').select('*').order('sort_order'),
      supabase.from('contact_links').select('*').order('sort_order')
    ])

    hero = heroRes.data || fallbackHero
    projects = projectsRes.data && projectsRes.data.length > 0 ? projectsRes.data : fallbackProjects
    experience = experienceRes.data && experienceRes.data.length > 0 ? experienceRes.data : fallbackExperience
    contact = contactRes.data && contactRes.data.length > 0 ? contactRes.data : fallbackContact

    if (groupsRes.data && groupsRes.data.length > 0) {
      skillGroups = groupsRes.data.map(g => ({
        ...g,
        skills: skillsRes.data?.filter(s => s.group_id === g.id) || []
      }))
    } else {
      skillGroups = fallbackSkillGroups
    }
  } catch (error) {
    console.warn("Supabase connection failed, falling back to static data:", error)
    hero = fallbackHero
    projects = fallbackProjects
    skillGroups = fallbackSkillGroups
    experience = fallbackExperience
    contact = fallbackContact
  }

  const data = {
    hero: hero as any,
    projects: projects as any[],
    skillGroups: skillGroups as any[],
    experience: experience as any[],
    contact: contact as any[]
  }

  return <PortfolioClient data={data} />
}
