'use client';

import type { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { makeQueryClient, makeExternalQueryClient } from './query-client';
import { trpc } from './client';

let clientQueryClientSingleton: QueryClient;
let externalQueryClientSingleton: QueryClient;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = makeQueryClient();
  }
  return clientQueryClientSingleton;
}

function getExternalQueryClient() {
  if (typeof window === 'undefined') {
    return makeExternalQueryClient();
  }
  if (!externalQueryClientSingleton) {
    externalQueryClientSingleton = makeExternalQueryClient();
  }
  return externalQueryClientSingleton;
}

function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') {
      return '';
    }
    return 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
}

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const queryClient = getQueryClient();
  const externalQueryClient = getExternalQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={externalQueryClient}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}