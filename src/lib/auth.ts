import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { ObjectId } from 'mongodb'; // Import ObjectId from MongoDB
import {prisma} from './db';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const customPrismaAdapter = {
  ...PrismaAdapter(prisma),
  createUser: async (data: any) => {
    const id = new ObjectId().toHexString(); // Generate a MongoDB ObjectID
    return prisma.user.create({
      data: {
        ...data,
        id, // Use the generated ObjectID
      },
    });
  },
};

export const authOptions = {
  adapter: customPrismaAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      session.user.id = user.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug logging
};

export const  {handlers , auth} =  NextAuth(authOptions);