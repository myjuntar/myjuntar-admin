import { fetchUserRole } from '@/lib/auth/fetchUserRole'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const role = await fetchUserRole()

  if (!role) return redirect('/login')
  if (role === 'user') return redirect('/explore')

  return redirect('/dashboard')
}
