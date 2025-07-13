'use client'

import { LogoutButton } from './LogoutButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">MY JUNTAR Dashboard</h2>
      <LogoutButton />
    </header>
  )
}
