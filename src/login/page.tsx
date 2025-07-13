'use client'

import { useState } from 'react'
import { signInWithEmailOtp } from '@/lib/auth/emailLogin'
import { signInWithGoogle } from '@/lib/auth/googleLogin'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    const { error } = await signInWithEmailOtp(email)
    if (error) setMessage(error.message)
    else setMessage('Check your email for the login link.')
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const { error } = await signInWithGoogle()
    if (error) setMessage(error.message)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow space-y-6">
        <h1 className="text-xl font-bold text-center">Login to MY JUNTAR</h1>

        <form onSubmit={handleEmailLogin} className="space-y-4">
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
            {isLoading ? 'Sending OTP...' : 'Send OTP to Email'}
          </button>
        </form>

        <div className="text-center text-gray-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border py-2 rounded hover:bg-gray-100"
        >
          Continue with Google
        </button>

        {message && <p className="text-sm text-center text-red-600">{message}</p>}
      </div>
    </div>
  )
}
