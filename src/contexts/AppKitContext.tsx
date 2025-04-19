
'use client'
import { wagmiAdapter, projectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, arbitrum, sepolia, polygon} from '@reown/appkit/networks'
import React, { type ReactNode, useState } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'appkit-example',
  description: 'AppKit Example',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://appkitexampleapp.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal and export it - only on client side
let modal;
if (typeof window !== 'undefined') {
  modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, arbitrum, sepolia, polygon],
    defaultNetwork: mainnet,
    metadata: metadata,
    features: {
      analytics: true
    }
  });
} else {
  // Create a placeholder for SSR
  modal = {
    open: () => {},
    close: () => {},
    render: () => null
  };
}

export { modal };

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const [client] = useState(() => queryClient);
  
  // Safe client-side only initialState
  const initialState = typeof window !== 'undefined' 
    ? cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
    : undefined;

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider