import { supabase } from '@/lib/supabase'
import PortfolioClient from './PortfolioClient'

export const revalidate = 60

export default async function Page() {
  const [heroRes, projectsRes, groupsRes, skillsRes, experienceRes, contactRes] = await Promise.all([
    supabase.from('hero').select('*').single(),
    supabase.from('projects').select('*').order('sort_order'),
    supabase.from('skill_groups').select('*').order('sort_order'),
    supabase.from('skills').select('*').order('sort_order'),
    supabase.from('experience').select('*').order('sort_order'),
    supabase.from('contact_links').select('*').order('sort_order')
  ])

  const skillGroups = groupsRes.data?.map(g => ({
    ...g,
    skills: skillsRes.data?.filter(s => s.group_id === g.id) || []
  })) || []

  const data = {
    hero: heroRes.data || {},
    projects: projectsRes.data || [],
    skillGroups,
    experience: experienceRes.data || [],
    contact: contactRes.data || []
  }

  return <PortfolioClient data={data} />
}
