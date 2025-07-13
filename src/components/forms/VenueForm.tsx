'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export type VenueFormProps = {
  mode: 'edit' | 'create'
  venue?: any
}

export default function VenueForm({ mode, venue }: VenueFormProps) {
  const [form, setForm] = useState({
    name: venue?.name || '',
    area_id: venue?.area_id || '',
    guest_capacity_min: venue?.guest_capacity_min || '',
    guest_capacity_max: venue?.guest_capacity_max || '',
    description: venue?.description || '',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.id) {
      setMessage('You must be logged in.')
      setLoading(false)
      return
    }

    const payload = {
      name: form.name,
      area_id: form.area_id,
      guest_capacity_min: form.guest_capacity_min,
      guest_capacity_max: form.guest_capacity_max,
      description: form.description,
    }

    const response = mode === 'edit'
      ? await supabase.from('venues').update(payload).eq('id', venue.id)
      : await supabase.from('venues').insert([{ ...payload, owner_id: user.id, status: 'Draft' }])

    if (response.error) {
      setMessage(response.error.message)
    } else {
      router.push('/my-venues')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Venue name"
        required
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="area_id"
        value={form.area_id}
        onChange={handleChange}
        placeholder="Area ID"
        className="w-full border px-4 py-2 rounded"
      />
      <div className="flex gap-4">
        <input
          name="guest_capacity_min"
          type="number"
          value={form.guest_capacity_min}
          onChange={handleChange}
          placeholder="Min guests"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="guest_capacity_max"
          type="number"
          value={form.guest_capacity_max}
          onChange={handleChange}
          placeholder="Max guests"
          className="w-full border px-4 py-2 rounded"
        />
      </div>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Venue description"
        className="w-full border px-4 py-2 rounded min-h-[120px]"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Saving...' : mode === 'edit' ? 'Update Venue' : 'Create Venue'}
      </button>

      {message && <p className="text-red-600 text-sm mt-2">{message}</p>}
    </form>
  )
}
