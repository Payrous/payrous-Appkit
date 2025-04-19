"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  Calendar,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { calendar_Icon, gas_icon } from "@/assets/icons"
import Image from "next/image"

// Define interfaces for our data structures
interface Recipient {
  id: string
  address: string
  name: string
  amount: string
}

interface BulkRecipientDetail {
  recipientCount: string
  totalAmount: string
  transactionId: string
  recipients: Recipient[]
  tokenType: string
}

interface BulkRecipientDetails {
  [organization: string]: BulkRecipientDetail
}


const Recurring = () => {

  // State for Bulk recipient
  const [bulkOrganization, setBulkOrganization] = useState<string>("")
  const [recipientCount, setRecipientCount] = useState<string>("")
  const [totalAmount, setTotalAmount] = useState<string>("")
  const [tokenType, setTokenType] = useState<string>("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [frequency, setFrequency] = useState<string>("")

  // Dialog 
  const [showViewRecipientsDialog, setShowViewRecipientsDialog] = useState<boolean>(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false)
  const [transactionId, setTransactionId] = useState<string>("")
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [editingRecipient, setEditingRecipient] = useState<Recipient | null>(null)

  const recipientsPerPage = 18
  const totalPages = Math.ceil(recipients.length / recipientsPerPage)

  const isFormValid: boolean =
    bulkOrganization !== "" &&
    startDate !== undefined &&
    endDate !== undefined &&
    frequency !== "" &&
    tokenType !== "" &&
    totalAmount !== ""

  // Sample data for dropdowns
  const organizations: string[] = ["Organization A", "Organization B", "Organization C"]
  const frequencies: string[] = ["Daily", "Weekly", "Bi-Weekly", "Monthly", "Quarterly", "Yearly"]

  // Generate sample recipients
  const generateRecipients = (count: number): Recipient[] => {
    const result: Recipient[] = []
    for (let i = 1; i <= count; i++) {
      result.push({
        id: `id-${i}`,
        address: `0x${Math.random().toString(8).substring(2, 5)}...${Math.random().toString(8).substring(2, 5)}`,
        name: `Recipient ${i}`,
        amount: `${Math.floor(Math.random() * 500) + 50}`,
      })
    }
    return result
  }

  // Bulk recipient data
  const bulkRecipientDetails: BulkRecipientDetails = {
    "Organization A": {
      recipientCount: "500",
      totalAmount: "50000",
      transactionId: "0xbulk1...5678",
      recipients: generateRecipients(500),
      tokenType: "ETH",
    },
    "Organization B": {
      recipientCount: "350",
      totalAmount: "35000",
      transactionId: "0xbulk2...9012",
      recipients: generateRecipients(350),
      tokenType: "USDT",
    },
    "Organization C": {
      recipientCount: "200",
      totalAmount: "20000",
      transactionId: "0xbulk3...3456",
      recipients: generateRecipients(200),
      tokenType: "USDC",
    },
  }

  // Auto-fill bulk fields when organization is selected
  useEffect(() => {
    if (bulkOrganization && bulkRecipientDetails[bulkOrganization]) {
      const details = bulkRecipientDetails[bulkOrganization]
      setRecipientCount(details.recipientCount)
      setTotalAmount(details.totalAmount)
      setTransactionId(details.transactionId)
      setRecipients(details.recipients)
      setTokenType(details.tokenType)
    } else {
      setRecipientCount("")
      setTotalAmount("")
      setTokenType("")
      setRecipients([])
    }
  }, [bulkOrganization])

  const handleSaveClick = (): void => {
    setShowSuccessDialog(true)
  }

  const handleViewRecipients = (): void => {
    setCurrentPage(1)
    setShowViewRecipientsDialog(true)
  }

  const handleEditRecipient = (recipient: Recipient): void => {
    setEditingRecipient({ ...recipient })
  }

  const handleUpdateRecipient = (): void => {
    if (!editingRecipient) return

    const updatedRecipients = recipients.map((r) => (r.id === editingRecipient.id ? editingRecipient : r))

    setRecipients(updatedRecipients)
    setEditingRecipient(null)
  }

  const handleDeleteRecipient = (id: string): void => {
    const updatedRecipients = recipients.filter((r) => r.id !== id)
    setRecipients(updatedRecipients)

    // Update recipient count
    setRecipientCount(updatedRecipients.length.toString())

    // Recalculate total amount
    const newTotalAmount = updatedRecipients
      .reduce((sum, recipient) => sum + Number.parseInt(recipient.amount, 10), 0)
      .toString()
    setTotalAmount(newTotalAmount)

    // Adjust page if needed
    const newTotalPages = Math.ceil(updatedRecipients.length / recipientsPerPage)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
  }

  const getCurrentPageRecipients = (): Recipient[] => {
    const startIndex = (currentPage - 1) * recipientsPerPage
    const endIndex = startIndex + recipientsPerPage
    return recipients.slice(startIndex, endIndex)
  }

  const goToFirstPage = (): void => setCurrentPage(1)
  const goToPreviousPage = (): void => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const goToNextPage = (): void => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const goToLastPage = (): void => setCurrentPage(totalPages)

  return (
    <div className='flex flex-col p-5 md:py-4 md:px-10'>
      <div>
        <div className='flex items-center justify-between'>
          <h1 className='text-colors-BlueGray font-bold font-source text-lg'>Recurring payment</h1>
          <h1 className='text-colors-ButtonOrange font-bold font-source text-lg underline underline-offset-4 decoration-colors-ButtonOrange'>Veiw Recurring List</h1>
        </div>
        <hr className='w-full text-colors-DarkGray pt-10' />
      </div>

      <div className='flex flex-col justify-center h-full items-center top-10'>

        <div className="rounded-lg w-full md:w-[550px] py-2">
          <div className="p-2 bg-colors-BlueGray text-white rounded-lg font-geist text-center">
            <p className="bg-colors-ButtonOrange py-3 rounded-lg ">Bulk Payment</p>
          </div>
        </div>

        <Card className="w-full md:w-[550px]">
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-1">
              <Label htmlFor="bulkOrganization">Select Organization</Label>
              <Select value={bulkOrganization} onValueChange={setBulkOrganization}>
                <SelectTrigger id="bulkOrganization" className={bulkOrganization ? "bg-white border-0 shadow-md" : ""}>
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
              <div className="flex justify-between items-center">
                <Label htmlFor="recipientCount">Number of Recipients</Label>
                {recipientCount && (
                  <span className="text-colors-ButtonOrange font-normal text-xs cursor-pointer" onClick={handleViewRecipients}>
                    View recipients
                  </span>
                )}
              </div>

              <Input
                id="recipientCount"
                value={recipientCount}
                readOnly
                placeholder="Total number of recipient"
              />
              <span className="text-[10px] text-colors-ButtonOrange italic">Auto-generated based on organization</span>
            </div>

            {bulkOrganization && (
              <>
                <div className="space-y-1">
                  <Label htmlFor="tokenType">Token Type</Label>
                  <Input
                    id="tokenType"
                    value={tokenType}
                    onChange={(e) => setTokenType(e.target.value)}
                    placeholder="Enter token type"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="totalAmount">Amount</Label>
                  <Input
                    id="totalAmount"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    placeholder="Overall amount of all recipient"
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="startDate">Start date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full h-12 justify-start text-left font-normal ${!startDate ? "text-muted-foreground" : ""}`}
                    >
                      {startDate ? format(startDate, "dd/MM/yy") : <span>DD/MM/YY</span>}
                      <Image src={calendar_Icon} alt="calender" className="ml-auto" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1">
                <Label htmlFor="endDate">End date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full h-12 justify-start text-left font-normal ${!endDate ? "text-muted-foreground" : ""}`}
                    >
                      {endDate ? format(endDate, " ? format(endDate, 'dd/MM/yy") : <span>DD/MM/YY</span>}
                      <Image src={calendar_Icon} alt="calender" className="ml-auto" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="frequency">Choose Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button
              disabled={!isFormValid}
              className="w-40 pt-3 text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl"
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        {/* View Recipients Dialog */}
        <Dialog open={showViewRecipientsDialog} onOpenChange={setShowViewRecipientsDialog}>
          <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-colors-BlueGray">View Recipients ({recipientCount})</DialogTitle>
              <DialogDescription className=" ">Below are the <span className="text-colors-ButtonOrange">details of recipients</span> in the organization</DialogDescription>
            </DialogHeader>

            {editingRecipient ? (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="editAddress">Wallet Address</Label>
                  <Input
                    id="editAddress"
                    value={editingRecipient.address}
                    onChange={(e) => setEditingRecipient({ ...editingRecipient, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editName">Name</Label>
                  <Input
                    id="editName"
                    value={editingRecipient.name}
                    onChange={(e) => setEditingRecipient({ ...editingRecipient, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editAmount">Amount</Label>
                  <Input
                    id="editAmount"
                    value={editingRecipient.amount}
                    onChange={(e) => setEditingRecipient({ ...editingRecipient, amount: e.target.value })}
                  />

                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingRecipient(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateRecipient}>Save Changes</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-1 py-1">
                  {getCurrentPageRecipients().map((recipient) => (
                    <div key={recipient.id} className="flex items-center gap-0">

                      <div className="flex items-center text-xs gap-1 font-geist">
                        <p className=" truncate" title={recipient.address}>
                          {recipient.address} // 
                        </p>
                        <p className="text-muted-foreground">
                          {recipient.name} // {recipient.amount}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => handleEditRecipient(recipient)}>
                          <Edit className="h-4 w-4 text-colors-ButtonOrange" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteRecipient(recipient.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 0 && (
                  <DialogFooter className="flex items-center justify-center space-x-2">
                    <Button variant="outline" size="icon" onClick={goToFirstPage} disabled={currentPage === 1}>
                      First
                    </Button>
                    <Button variant="outline" size="icon" onClick={goToPreviousPage} disabled={currentPage === 1}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button variant="outline" size="icon" onClick={goToNextPage} disabled={currentPage === totalPages}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={goToLastPage} disabled={currentPage === totalPages}>
                      Last
                    </Button>
                  </DialogFooter>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
              <DialogTitle className="text-xl">Congratulations!</DialogTitle>
              <DialogDescription className="text-center">
                Your payment schedule for <span className="font-bold">{bulkOrganization}</span> has been successfully
                saved.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowSuccessDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

    </div>
  )
}

export default Recurring
