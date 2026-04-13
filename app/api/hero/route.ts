import { NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase.from('hero').select('*').single()
  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data || {})
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { data: existing } = await supabase.from('hero').select('id').single()

    if (existing) {
      const { error } = await supabaseAdmin.from('hero').update(body).eq('id', existing.id)
      if (error) throw error
    } else {
      const { error } = await supabaseAdmin.from('hero').insert([body])
      if (error) throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
