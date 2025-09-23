import React, { useState } from 'react'

export default function PasswordInput({ value = '' }) {
  const [show, setShow] = useState(false)
  const toggle = () => setShow(s => !s)
  return (
    <div className="card">
      <label>Password</label>
      <div className="row">
        <input
          type={show ? 'text' : 'password'}
          readOnly
          value={value}
          placeholder="Use the wheel to enter"
          style={{ flex: 1 }}
        />
        <button type="button" onClick={toggle} aria-pressed={show} aria-label={show ? 'Hide password' : 'Show password'}>
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  )
}
