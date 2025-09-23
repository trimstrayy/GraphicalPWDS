import React, { useState } from 'react'
import axios from 'axios'
import AuthForm from '../components/AuthForm'
import ColorPicker from '../components/ColorPicker'
import { defaultPalette, mapToDefaultPalette } from '../utils/colorUtils'
import '../styles/wheel.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [color, setColor] = useState(defaultPalette[0])
  const [loading, setLoading] = useState(false)
  

  const onSubmit = async () => {
    try {
      setLoading(true)
      // Normalize to current palette before sending
      const normalized = mapToDefaultPalette(color)
      await axios.post('/api/auth/register', { email, password, color: normalized })
      alert('Registered! You can now log in.')
    } catch (err) {
      alert(err?.response?.data?.message || 'Register failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="page">
      <h1>Register</h1>
      <AuthForm
        mode="register"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
        loading={loading}
      />
      <ColorPicker color={color} setColor={setColor} />
    </div>
  )
}
