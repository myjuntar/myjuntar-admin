import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MY JUNTAR Admin',
  description: 'Admin dashboard for wedding venue management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
