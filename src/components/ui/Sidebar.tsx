'use client'

import Link from 'next/link'

export default function Sidebar({ role }: { role: string }) {
  const links = []

  if (['super_admin', 'owner', 'support'].includes(role)) {
    links.push({ href: '/dashboard/venues', label: 'Manage Venues' })
    links.push({ href: '/dashboard/settings', label: 'Settings' })
  }

  if (role === 'super_admin') {
    links.push({ href: '/dashboard/admin', label: 'Admin Panel' })
  }

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r min-h-screen sticky top-0">
      <nav className="space-y-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block text-gray-700 hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
