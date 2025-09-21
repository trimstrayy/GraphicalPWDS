import React from 'react'

export default function PasswordInput({ length }) {
  return (
    <div className="card">
      <label>Password</label>
      <input type="password" readOnly value={Array.from({ length }).map(() => '•').join('')} placeholder="Use the wheel to enter" />
    </div>
  )
}
