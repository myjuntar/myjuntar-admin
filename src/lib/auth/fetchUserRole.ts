import { createClient } from '../supabase/server'

export async function fetchUserRole(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()

  if (error || !data) {
    throw new Error('Role not found')
  }

  return data.role as string
}
