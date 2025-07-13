import { supabase } from '../supabase/client'

export async function signInWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
}
