import { Schema, model, models } from 'mongoose'
import { toZonedTime } from 'date-fns-tz'
import { addWeeks } from 'date-fns'
import { TUser } from '@/types/user'

const UZBEKISTAN_TIMEZONE = 'Asia/Tashkent'

const userSchema = new Schema<TUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String },
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
  block: { type: Boolean, default: false },
  plan: { type: String, enum: ['week', 'month', 'vip'], default: 'week' },
  date: { type: Date, default: addWeeks(toZonedTime(new Date(), UZBEKISTAN_TIMEZONE), 2) },
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
