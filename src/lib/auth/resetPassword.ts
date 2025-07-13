import { supabase } from '../supabase/client'

export async function sendResetLink(email: string) {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${location.origin}/auth/callback`,
  })
}
