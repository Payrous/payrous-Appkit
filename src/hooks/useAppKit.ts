'use client';

import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { useEffect, useState } from 'react';

export function useAppKit() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({
    address,
    query: {
      enabled: Boolean(address),
    },
  });
  const { switchChain } = useSwitchChain();

  // Add SSR safety
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug: log account state changes to help trace connection issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.debug('[useAppKit] address:', address, 'isConnected:', isConnected, 'chainId:', chainId)
    }
  }, [address, isConnected, chainId]);

  // Return placeholder values during SSR to prevent hydration mismatch
  if (!mounted) {
    return {
      address: undefined,
      isConnected: false,
      chainId: undefined,
      balance: undefined,
      openModal: () => {},
      closeModal: () => {},
      switchChain: () => Promise.resolve(),
    };
  }

  return {
    address,
    isConnected,
    chainId,
    balance: balanceData,
    // Use dynamic import to access the client-only `modal` safely at runtime.
    openModal: () => import('@/contexts/AppKitContext').then((mod) => (mod.modal as any)?.open?.()),
    closeModal: () => import('@/contexts/AppKitContext').then((mod) => (mod.modal as any)?.close?.()),
    switchChain,
  };
}