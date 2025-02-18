"use client";

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Login() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('User is authenticated:', session.user);
      // Redirect or show a welcome message
    }
  }, [session, status]);

  if (status === 'authenticated') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
        <p className="text-lg">You are now logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <button
        onClick={() => signIn('google')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signIn('github')}
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}