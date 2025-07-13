import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function fetchUserRole(): Promise<string | null> {
  const cookieStore = await cookies() // ✅ must await in Next.js 15

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set() {},
        remove() {},
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const userId = session?.user?.id
  if (!userId) return null

  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()

  return user?.role || null
}
