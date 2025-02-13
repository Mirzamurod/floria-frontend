import { DefaultSession } from 'next-auth'
import { TUser } from './user'

declare module 'next-auth' {
  interface Session {
    currentUser?: TUser
    user: {} & DefaultSession['user']
  }
}
