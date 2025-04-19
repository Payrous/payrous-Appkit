'use client';

import { ReactNode } from 'react';
import { config } from '@/config'; 
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface WagmiComponentWrapperProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

export default function WagmiComponentWrapper({ children }: WagmiComponentWrapperProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}