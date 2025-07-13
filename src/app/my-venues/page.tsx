import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function MyVenuesPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If not authenticated, redirect (redundant if middleware is in place)
  if (!session?.user?.id) {
    redirect('/login')
  }

  // Optional: Fetch user info or venues later

  return (
    <main className="min-h-screen px-6 py-10 bg-white">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Venues</h1>

      <div className="bg-gray-100 p-6 rounded shadow">
        <p>This will show all venues owned by the logged-in venue owner.</p>
        <p className="mt-2">Later, you can:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
          <li>List all submitted venues</li>
          <li>See venue status (Draft / Published / Rejected)</li>
          <li>Click to edit or add new venues</li>
        </ul>
      </div>
    </main>
  )
}
