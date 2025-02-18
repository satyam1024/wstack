"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-black animate-pulse"> 
        <h1 className="text-2xl font-bold mb-4 text-white">Welcome, {session.user?.name}!</h1>
        <div className='flex flex-col gap-y-3'>
          <p className="text-lg text-gray-300">You are now logged in.</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-black p-4 rounded-xl"> 
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign in to W-stack</h1>
        <p className="text-gray-400 mb-6 text-center">Welcome back! Please sign in to continue</p>

        <div className="flex space-x-4">
          <button
            onClick={() => signIn('google')}
            className="w-1/2 flex items-center justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" 
          >
            <Image className="w-5 h-5 mr-2" src="/google-icon.png" alt="Google Icon" width={20} height={20} />
            Google
          </button>

          <button
            onClick={() => signIn('github')}
            className="w-1/2 flex items-center justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" 
          >
            <Image className="w-5 h-5 mr-2" src="/github-icon.png" alt="GitHub Icon" width={20} height={20} />
            GitHub
          </button>
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}