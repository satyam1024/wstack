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
      <div>
        <h1>Welcome, {session.user?.name}!</h1>
        <p>You are now logged in.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Login 1</h1>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
    </div>
  );
}