import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { ObjectId } from 'mongodb'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from './db'

// Create a standard Prisma adapter first
const prismaAdapter = PrismaAdapter(prisma)

// Then extend it with your custom functionality
export const authOptions: NextAuthOptions = {
  adapter: {
    ...prismaAdapter,
    createUser: async (data: {
      id: string
      name?: string | null
      email?: string
      image?: string | null
      emailVerified?: Date | null
    }) => {
      const id = new ObjectId().toHexString()
      return prisma.user.create({
        data: {
          ...data,
          id,
        },
      })
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

export const { auth } = NextAuth(authOptions)
