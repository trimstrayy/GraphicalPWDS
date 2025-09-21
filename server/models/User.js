import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  color: { type: String, required: true },
  gpassHash: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('User', userSchema)
