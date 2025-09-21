import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use('/api/', limiter)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use((req, res) => res.status(404).json({ message: 'Not found' }))

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/graphicalpwds'

mongoose.connect(MONGO_URI).then(() => {
  console.log('Mongo connected')
  app.listen(PORT, () => console.log(`API listening on ${PORT}`))
}).catch(err => {
  console.error('Mongo connection error', err)
  process.exit(1)
})
