import React from 'react'

export default function AuthForm({ mode, email, setEmail, password, setPassword, onSubmit, loading, length, clear }) {
  const minLen = 4
  const disabled = loading || (mode === 'login' && ((length || 0) < minLen))
  return (
    <div className="card">
      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
      {mode === 'register' && (
        <>
          <label>Password (backup)</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </>
      )}
      {mode === 'login' && (
        <>
          <div className="hint">Build your password using the wheel below (inner/middle/outer).</div>
          <div className="hint">Length: {length || 0} (min {minLen})</div>
          <div className="row">
            <button type="button" onClick={clear}>Clear</button>
          </div>
        </>
      )}
      <div className="row">
        <button onClick={onSubmit} disabled={disabled}>{loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Register')}</button>
      </div>
    </div>
  )
}
