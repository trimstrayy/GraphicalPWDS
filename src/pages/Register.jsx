import React, { useState } from 'react'
import axios from 'axios'
import AuthForm from '../components/AuthForm'
import ColorPicker from '../components/ColorPicker'
import WheelInterface from '../components/WheelInterface'
import PasswordInput from '../components/PasswordInput'
import { buildGroupedChars } from '../utils/wheelLogic'
import '../styles/wheel.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [color, setColor] = useState('#ff6b6b')
  const [loading, setLoading] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [grouped] = useState(buildGroupedChars())
  const [graphicalPassword, setGraphicalPassword] = useState('')

  const onSelect = (char) => setGraphicalPassword(prev => prev + char)
  const reset = () => setGraphicalPassword('')

  const onSubmit = async () => {
    try {
      setLoading(true)
      await axios.post('/api/auth/register', { email, password, color, graphicalPassword })
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
      <WheelInterface color={color} grouped={grouped} rotation={rotation} setRotation={setRotation} onSelect={onSelect} />
      <div className="row">
        <PasswordInput length={graphicalPassword.length} />
        <button type="button" onClick={reset}>Clear</button>
      </div>
    </div>
  )
}
