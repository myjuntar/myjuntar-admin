import { LogoutButton } from '@/components/ui/LogoutButton'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-semibold">MY JUNTAR Dashboard</h1>
        <LogoutButton />
      </header>
      <main>{children}</main>
    </div>
  )
}
