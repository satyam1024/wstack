"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

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
        <div className="w-screen py-20 flex justify-center flex-col items-center">
    <span className="text-4xl font-extrabold uppercase">Todo App</span>
      </div>
      </div>
  );
}
