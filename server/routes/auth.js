import express from 'express'
import User from '../models/User.js'
import { hashPassword, verifyPassword } from '../utils/encryption.js'
import { signToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password, color } = req.body || {}
    if (!email || !password || !color) return res.status(400).json({ message: 'Missing fields' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Email already in use' })
    const passwordHash = await hashPassword(password)
    await User.create({ email, passwordHash, color })
    return res.status(201).json({ message: 'Registered' })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' })

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await verifyPassword(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
    const token = signToken({ sub: user._id, email: user.email })
    return res.json({ token })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Server error' })
  }
})

// Public endpoint to fetch user's selected color by email (for initializing wheel)
// Note: In production, consider rate limiting and generic responses to avoid user enumeration.
router.get('/color', async (req, res) => {
  try {
    const { email } = req.query
    if (!email) return res.status(400).json({ message: 'Missing email' })
    const user = await User.findOne({ email }).select('color')
    if (!user) return res.status(404).json({ message: 'User not found' })
    return res.json({ color: user.color })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default router
