import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AuthForm from '../components/AuthForm'
import WheelInterface from '../components/WheelInterface'
import PasswordInput from '../components/PasswordInput'
import { buildGroupedChars } from '../utils/wheelLogic'
import { defaultPalette, mapToDefaultPalette } from '../utils/colorUtils'
import '../styles/wheel.css'

export default function Login({ setToken }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [wheelColor, setWheelColor] = useState(defaultPalette[0])
  const [grouped, setGrouped] = useState(buildGroupedChars())
  const [rotation, setRotation] = useState(0)
  const [wheelPassword, setWheelPassword] = useState('')

  const onSelect = (char) => setWheelPassword(prev => prev + char)

  const reset = () => setWheelPassword('')

  const onSubmit = async () => {
    try {
      setLoading(true)
  const res = await axios.post('/api/auth/login', { email, password: wheelPassword })
      setToken(res.data.token)
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  // Do not clear entered characters when rotating; keep the buffer intact.

  useEffect(() => {
    if (!email) return
    const handle = setTimeout(async () => {
      try {
  const { data } = await axios.get('/api/auth/color', { params: { email } })
  if (data?.color) setWheelColor(mapToDefaultPalette(data.color))
      } catch (err) {
        // Silently ignore 404 or network errors
      }
    }, 300)
    return () => clearTimeout(handle)
  }, [email])

  return (
    <div className="page">
      <h1>Login</h1>
      <AuthForm
        mode="login"
        email={email}
        setEmail={setEmail}
        onSubmit={onSubmit}
        loading={loading}
        length={wheelPassword.length}
        clear={reset}
      />
      <WheelInterface
        color={wheelColor}
        grouped={grouped}
        rotation={rotation}
        setRotation={setRotation}
        onSelect={onSelect}
      />
  <PasswordInput value={wheelPassword} />
    </div>
  )
}
