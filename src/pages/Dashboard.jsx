import React from 'react'

export default function Dashboard({ token }) {
  if (!token) {
    return (
      <div className="page">
        <h2>Welcome</h2>
        <p>Please login to access your dashboard.</p>
      </div>
    )
  }
  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p>You are logged in with JWT token stored locally. This is a placeholder.</p>
    </div>
  )
}
