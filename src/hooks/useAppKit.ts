'use client';

import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { modal } from '@/contexts/AppKitContext'; 
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
    openModal: () => modal.open(), 
    closeModal: () => modal.close(),
    switchChain,
  };
}