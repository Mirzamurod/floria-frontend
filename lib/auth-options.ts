import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDatabase } from './mongoose'
import User from '@/models/user.model'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { email: { label: 'Email', type: 'email' } },
      async authorize(credentials) {
        await connectToDatabase()
        const user = await User.findOne({ email: credentials?.email })
        return user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDatabase()
      const isExistingUser = await User.findOne({ email: session.user?.email })
      if (!isExistingUser) {
        const user = await User.create({
          email: session.user?.email,
          image: session.user?.image,
          name: session.user.name,
        })
        session.currentUser = user
        return session
      }

      if (!(isExistingUser.date > new Date())) {
        const updatedUser = await User.findByIdAndUpdate(
          isExistingUser._id,
          { block: true },
          { new: true }
        )
        session.currentUser = updatedUser
        return session
      } else {
        session.currentUser = isExistingUser
        return session
      }
    },
  },
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.NEXT_PUBLIC_JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login', signOut: '/login' },
}
