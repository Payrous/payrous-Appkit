'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle } from 'lucide-react'
import React from 'react'
import { useState, useEffect } from 'react'
import { BsFuelPumpFill } from 'react-icons/bs'
import Image from 'next/image'
import { gas_icon } from '@/assets/icons'
import { success } from '@/assets/images'

interface RecipientDetail {
  walletAddress: string
  tokenType: string
  amount: string
  transactionId: string
}

interface OrganizationRecipients {
  [recipient: string]: RecipientDetail
}

interface RecipientDetails {
  [organization: string]: OrganizationRecipients
}

interface BulkRecipientDetail {
  recipientCount: string
  totalAmount: string
  transactionId: string
}

interface BulkRecipientDetails {
  [organization: string]: BulkRecipientDetail
}

const Instant_payment = () => {
 // Individual recipient state
 const [organization, setOrganization] = useState<string>("")
 const [recipient, setRecipient] = useState<string>("")
 const [walletAddress, setWalletAddress] = useState<string>("")
 const [tokenType, setTokenType] = useState<string>("")
 const [amount, setAmount] = useState<string>("")
 const [remarks, setRemarks] = useState<string>("")

 // Bulk recipient state
 const [bulkOrganization, setBulkOrganization] = useState<string>("")
 const [recipientCount, setRecipientCount] = useState<string>("")
 const [totalAmount, setTotalAmount] = useState<string>("")
 const [bulkRemarks, setBulkRemarks] = useState<string>("")

 // Dialog state
 const [showTransactionDialog, setShowTransactionDialog] = useState<boolean>(false)
 const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false)
 const [isIndividual, setIsIndividual] = useState<boolean>(true)
 const [transactionId, setTransactionId] = useState<string>("")

 const showAdditionalFields: boolean = organization !== "" && recipient !== ""
 const isAccountFormValid: boolean =
   organization !== "" &&
   recipient !== "" &&
   (showAdditionalFields ? walletAddress.trim() !== "" && tokenType.trim() !== "" && amount.trim() !== "" : true)

 const isBulkFormValid: boolean = bulkOrganization !== ""

 // Sample data for dropdowns
 const organizations: string[] = ["Organization A", "Organization B", "Organization C"]
 const recipients: string[] = ["Recipient 1", "Recipient 2", "Recipient 3"]

 // Sample data mapping for auto-filling fields
 const recipientDetails: RecipientDetails = {
   "Organization A": {
     "Recipient 1": {
       walletAddress: "0x1234...5678",
       tokenType: "ETH",
       amount: "100",
       transactionId: "0xbd20...3571",
     },
     "Recipient 2": {
       walletAddress: "0x8765...4321",
       tokenType: "USDT",
       amount: "200",
       transactionId: "0xab12...7890",
     },
     "Recipient 3": {
       walletAddress: "0x2468...1357",
       tokenType: "USDC",
       amount: "300",
       transactionId: "0xcd34...5678",
     },
   },
   "Organization B": {
     "Recipient 1": {
       walletAddress: "0xAAAA...BBBB",
       tokenType: "ETH",
       amount: "150",
       transactionId: "0xef56...9012",
     },
     "Recipient 2": {
       walletAddress: "0xEEEE...FFFF",
       tokenType: "ETH",
       amount: "250",
       transactionId: "0xgh78...3456",
     },
     "Recipient 3": {
       walletAddress: "0x3333...4444",
       tokenType: "0x5555...6666",
       amount: "350",
       transactionId: "0xij90...7890",
     },
   },
   "Organization C": {
     "Recipient 1": {
       walletAddress: "0x7777...8888",
       tokenType: "USDT",
       amount: "175",
       transactionId: "0xkl12...3456",
     },
     "Recipient 2": {
       walletAddress: "0xAA11...BB22",
       tokenType: "USDT",
       amount: "275",
       transactionId: "0xmn34...7890",
     },
     "Recipient 3": {
       walletAddress: "0xEE55...FF66",
       tokenType: "ETH",
       amount: "375",
       transactionId: "0xop56...1234",
     },
   },
 }

 // Bulk recipient data
 const bulkRecipientDetails: BulkRecipientDetails = {
   "Organization A": {
     recipientCount: "15",
     totalAmount: "1500",
     transactionId: "0xbulk1...5678",
   },
   "Organization B": {
     recipientCount: "25",
     totalAmount: "2500",
     transactionId: "0xbulk2...9012",
   },
   "Organization C": {
     recipientCount: "35",
     totalAmount: "3500",
     transactionId: "0xbulk3...3456",
   },
 }

 // Auto-fill fields when organization and recipient are selected
 useEffect(() => {
   if (organization && recipient && recipientDetails[organization]?.[recipient]) {
     const details = recipientDetails[organization][recipient]
     setWalletAddress(details.walletAddress)
     setTokenType(details.tokenType)
     setAmount(details.amount)
     setTransactionId(details.transactionId)
   }
 }, [organization, recipient])

 // Auto-fill bulk fields when organization is selected
 useEffect(() => {
   if (bulkOrganization && bulkRecipientDetails[bulkOrganization]) {
     const details = bulkRecipientDetails[bulkOrganization]
     setRecipientCount(details.recipientCount)
     setTotalAmount(details.totalAmount)
     setTransactionId(details.transactionId)
   } else {
     setRecipientCount("")
     setTotalAmount("")
   }
 }, [bulkOrganization])

 const handlePayClick = (individual: boolean): void => {
   setIsIndividual(individual)
   setShowTransactionDialog(true)
 }

 const handleDecline = (): void => {
   setShowTransactionDialog(false)
 }

 const handleAccept = (): void => {
   setShowTransactionDialog(false)
   setShowSuccessDialog(true)
 }

 const handleRemarksChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
   setRemarks(e.target.value)
 }

 const handleBulkRemarksChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
   setBulkRemarks(e.target.value)
 }


  return (
    <div className='flex flex-col p-5 md:py-4 md:px-10'>
      <div className=''>
        <h1 className='text-colors-BlueGray font-bold font-source text-lg'>Instant payment</h1>
        <hr className='w-full text-colors-DarkGray py-5' />
      </div>

      <div className='flex flex-col justify-center h-full items-center top-10'>
      <Tabs defaultValue="account" className="w-full md:w-[550px]">
        <TabsList className="grid w-full grid-cols-2 bg-colors-BlueGray">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-colors-ButtonOrange data-[state=active]:text-white py-2"
          >
            Individual Recipient
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-colors-ButtonOrange data-[state=active]:text-white py-2"
          >
            Bulk Recipient
          </TabsTrigger>
        </TabsList>

        {/* Individual Recipient Tab */}
        <TabsContent value="account">
          <Card>
            <CardContent className="space-y-2 pt-4">
              <div className="space-y-1">
                <Label htmlFor="organization">Select Organization</Label>
                <Select value={organization} onValueChange={setOrganization}>
                  <SelectTrigger id="organization" className={organization ? "bg-white border-0" : ""}>
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="recipient">Select Recipient</Label>
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger id="recipient" className={recipient ? "bg-white border-0" : ""}>
                    <SelectValue placeholder="Total number of recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipients.map((rec) => (
                      <SelectItem key={rec} value={rec}>
                        {rec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {showAdditionalFields && (
                <>
                  <div className="space-y-1">
                    <Label htmlFor="walletAddress">Wallet Address</Label>
                    <Input
                      id="walletAddress"
                      value={walletAddress}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setWalletAddress(e.target.value)}
                      placeholder="Enter wallet address"
                      readOnly
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="tokenType">Token Type</Label>
                    <Input
                      id="tokenType"
                      value={tokenType}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setTokenType(e.target.value)}
                      placeholder="Enter token type"
                      readOnly
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      readOnly
                    />
                    <span className="flex items-center justify-between">
                    <p className="text-[10px] text-colors-Success font-geist font-bold">Transaction fees: 0.5%</p>
                    <div className="flex items-center gap-1">
                      <Image src={gas_icon} alt="gas"/>
                      <p className="text-[10px] text-colors-ButtonOrange font-geist font-bold">Gwei</p>
                    </div>
                  </span>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <Textarea
                  id="remarks"
                  value={remarks}
                  onChange={handleRemarksChange}
                  placeholder="What's this for?"
                  className="min-h-[80px] resize-none"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                disabled={!isAccountFormValid}
                className="w-40 pt-3 text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl"
                onClick={() => handlePayClick(true)}
              >
                Pay
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Bulk Recipient Tab */}
        <TabsContent value="password">
          <Card>
            <CardContent className="space-y-2 pt-4">
              <div className="space-y-1">
                <Label htmlFor="bulkOrganization">Select Organization</Label>
                <Select value={bulkOrganization} onValueChange={setBulkOrganization}>
                  <SelectTrigger
                    id="bulkOrganization"
                    className={bulkOrganization ? "bg-white border-0 shadow-md" : ""}
                  >
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <div className='flex items-center justify-between'>
                <Label htmlFor="recipientCount">Number of Recipients</Label>
                {recipientCount && (
                    <span className="text-[10px] text-colors-ButtonOrange italic cursor-pointer">View recipients</span>
                  )}
                </div>
                
                <Input
                  id="recipientCount"
                  value={recipientCount}
                  readOnly
                  placeholder=""
                />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[10px] text-colors-ButtonOrange italic">Auto-generated based on organization</span>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="totalAmount">Amount</Label>
                <Input
                  id="totalAmount"
                  value={totalAmount}
                  readOnly
                  placeholder=""
                />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[10px] text-colors-ButtonOrange italic">
                    Auto-generated based on total amount allocated to each recipient
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="bulkRemarks">Remarks (Optional)</Label>
                <Textarea
                  id="bulkRemarks"
                  value={bulkRemarks}
                  onChange={handleBulkRemarksChange}
                  placeholder="What's this for?"
                  className="min-h-[80px] resize-none"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                disabled={!isBulkFormValid}
                className="w-40 pt-3 text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl"
                onClick={() => handlePayClick(false)}
              >
                Pay
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

  
         {/* Transaction Details Dialog */}
         <Dialog open={showTransactionDialog} onOpenChange={setShowTransactionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold text-colors-BlueGray'>Transaction Details</DialogTitle>
            {/* <DialogDescription className='font-normal text-colors-BlueGray font-geist text-lg'>Please review the <span className='text-colors-ButtonOrange'>transaction details</span> before proceeding.</DialogDescription> */}
          </DialogHeader>
          <div className="space-y-3 py-4">
            {isIndividual ? (
              // Individual recipient details
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Organization</div>
                  <div className="col-span-2">{organization}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Recipient</div>
                  <div className="col-span-2">{recipient}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Wallet Address</div>
                  <div className="col-span-2 break-all">{walletAddress}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Token Type</div>
                  <div className="col-span-2 break-all">{tokenType}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Amount</div>
                  <div className="col-span-2">{amount}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Transaction Fee</div>
                  <div className="col-span-2">$1.00</div>
                </div>
                {remarks && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Remark:</div>
                    <div className="col-span-2">{remarks}</div>
                  </div>
                )}
              </>
            ) : (
              // Bulk recipient details
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Organization:</div>
                  <div className="col-span-2">{bulkOrganization}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Recipients:</div>
                  <div className="col-span-2">{recipientCount}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Total Amount:</div>
                  <div className="col-span-2">{totalAmount}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Transaction Fee <span className='text-[10px] text-colors-Success font-medium'>
                   (0.5%)</span></div>
                  <div className="col-span-2">0.5%</div>
                </div>
                {bulkRemarks && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Remarks:</div>
                    <div className="col-span-2">{bulkRemarks}</div>
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="destructive" onClick={handleDecline} type='submit' className='text-white bg-red-600 hover:bg-red-500 shadow-slate-200 px-8 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl font-geist w-full'>
              Decline
            </Button>
            <Button onClick={handleAccept} type='submit' className='text-white bg-colors-Success hover:bg-green-600 shadow-slate-200 px-8 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl font-geist w-full' >
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center">
            <Image src={success} alt='' className="mb-2" />
            <DialogTitle className="text-2xl text-colors-BlueGray font-source font-semibold">Successfull</DialogTitle>
            <DialogDescription className="text-center py-3">
              {isIndividual ? (
                <span className='text-colors-BlueGray font-geist font-normal text-base'>
                  Your transaction to <span className="font-bold">{recipient}</span> was successful with transaction ID{" "}
                  <span className="font-bold">{transactionId}</span>
                </span>
              ) : (
                <span className='text-colors-BlueGray font-geist font-normal text-base'>
                  Your transaction to <span className="font-bold">{bulkOrganization} recipients</span> was successful
                  with transaction ID <span className="font-bold">{transactionId}</span>
                </span>
              )}
            </DialogDescription>
            <span className='underline underline-offset-4 text-colors-LinkColor font-geist font-normal text-sm py-2'>View details on Blockchain explorer</span>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button className="text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-8 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl font-geist w-full" onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>

    </div>
  )
}

export default Instant_payment
