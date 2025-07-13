'use client'

import { useState } from 'react'
import { signUpWithEmail } from '@/lib/auth/emailSignup'
import { signInWithPassword } from '@/lib/auth/emailPasswordLogin'
import { signInWithGoogle } from '@/lib/auth/googleLogin'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true) // toggle login/signup
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    const authFn = isLogin ? signInWithPassword : signUpWithEmail
    const { error } = await authFn(email, password)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage(isLogin ? 'Logged in successfully.' : 'Check your email to verify your account.')
    }

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
        <h1 className="text-xl font-bold text-center">
          {isLogin ? 'Login to MY JUNTAR' : 'Sign Up for MY JUNTAR'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="you@example.com"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="••••••••"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? 'Please wait…' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>

        <div className="text-center text-gray-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border py-2 rounded hover:bg-gray-100"
        >
          Continue with Google
        </button>

        <div className="text-center mt-2">
          <a href="/reset-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {message && <p className="text-sm text-center text-red-600 mt-2">{message}</p>}
      </div>
    </div>
  )
}
