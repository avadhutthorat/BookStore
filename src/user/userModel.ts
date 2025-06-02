import mongoose from 'mongoose'
import { user } from './userTypes'

const userSchema = new mongoose.Schema<user>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<user>('User', userSchema)
