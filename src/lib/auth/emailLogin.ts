import { supabase } from '../supabase/client'

export async function signInWithEmailOtp(email: string) {
  return await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  })
}
