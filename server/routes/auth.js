import express from 'express'
import User from '../models/User.js'
import { hashPassword } from '../utils/encryption.js'
import { signToken } from '../middleware/auth.js'
import crypto from 'crypto'

const router = express.Router()

function deriveGraphPassHash(email, color, graphical) {
  // Simple demo derivation: HMAC(email + ':' + color, graphical)
  return crypto.createHmac('sha256', graphical).update(`${email}:${color}`).digest('hex')
}

router.post('/register', async (req, res) => {
  try {
    const { email, password, color, graphicalPassword } = req.body || {}
    if (!email || !password || !color) return res.status(400).json({ message: 'Missing fields' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Email already in use' })
    const passwordHash = await hashPassword(password)
    const gpassHash = graphicalPassword ? deriveGraphPassHash(email, color, graphicalPassword) : undefined
    await User.create({ email, passwordHash, color, gpassHash })
    return res.status(201).json({ message: 'Registered' })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, graphicalPassword } = req.body || {}
    if (!email || !graphicalPassword) return res.status(400).json({ message: 'Missing fields' })

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    // Compare derived hash with stored value (if present)
    if (user.gpassHash) {
      const candidate = deriveGraphPassHash(user.email, user.color, graphicalPassword)
      if (candidate !== user.gpassHash) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
    }
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
    return res.json({ color: user?.color || '#ff6b6b' })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default router
