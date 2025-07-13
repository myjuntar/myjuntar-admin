import { createClient } from '@/lib/supabase/server'

export async function fetchOwnerVenues(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('venues')
    .select('id, name, status, area_id, created_at')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
