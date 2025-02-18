"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Login() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('User is authenticated:', session.user);
    }
  }, [session, status]);

  if (status === 'authenticated') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
        <div className='flex flex-col gap-y-3'>
        <p className="text-lg">You are now logged in.</p>
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 rounded-xl">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign in to W-stack</h1> 
        <p className="text-gray-600 mb-6 text-center">Welcome back! Please sign in to continue</p> 

        <div className="flex space-x-4"> 
          <button
            onClick={() => signIn('google')}
            className="w-1/2 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" // Button width and styling
          >
            <Image className="w-5 h-5 mr-2" src="/google-icon.png" alt="Google Icon" width={20} height={20} />
            Google
          </button>

          <button
            onClick={() => signIn('github')}
            className="w-1/2 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" // Button width and styling
          >
            <Image className="w-5 h-5 mr-2" src="/github-icon.png" alt="GitHub Icon" width={20} height={20} /> 
            GitHub
          </button>
        </div>

        <div className="relative mt-6"> 
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}