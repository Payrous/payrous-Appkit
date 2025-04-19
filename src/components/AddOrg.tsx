"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { HiOutlinePlusSm } from "react-icons/hi"
import { coin } from "@/data/coin"
import successIcon from "@/assets/images/success.svg"

const AddOrg = () => {
  const [showCongrats, setShowCongrats] = useState(false)
  const [showCreateProfile, setShowCreateProfile] = useState(false)
  const [selected, setSelected] = useState<string>("")
  const [isTokenImport, setIsTokenImport] = useState(false)
  const [tokenAddress, setTokenAddress] = useState("")
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  useEffect(() => {
    setIsButtonEnabled(selected !== "" || (isTokenImport && tokenAddress !== ""))
  }, [selected, isTokenImport, tokenAddress])

  const handleSaveChanges = () => {
    setShowCongrats(true)
    setShowCreateProfile(false)
  }

  const handleTokenImport = (checked: boolean) => {
    setIsTokenImport(checked)
    if (checked) {
      setSelected("")
    }
  }

  const validateTokenAddress = (address: string) => {
    // Implementation for token address
    // the return statement here is just an example of the things the ta must entail before button is clickable
    return address.startsWith("0x") && address.length === 42
  }

  return (
    <div>
      <Dialog open={showCreateProfile} onOpenChange={setShowCreateProfile}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border border-colors-ButtonOrange text-colors-ButtonOrange hover:text-colors-ButtonOrange hover:shadow-sm flex items-center gap-2 hover:bg-colors-OffWhite bg-colors-WhiteSmoke py-5 rounded-xl font-semibold font-geist"
          >
            Add Organization
            <span className="border border-colors-ButtonOrange rounded-md ">
              <HiOutlinePlusSm size={5} />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="text-colors-BlueGray">
            <DialogTitle className="text-lg font-source">Create Organization</DialogTitle>
            <DialogDescription className="text-colors-BlueGray">
              Please enter the <span className="text-colors-ButtonOrange">details of your organization</span> in the
              fields below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-colors-BlueGray">
            <div className="grid gap-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" placeholder="Enter organization name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Token type</Label>
              <Select disabled={isTokenImport} onValueChange={(value) => setSelected(value)}>
                <SelectTrigger id="role" className="bg-white data-[state=open]:bg-white">
                  <SelectValue placeholder="Select token type" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-hidden">
                  {coin.map((item) => (
                    <SelectItem key={item.id} value={item.valueInput}>
                      <div className="flex items-center gap-2">
                        <Image src={item.image || "/placeholder.svg"} alt="" width={20} height={20} />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          {selected !== item.valueInput && (
                            <div className="text-xs text-muted-foreground">{item.desc}</div>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onCheckedChange={handleTokenImport} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Token not available click here to import tokens
                </label>
                <p className="text-[10px] text-colors-Warning italic">
                  Note only ERC20 tokens and native cryptocurrency allowed
                </p>
              </div>
            </div>
            {isTokenImport && (
              <div className="grid gap-2">
                <Label htmlFor="token-address">Token Address</Label>
                <Input
                  id="token-address"
                  placeholder="Enter token address"
                  value={tokenAddress}
                  onChange={(e) => {
                    setTokenAddress(e.target.value)
                    setIsButtonEnabled(validateTokenAddress(e.target.value))
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl"
              onClick={handleSaveChanges}
              disabled={!isButtonEnabled}
            >
              Save
            </Button>
          </DialogFooter>
          <DialogClose className="absolute right-4 top-4 rounded-full border stroke-colors-BlueGray ">
            <span className="sr-only stroke-colors-BlueGray">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <DialogContent className="sm:max-w-[425px] text-center py-14 flex flex-col justify-center gap-8">
          <DialogHeader className="text-colors-BlueGray ">
            <div className="flex flex-col items-center gap-2">
              <Image src={successIcon || "/placeholder.svg"} alt="Success" />
              <DialogTitle>Congratulations!</DialogTitle>
            </div>
            <DialogDescription className="text-colors-BlueGray text-center py-4">
              Your organization is created successfully
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowCongrats(false)}
              className="w-full text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddOrg


