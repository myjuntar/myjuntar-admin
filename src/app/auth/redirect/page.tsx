'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function AuthRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const handle = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user?.id) {
        console.warn('❌ No session found after redirect.')
        return router.replace('/login')
      }

      const userId = session.user.id
      const email = session.user.email

      // Send user ID to your backend to check/insert
      const res = await fetch('/api/auth/role-check', {
        method: 'POST',
        body: JSON.stringify({ id: userId, email }),
      })

      const { role, redirectTo } = await res.json()
      router.replace(redirectTo || '/')
    }

    handle()
  }, [router])

  return <p className="text-center mt-10">🔐 Finalizing login...</p>
}
