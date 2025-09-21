import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './styles/main.css'

export default function App() {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const handleLogout = () => {
    setToken(null)
    navigate('/login')
  }

  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="brand">GraphicalPWDS</Link>
        <nav>
          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}
