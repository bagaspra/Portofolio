import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const ext = file.name.split('.').pop()
    const fileName = `projects/${Date.now()}.${ext}`

    const { error } = await supabaseAdmin.storage
      .from('Portofolio')
      .upload(fileName, file, { contentType: file.type, upsert: false })

    if (error) throw error

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('Portofolio')
      .getPublicUrl(fileName)

    return NextResponse.json({ url: publicUrl })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
