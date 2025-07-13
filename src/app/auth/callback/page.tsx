'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { redirectByRole } from '@/lib/auth/redirectByRole'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const finalizeLogin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      console.log('🔐 Session:', session)

      if (!session?.user?.id) {
        return router.replace('/login')
      }

      const { id: userId, email, user_metadata } = session.user

      // 1. Check if user already exists in Supabase "users" table
      const { data: existingUser, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()

      let role = existingUser?.role

      // 2. If not found, insert the user
      if (!role) {
        role = email === 'myjuntar@gmail.com' ? 'super_admin' : 'user'

        const { error: insertError } = await supabase.from('users').insert({
          id: userId,
          role,
          full_name: user_metadata?.full_name || '',
          is_verified: true,
        })

        if (insertError) {
          console.error('❌ Insert error:', insertError.message)
          return router.replace('/login')
        }
      }

      // 3. Redirect based on role
      const redirectPath = redirectByRole(role)
      console.log('✅ Redirecting to:', redirectPath)
      router.replace(redirectPath)
    }

    finalizeLogin()
  }, [router])

  return <p className="text-center mt-10">🔄 Logging you in securely...</p>
}
