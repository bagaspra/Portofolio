import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function update() {
  const { data, error } = await supabase
    .from('hero')
    .update({ photo_url: '/profile.png' })
    .match({ id: (await supabase.from('hero').select('id').single()).data.id })
  
  if (error) {
    console.error('Error updating photo:', error.message)
    process.exit(1)
  }
  
  console.log('Successfully updated profile photo to /profile.png')
}

update()
