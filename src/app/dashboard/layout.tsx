import { fetchUserRole } from '@/lib/auth/fetchUserRole'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const role = await fetchUserRole()

  if (!role) redirect('/login')
  if (role === 'user') redirect('/explore')

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />
      <div className="flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
