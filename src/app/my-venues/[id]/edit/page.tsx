import VenueForm from '@/components/forms/VenueForm'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditVenuePage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: venue, error } = await supabase
    .from('venues')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !venue) return notFound()

  return (
    <main className="min-h-screen px-6 py-10 bg-white max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Venue</h1>
      <VenueForm mode="edit" venue={venue} />
    </main>
  )
}
