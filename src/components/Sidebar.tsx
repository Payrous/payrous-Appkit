"use client"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { IoCloseSharp } from "react-icons/io5"
import { VscChromeMinimize } from "react-icons/vsc"
import { TbSmartHome } from "react-icons/tb"
import { FaPeopleGroup } from "react-icons/fa6"
import { IoWalletOutline } from "react-icons/io5"
import { CgFileDocument } from "react-icons/cg"
import { payrous_logo } from "@/assets/icons"
import { avatar } from "@/assets/images"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useAppKit } from "@/hooks/useAppKit"

interface SidebarProps {
  isMobile: boolean
  toggleSidebar: () => void
  setSidebarVisible: (visible: boolean) => void
  userAvatar?: any
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  toggleSidebar,
  setSidebarVisible,
  userAvatar,
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isPaymentOpen, setIsPaymentOpen] = useState(pathname.startsWith("/dashboard/payment"))
  const { isConnected, address, openModal, chainId } = useAppKit()

  const handleClose = () => {
    setSidebarVisible(false)
  }

  // Format wallet address for display
  const formatWalletAddress = (address: string | undefined) => {
    if (!address) return ""
    if (address.includes("...")) return address
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Handle navigation and close sidebar on mobile/tablet
  const handleNavigation = (href: string) => {
    if (isMobile) {
      setSidebarVisible(false)
    }
    router.push(href)
  }

  // Handle wallet connection
  const handleWalletAction = () => {
    openModal()
  }

  // At the beginning of your Sidebar component
const [mounted, setMounted] = useState(false);
  
useEffect(() => {
  setMounted(true);
}, []);


  // Get network name based on chainId
  const getNetworkName = () => {
    // Add more networks as needed
    const networks = {
      1: "Ethereum Mainnet",
      5: "Goerli Testnet",
      42161: "Arbitrum",
      11155111: "Sepolia Testnet",
    }
    return chainId ? networks[chainId as keyof typeof networks] || `Chain ID: ${chainId}` : "Not Connected"
  }

  // Check if current path is exactly the payment page
  const isExactPaymentPage = pathname === "/dashboard/payment"

  return (
    <>
      {/* Backdrop - mobile and tablet */}
      {isMobile && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={handleClose} />}

      <div
        className={`
        h-screen bg-colors-BlueGray text-white flex flex-col
        ${isMobile ? "fixed top-0 left-0 z-50 w-4/5" : "w-60 lg:w-52"}
        lg:rounded-r-[40px]
      `}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-colors-BlueGray pt-4 px-4 pb-2 z-10 lg:rounded-r-[40px]">
          <div className="flex items-center justify-between relative">
            {isMobile && (
              <button onClick={handleClose} className="border rounded-md px-1 text-white">
                <IoCloseSharp className="h-6 w-6" />
              </button>
            )}
            <Link href="/" className={`${isMobile ? "mx-auto" : ""} ${!isMobile ? "lg:mx-auto" : ""}`}>
            <Image src={payrous_logo || "/placeholder.svg"} alt="payrous-logo" width={80} height={80} className="w-20 h-20" />
            </Link>
          </div>

          {/* User avatar and wallet address - only on mobile/tablet */}
          {isMobile && isConnected && address && (
            <div className="flex items-center gap-2 mt-2 mb-4 px-2">
              <Avatar className="h-10 w-10 border border-white/20">
              <Image src={userAvatar || avatar} alt="User" width={40} height={40} />
                <AvatarFallback className="bg-colors-ButtonOrange text-white">
                  {address.substring(2, 4).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate text-colors-Success">{formatWalletAddress(address)}</p>
              </div>
            </div>
          )}
        </div>

        {/* All sidebar Links */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="flex flex-col gap-8 md:gap-10 items-start text-sm">
            <div
              onClick={() => handleNavigation("/dashboard/dashboard")}
              className={`flex items-center gap-2 hover:text-colors-ButtonOrange cursor-pointer ${pathname === "/dashboard/dashboard" ? "text-colors-ButtonOrange" : ""}`}
            >
              {pathname === "/dashboard/dashboard" && (
                <VscChromeMinimize className="w-0.5 h-5 bg-colors-ButtonOrange mr-2 " />
              )}
              <TbSmartHome className="w-4 h-4" />
              <h1>Dashboard</h1>
            </div>

            <div
              onClick={() => handleNavigation("/dashboard/organization")}
              className={`flex items-center gap-2 hover:text-colors-ButtonOrange cursor-pointer ${pathname === "/dashboard/organization" ? "text-colors-ButtonOrange" : ""}`}
            >
              {pathname === "/dashboard/organization" && (
                <VscChromeMinimize className="w-0.5 h-5 bg-colors-ButtonOrange mr-2 " />
              )}
              <FaPeopleGroup className="w-4 h-4" />
              <h1>Organization</h1>
            </div>

            {/* Payment link */}
            <Collapsible open={isPaymentOpen} onOpenChange={setIsPaymentOpen} className="w-full">
              <div className="flex w-full">
                {/* Payment parent link */}
                <div
                  onClick={() => handleNavigation("/dashboard/payment")}
                  className={`flex items-center gap-2 hover:text-colors-ButtonOrange cursor-pointer ${isExactPaymentPage ? "text-colors-ButtonOrange" : ""}`}
                >
                  {isExactPaymentPage && <VscChromeMinimize className="w-0.5 h-5 bg-colors-ButtonOrange mr-2 " />}
                  <IoWalletOutline className="w-4 h-4" />
                  <h1>Payment</h1>
                </div>

                {/* subpayment links*/}
                <CollapsibleTrigger className="ml-auto">
                  <div className="w-5 h-5"></div> {/* Empty div for click area */}
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="pl-6 mt-2 space-y-2">
                <div
                  onClick={() => handleNavigation("/dashboard/payment/recurring")}
                  className={`flex items-center gap-2 py-1 cursor-pointer hover:text-colors-ButtonOrange ${pathname === "/dashboard/payment/recurring" ? "text-colors-ButtonOrange" : "text-gray-400"}`}
                >
                  <h1>Recurring</h1>
                </div>

                <div
                  onClick={() => handleNavigation("/dashboard/payment/one-time")}
                  className={`flex items-center gap-2 py-1 cursor-pointer hover:text-colors-ButtonOrange ${pathname === "/dashboard/payment/one-time" ? "text-colors-ButtonOrange" : "text-gray-400"}`}
                >
                  <h1>One-Time</h1>
                </div>

                <div
                  onClick={() => handleNavigation("/dashboard/payment/deposit-fund")}
                  className={`flex items-center gap-2 py-1 cursor-pointer hover:text-colors-ButtonOrange ${pathname === "/dashboard/payment/deposit-fund" ? "text-colors-ButtonOrange" : "text-gray-400"}`}
                >
                  <h1>Deposit Fund</h1>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div
              onClick={() => handleNavigation("/dashboard/transaction-history")}
              className={`flex items-center gap-2 hover:text-colors-ButtonOrange cursor-pointer ${pathname === "/dashboard/transaction-history" ? "text-colors-ButtonOrange" : ""}`}
            >
              {pathname === "/dashboard/transaction-history" && (
                <VscChromeMinimize className="w-0.5 h-5 bg-colors-ButtonOrange mr-2 " />
              )}
              <CgFileDocument className="w-4 h-4" />
              <h1>Transaction history</h1>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="sticky bottom-0 bg-colors-BlueGray px-4 py-4 mt-auto">
          {isConnected && address ? (
            <>
              <h1 className="text-sm">Connected to</h1>
              <h2 className="font-semibold py-1 text-sm">{getNetworkName()}</h2>
              <p className="text-colors-Success font-semibold">{formatWalletAddress(address)}</p>
              <div className="py-4">
                <button 
                  onClick={handleWalletAction}
                  className="rounded-full border border-red-600 text-red-600 py-2 px-10 w-full hover:bg-red-600/10 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <div className="py-4">
              <button 
                onClick={handleWalletAction}
                className="rounded-full border border-green-600 text-green-600 py-2 px-10 w-full hover:bg-green-600/10 transition-colors"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar

