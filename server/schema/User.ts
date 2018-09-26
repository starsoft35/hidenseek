import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  distinctId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  permission: { type: String, required: true, enum: ['LOW', 'HIGH', 'TOTAL'] }
})

export default mongoose.model('User', UserSchema)
