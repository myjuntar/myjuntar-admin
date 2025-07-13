import { supabase } from '../supabase/client'

export async function signInWithPassword(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}
