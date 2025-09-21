import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AuthForm from '../components/AuthForm'
import WheelInterface from '../components/WheelInterface'
import PasswordInput from '../components/PasswordInput'
import { buildGroupedChars } from '../utils/wheelLogic'
import '../styles/wheel.css'

export default function Login({ setToken }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [wheelColor, setWheelColor] = useState('#ff6b6b')
  const [grouped, setGrouped] = useState(buildGroupedChars())
  const [rotation, setRotation] = useState(0)
  const [graphicalPassword, setGraphicalPassword] = useState('')

  const onSelect = (char) => {
    setGraphicalPassword(prev => prev + char)
  }

  const reset = () => {
    setGraphicalPassword('')
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      const res = await axios.post('/api/auth/login', { email, graphicalPassword })
      setToken(res.data.token)
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  useEffect(() => { reset() }, [rotation])

  useEffect(() => {
    const run = async () => {
      if (!email) return
      try {
        const { data } = await axios.get('/api/auth/color', { params: { email } })
        if (data?.color) setWheelColor(data.color)
      } catch {}
    }
    run()
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
        length={graphicalPassword.length}
        clear={reset}
      />
      <WheelInterface
        color={wheelColor}
        grouped={grouped}
        rotation={rotation}
        setRotation={setRotation}
        onSelect={onSelect}
      />
      <PasswordInput length={graphicalPassword.length} />
    </div>
  )
}
