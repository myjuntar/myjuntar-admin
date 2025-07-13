'use client'

import { useState } from 'react'
import { sendResetLink } from '@/lib/auth/resetPassword'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    const { error } = await sendResetLink(email)
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the reset password link.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow space-y-6">
        <h1 className="text-xl font-bold text-center">Reset Your Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="you@example.com"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <p className="text-sm text-center text-red-600">{message}</p>}
      </div>
    </div>
  )
}
