"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import React from 'react'
import { avatar } from "@/assets/images"
import { IoEllipsisHorizontal } from "react-icons/io5"

const organizations = [
    {
        id: "1",
        name: "Confab",
        walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
        tokenType: "Ethereum",
        availableBalance: "1,234ETH",
        numberOfRecipients: "500",
    },
    {
        id: "2",
        name: "Platinum",
        walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
        tokenType: "USDC",
        availableBalance: "5,678.90 USDC",
        numberOfRecipients: "632",
    },
]

interface InlineInputProps {
    label: string
    value: string
    stacked?: boolean
    customStack?: string[]
    isSelect?: boolean
}

const InlineInput = ({ label, value, stacked = false, customStack, isSelect = false }: InlineInputProps) => {

    const labelText = customStack || (stacked ? label.split(" ") : [label])

    return (
        <div className="relative">
            <Input value={value} readOnly className="pl-24 text-colors-BlueGray font-bold" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-colors-BlueGray flex items-center">
                <div className={`${stacked ? "text-xs leading-tight text-left" : ""}`}>
                    {labelText.map((word, index) => (
                        <div key={index} className="">{word}</div>
                    ))}
                </div>
                {!value && !isSelect && <span className="ml-1">-</span>}
            </div>
        </div>
    )
}

interface InlineSelectProps {
    label: string
    stacked?: boolean
    customStack?: string[]
    onValueChange: (value: string) => void
}

const InlineSelect = ({ label, stacked = false, customStack, onValueChange }: InlineSelectProps) => {
    const labelText = customStack || (stacked ? label.split(" ") : [label])

    return (
        <div className="relative">
            <Input readOnly className="pl-24" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-colors-BlueGray text-xs">{label}</div>

            <div className="absolute right-1 top-1/2 w-40 -translate-y-1/2 ">
                <Select onValueChange={onValueChange} >
                    <SelectTrigger className="h-7 min-h-0 px-2 py-1 bg-white border-0 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select Organization" className="text-xs" />
                    </SelectTrigger>
                    <SelectContent className="font-geist">
                        {organizations.map((org) => (
                            <SelectItem key={org.id} value={org.id} className="font-bold font-geist">
                                {org.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}


interface OverveiwOrgCardProps {
    userAvatar?: any 
    userWallet?: string
  }

const OverveiwOrgCard = () => {
    const [selectedOrg, setSelectedOrg] = useState<string | null>(null)

    const selectedOrgData = organizations.find((org) => org.id === selectedOrg)

    return (
        <div>
            <Card className="w-full md:w-[350px] max-h-[440px] bg-colors-WhiteSmoke rounded-xl relative overflow-hidden">
                <div className="absolute top-6 right-6">
                    <IoEllipsisHorizontal className="rotate-90" />
                </div>

                <CardContent className="pt-6 px-4">
                    <div className="text-center mb-4">
                        <div className="mx-auto flex items-center justify-center">
                            <Image src={avatar || "/placeholder.svg"} alt="Avatar" className="" />
                        </div>
                    </div>

                    <div className="space-y-3">

                        <InlineSelect label="Organization" onValueChange={(value) => setSelectedOrg(value)} />

                        <InlineInput label="Wallet address" value={selectedOrgData?.walletAddress || ""} stacked={true} />

                        <InlineInput label="Token type" value={selectedOrgData?.tokenType || ""} stacked={true} />

                        <InlineInput label="Available balance" value={selectedOrgData?.availableBalance || ""} stacked={true} />

                        <InlineInput
                            label="Number of Recipients"
                            value={selectedOrgData?.numberOfRecipients || ""}
                            customStack={["Number of", "recipients"]}
                            stacked={true}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default OverveiwOrgCard
