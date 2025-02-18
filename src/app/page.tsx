'use client'
import { useState } from "react";
import Login from "./(auth)/login/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function Home() {

  const [queryClient] = useState(() => new QueryClient());


  return (
    <QueryClientProvider client={queryClient}>
      <div>
      <Login />
    </div>
    </QueryClientProvider>
  );
}
