import { NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data: groups, error: groupsError } = await supabase.from('skill_groups').select('*').order('sort_order', { ascending: true })
  if (groupsError) return NextResponse.json({ error: groupsError.message }, { status: 500 })

  const { data: skills, error: skillsError } = await supabase.from('skills').select('*').order('sort_order', { ascending: true })
  if (skillsError) return NextResponse.json({ error: skillsError.message }, { status: 500 })

  const merged = groups.map(group => ({
    ...group,
    skills: skills.filter(skill => skill.group_id === group.id)
  }))

  return NextResponse.json(merged)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { data, error } = await supabaseAdmin.from('skills').insert([body]).select().single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
