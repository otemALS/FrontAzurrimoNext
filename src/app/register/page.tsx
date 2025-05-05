'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleRegister = async (e: any) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:9008/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error()
      router.push('/login')
    } catch {
      setError("Erreur d'inscription")
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Nom" onChange={e => setForm({ ...form, nom: e.target.value })} />
      <input placeholder="Prénom" onChange={e => setForm({ ...form, prenom: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Mot de passe" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">S'inscrire</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
