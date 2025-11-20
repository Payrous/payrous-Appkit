// Wallet/AppKit integration removed.
// Provide no-op `modal` and a simple ContextProvider so app imports
// remain valid while wallet code is disabled.

'use client'

import { wagmiAdapter, projectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, arbitrum } from '@reown/appkit/networks'
import React, { type ReactNode, useState } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
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

// Create the modal
let modal: any
if (typeof window !== 'undefined') {
  modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, arbitrum],
    defaultNetwork: mainnet,
    metadata: metadata,
    features: {
      analytics: true // Optional - defaults to your Cloud configuration
    }
  })
} else {
  modal = {
    open: () => {},
    close: () => {},
    render: () => null
  }
}

export { modal }

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const [client] = useState(() => queryClient)

  const initialState = typeof window !== 'undefined'
    ? cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
    : undefined

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider