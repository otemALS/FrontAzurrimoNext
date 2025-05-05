'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:9008/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error()

      const { token } = await res.json()
      localStorage.setItem('token', token)
      router.push('/')
    } catch {
      setError('Email ou mot de passe invalide')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Connexion</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
