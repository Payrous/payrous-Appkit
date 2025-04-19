'use client';

import { payrous_logo } from '@/assets/icons';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { modal } from '@/contexts/AppKitContext';
import { useAccount, useDisconnect } from 'wagmi';
import { ChevronDown } from 'lucide-react';


const modal: any = {}; 

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Format address for display
  const formatAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  // Handle wallet connection
  const handleConnectWallet = () => {
    modal.open();
  };
  
  // Handle wallet disconnection
  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='hidden md:hidden py-10 px-0 lg:flex justify-center items-center w-full'>
      <div className='bg-white flex p-5 rounded-xl w-full h-[80px] justify-center items-center'>
        <nav className='flex items-center justify-between w-full'>

          <Image src={payrous_logo} alt="payrous logo" className='w-24' />

          <ul className='flex items-center justify-center gap-8 text-sm font-light font-geist cursor-pointer text-colors-BlueGray'>
            <Link href="/"><li className='text-orange-400'>Features</li> </Link>
            <Link href="#how-it-works" className='hover:text-orange-400 hover:underline-offset-2 decoration-2'><li>How it works</li></Link>
            <Link href="#faq" className='hover:text-orange-400 hover:underline-offset-2 decoration-2'><li>FAQs</li></Link>
          </ul>

          {isConnected && address ? (
            <div className="relative" ref={dropdownRef}>
              <Button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='text-white bg-[#D98837] hover:bg-orange-300 shadow-slate-200 px-4 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl font-geist flex items-center gap-2'
              >
                {formatAddress(address)}
                <ChevronDown size={16} />
              </Button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button
                      onClick={handleDisconnect}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-orange-400"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={handleConnectWallet}
              className='text-white bg-[#D98837] hover:bg-orange-300 shadow-slate-200 px-8 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl font-geist'
            >
              Connect Wallet
            </Button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;