import jwt from 'jsonwebtoken'

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', { expiresIn: '2h' })
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Missing token' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
