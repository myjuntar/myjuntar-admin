import { createClient } from '@/lib/supabase/server'
import { fetchOwnerVenues } from '@/lib/supabase/queries/fetchOwnerVenues'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function MyVenuesPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user?.id) {
    return redirect('/login')
  }

  const userId = session.user.id
  const venues = await fetchOwnerVenues(userId)

  return (
    <main className="min-h-screen px-6 py-10 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Venues</h1>
        <Link
          href="/my-venues/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Venue
        </Link>
      </div>

      {venues.length === 0 ? (
        <p className="text-gray-600">You haven't listed any venues yet.</p>
      ) : (
        <ul className="space-y-4">
          {venues.map((venue: any) => (
            <li
              key={venue.id}
              className="border rounded p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{venue.name}</h2>
                <p className="text-sm text-gray-500">Status: {venue.status}</p>
              </div>
              <Link
                href={`/my-venues/${venue.id}/edit`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
