'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface WagmiComponentWrapperProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

// Wallet integration removed: this wrapper now only provides
// a QueryClientProvider so existing consumers still get a query client.
export default function WagmiComponentWrapper({ children }: WagmiComponentWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}