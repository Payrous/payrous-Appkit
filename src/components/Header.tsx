"use client"
import { search } from "@/assets/icons"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { IoIosMenu } from "react-icons/io"
import { TbSmartHome } from "react-icons/tb"
import { FaPeopleGroup } from "react-icons/fa6"
import { IoWalletOutline } from "react-icons/io5"
import { CgFileDocument } from "react-icons/cg"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { avatar } from "@/assets/images"
import { useAppKit } from "@/hooks/useAppKit"

const headerTitles = {
  "/dashboard/dashboard": "Dashboard",
  "/dashboard/organization": "Organization",
  "/dashboard/payment": "Payment",
  "/dashboard/transaction-history": "Transaction History",
  "/dashboard/payment/recurring": "Payment",
  "/dashboard/payment/one-time": "Payment",
  "/dashboard/payment/deposit-fund": "Payment",
}

const headerIcons = {
  "/dashboard/dashboard": TbSmartHome,
  "/dashboard/organization": FaPeopleGroup,
  "/dashboard/payment": IoWalletOutline,
  "/dashboard/transaction-history": CgFileDocument,
  "/dashboard/payment/recurring": IoWalletOutline,
  "/dashboard/payment/one-time": IoWalletOutline,
  "/dashboard/payment/deposit-fund": IoWalletOutline,
}

interface HeaderProps {
  toggleSidebar: () => void
  userAvatar?: any
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  userAvatar,
}) => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { address, isConnected, openModal } = useAppKit()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
    toggleSidebar()
  }

  const IconComponent = headerIcons[pathname as keyof typeof headerIcons] || TbSmartHome

  // Format wallet address for display
  const formatWalletAddress = (address: string | undefined) => {
    if (!address) return ""
    if (address.includes("...")) return address
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const handleConnectWallet = () => {
    openModal()
  }

  return (
    <div className="bg-colors-OffWhite shadow-lg w-full px-6 md:px-10 py-5 font-geist text-colors-BlueGray flex justify-between items-center">
      <button className="lg:hidden" onClick={handleMenuToggle}>
        <IoIosMenu className="text-colors-BlueGray h-6 w-6" />
      </button>

      <div className="flex items-center gap-2">
        <IconComponent className="w-6 h-6 text-colors-BlueGray" />
        <h1 className="font-bold">{headerTitles[pathname as keyof typeof headerTitles] || "Default Title"}</h1>
      </div>

      <div className="hidden lg:flex items-center gap-5">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            placeholder="Search here"
            className="rounded-full px-10 py-3 border focus:border-colors-BlueGray w-96 relative"
          />
          <Image src={search || "/placeholder.svg"} alt="search_icon" width={16} height={16} className="w-4 h-4 absolute top-4 ml-4" />
        </div>

        {isConnected && address ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 border border-gray-200">
            <Image src={avatar || "/placeholder.svg"} alt="User" />
              <AvatarFallback className="bg-colors-ButtonOrange text-white">
                {address.substring(2, 4).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-colors-Success text-sm">{formatWalletAddress(address)}</p>
          </div>
        ) : (
          <button 
            onClick={handleConnectWallet}
            className="rounded-full border border-colors-ButtonOrange text-colors-ButtonOrange py-2 px-6 hover:bg-colors-ButtonOrange/10 transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  )
}

export default Header