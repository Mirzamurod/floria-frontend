import { Schema, model, models } from 'mongoose'
import { TUser } from '@/types/user'

const userSchema = new Schema<TUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String },
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
  block: { type: Boolean, default: true },
  telegramToken: { type: String },
  telegramId: { type: String },
  location: { type: String },
  card_number: { type: String },
  card_name: { type: String },
  userName: { type: String },
  userPhone: { type: String },
})

const User = models.User || model<TUser>('User', userSchema)
export default User
