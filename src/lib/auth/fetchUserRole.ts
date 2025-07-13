import { createClientSSR } from '../supabase/server'

export async function fetchUserRole(userId: string) {
  const supabase = await createClientSSR()

  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()

  if (error || !data?.role) {
    throw new Error('Role not found for user')
  }

  return data.role
}
