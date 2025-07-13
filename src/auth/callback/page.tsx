import { createClient } from '@/lib/supabase/server'
import { fetchUserRole } from '@/lib/auth/fetchUserRole'
import { redirectByRole } from '@/lib/auth/redirectByRole'
import { redirect } from 'next/navigation'

export default async function AuthCallbackPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return redirect('/login')

  const userId = session.user.id
  try {
    const role = await fetchUserRole(userId)
    return redirect(redirectByRole(role))
  } catch (error) {
    console.error('Error fetching user role:', error)
    return redirect('/login')
  }
}
