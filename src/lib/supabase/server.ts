import { createServerClient } from '@supabase/ssr'
import { cookies as getCookies } from 'next/headers'

export async function createClientSSR() {
  const cookieStore = await getCookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => cookieStore.get(key)?.value,
        set: () => {},
        remove: () => {}
      }
    }
  )
}
