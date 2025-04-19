'use client';

import { ReactNode } from 'react';
// import { useModal } from '@reown/appkit/react';

interface AppKitWrapperProps {
  children: ReactNode;
}

export default function AppKitWrapper({ children }: AppKitWrapperProps) {
  // This component ensures the AppKit modal is available
  // No need to do anything special here, just ensure the component is client-side
  return <>{children}</>;
}
