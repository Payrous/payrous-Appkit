"use client"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { useState, useEffect } from "react"
import { useAppKit } from "@/hooks/useAppKit"
import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Get wallet data from AppKit
  const { address } = useAppKit()
  
  // Default avatar
const userAvatar = "/placeholder.svg"

  useEffect(() => {
    const handleResize = () => {
      //  mobile and tablet devices
      setIsMobile(window.innerWidth <= 1024)
    }

    // handleResize on mount
    handleResize()
    setMounted(true)

    // Add event
    window.addEventListener("resize", handleResize)

    // Clean event
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev)
  }

  // Return a simplified version during SSR
  if (!mounted) {
    <div className="bg-colors-OffWhite h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400"></div>
    </div>
  }

  return (
    <div className="bg-colors-OffWhite">
      <div className="flex h-screen overflow-hidden">
        {(isMobile ? isSidebarVisible : true) && (
          <Sidebar
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
            setSidebarVisible={setSidebarVisible}
            userAvatar={userAvatar}
          />
        )}

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header 
            toggleSidebar={toggleSidebar} 
            userAvatar={userAvatar} 
          />
          <main>
            <div>{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

