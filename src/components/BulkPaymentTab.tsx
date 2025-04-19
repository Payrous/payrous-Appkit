"use client"

import type React from "react"

import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from "react"
import { Check, X, Upload, FileText, AlertCircle, Fuel, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { coin } from "@/data/coin"
import Image from "next/image"
import { checkmark, delete_icon, gas_icon } from "@/assets/icons"
import { PiWarningFill } from "react-icons/pi"
import { CgClose } from "react-icons/cg"
import { document_icon } from "@/assets/icons"

interface TokenOption {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

interface Recipient {
  id: number
  name: string
  wallet: string
  amount: string
}



const BulkPaymentTab = () => {
  // Form states
  const [individualForm, setIndividualForm] = useState({
    recipient: "",
    walletAddress: "",
    tokenType: "",
    amount: "",
    remark: "",
    importToken: false,
  })

  const [bulkForm, setBulkForm] = useState({
    file: null as File | null,
    uploadProgress: 0,
    uploadComplete: false,
    amount: "",
    remark: "",
    importToken: false,
    tokenType: "",
  })

  // Dialog states
  const [showTransactionDialog, setShowTransactionDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [showRecipientsDialog, setShowRecipientsDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("individual")

  // Pagination for recipients view
  const [currentPage, setCurrentPage] = useState(1)
  const recipientsPerPage = 5

  // Mock recipients data (in a real app, this would be parsed from the file)
  const mockRecipients: Recipient[] = [
    { id: 1, name: "John Doe", wallet: "0x1234...5678", amount: "0.5" },
    { id: 2, name: "Jane Smith", wallet: "0x8765...4321", amount: "1.2" },
    { id: 3, name: "Alice Johnson", wallet: "0xabcd...efgh", amount: "0.75" },
    { id: 4, name: "Bob Williams", wallet: "0xijkl...mnop", amount: "2.0" },
    { id: 5, name: "Charlie Brown", wallet: "0xqrst...uvwx", amount: "0.3" },
    { id: 6, name: "Dave Miller", wallet: "0x2468...1357", amount: "1.5" },
    { id: 7, name: "Eve Davis", wallet: "0x9876...5432", amount: "0.8" },
    { id: 8, name: "Frank Wilson", wallet: "0xyzab...cdef", amount: "1.1" },
    { id: 9, name: "Grace Lee", wallet: "0xghij...klmn", amount: "0.9" },
    { id: 10, name: "Harry Taylor", wallet: "0xopqr...stuv", amount: "1.7" },
    { id: 11, name: "Ivy Martin", wallet: "0x1357...2468", amount: "0.6" },
    { id: 12, name: "Jack White", wallet: "0xwxyz...abcd", amount: "1.4" },
  ]

  // Calculate pagination
  const indexOfLastRecipient = currentPage * recipientsPerPage
  const indexOfFirstRecipient = indexOfLastRecipient - recipientsPerPage
  const currentRecipients = mockRecipients.slice(indexOfFirstRecipient, indexOfLastRecipient)
  const totalPages = Math.ceil(mockRecipients.length / recipientsPerPage)

  // File upload ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Token select state
  const [isTokenImport, setIsTokenImport] = useState(false)
  const [selected, setSelected] = useState<string>("")

  const handleTokenImport = (checked: boolean) => {
    setIsTokenImport(checked)
    if (checked) {
      setSelected("")
    }
  }


  // const tokenOptions: TokenOption[] = [
  //   {
  //     id: "eth",
  //     icon: (
  //       <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">Ξ</div>
  //     ),
  //     title: "ETH",
  //     description: "Ethereum",
  //   },
  //   {
  //     id: "btc",
  //     icon: (
  //       <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">₿</div>
  //     ),
  //     title: "BTC",
  //     description: "Bitcoin",
  //   },
  //   {
  //     id: "usdt",
  //     icon: (
  //       <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">T</div>
  //     ),
  //     title: "USDT",
  //     description: "Tether",
  //   },
  // ]

  // Handle individual form changes
  const handleIndividualChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setIndividualForm({
      ...individualForm,
      [name]: value,
    })
  }

  // Handle token import checkbox
  const [tokenAddress, setTokenAddress] = useState("")
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const validateTokenAddress = (address: string) => {
    return address.startsWith("0x") && address.length === 42
  }

  useEffect(() => {
    setIsButtonEnabled(selected !== "" || (isTokenImport && tokenAddress !== ""))
  }, [selected, isTokenImport, tokenAddress])


  // const handleImportTokenChange = (checked: boolean, formType: "individual" | "bulk") => {
  //   if (formType === "individual") {
  //     setIndividualForm({
  //       ...individualForm,
  //       importToken: checked,
  //       tokenType: checked ? "" : individualForm.tokenType,
  //     })
  //   } else {
  //     setBulkForm({
  //       ...bulkForm,
  //       importToken: checked,
  //       tokenType: checked ? "" : bulkForm.tokenType,
  //     })
  //   }
  // }

  // Handle bulk form changes
  const handleBulkChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBulkForm({
      ...bulkForm,
      [name]: value,
    })
  }

  // Handle file selection
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setBulkForm({
        ...bulkForm,
        file,
        uploadProgress: 0,
        uploadComplete: false,
      })

      // Simulate file upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setBulkForm((prev) => ({
          ...prev,
          uploadProgress: progress,
        }))

        if (progress >= 100) {
          clearInterval(interval)
          setBulkForm((prev) => ({
            ...prev,
            uploadComplete: true,
          }))
        }
      }, 300)
    }
  }

  // Handle file drop
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setBulkForm({
        ...bulkForm,
        file,
        uploadProgress: 0,
        uploadComplete: false,
      })

      // Simulate file upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setBulkForm((prev) => ({
          ...prev,
          uploadProgress: progress,
        }))

        if (progress >= 100) {
          clearInterval(interval)
          setBulkForm((prev) => ({
            ...prev,
            uploadComplete: true,
          }))
        }
      }, 300)
    }
  }

  // Handle file drag over
  const handleFileDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  // Handle file removal
  const handleFileRemove = () => {
    setBulkForm({
      ...bulkForm,
      file: null,
      uploadProgress: 0,
      uploadComplete: false,
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Check if individual form is valid
  const isIndividualFormValid = () => {
    return (
      individualForm.recipient.trim() !== "" &&
      individualForm.walletAddress.trim() !== "" &&
      (individualForm.importToken || individualForm.tokenType !== "") &&
      individualForm.amount.trim() !== ""
    )
  }

  // Check if bulk form is valid
  const isBulkFormValid = () => {
    return (
      bulkForm.file !== null &&
      bulkForm.uploadComplete &&
      (bulkForm.importToken || bulkForm.tokenType !== "") &&
      bulkForm.amount.trim() !== ""
    )
  }

  // Handle individual payment submission
  const handleIndividualSubmit = (e: FormEvent) => {
    e.preventDefault()
    setActiveTab("individual")
    setShowTransactionDialog(true)
  }

  // Handle bulk payment submission
  const handleBulkSubmit = (e: FormEvent) => {
    e.preventDefault()
    setActiveTab("bulk")
    setShowTransactionDialog(true)
  }

  // Handle transaction confirmation
  const handleConfirmTransaction = () => {
    setShowTransactionDialog(false)
    setShowSuccessDialog(true)
    setShowRecipientsDialog(false) // Ensure recipients dialog is closed
  }

  // Handle dialog close
  const handleCloseDialog = () => {
    setShowTransactionDialog(false)
    setShowSuccessDialog(false)
    setShowRecipientsDialog(false)
  }

  // Handle pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const openRecipientsDialog = () => {
    setShowRecipientsDialog(true)
    setShowTransactionDialog(false) // Ensure transaction dialog is closed
    setShowSuccessDialog(false) // Ensure success dialog is closed
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs defaultValue="individual" className="w-full lg:w-[480px]" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 h-16 bg-colors-BlueGray">
          <TabsTrigger value="individual" className="data-[state=active]:lg:w-[224px] data-[state=active]:h-[48px] data-[state=active]:bg-colors-ButtonOrange data-[state=active]:text-colors-OffWhite ml-2">
            Individual Recipient
          </TabsTrigger>
          <TabsTrigger value="bulk" className="data-[state=active]:lg:w-[224px] data-[state=active]:h-[48px] data-[state=active]:bg-colors-ButtonOrange data-[state=active]:text-colors-OffWhite">
            Bulk Recipient
          </TabsTrigger>
        </TabsList>

        {/* Individual Recipient Tab */}
        <TabsContent value="individual" className="border-none">
          <Card className="border-none shadow-none">
            <CardContent className="pt-6 space-y-4">
              <form onSubmit={handleIndividualSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input
                      id="recipient"
                      name="recipient"
                      placeholder="Enter recipient"
                      value={individualForm.recipient}
                      onChange={handleIndividualChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="walletAddress">Wallet Address</Label>
                    <Input
                      id="walletAddress"
                      name="walletAddress"
                      placeholder="Enter wallet address"
                      value={individualForm.walletAddress}
                      onChange={handleIndividualChange}
                      required
                    />
                  </div>

                  {/* //import token coin */}

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

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      name="amount"
                      placeholder="Enter amount"
                      value={individualForm.amount}
                      onChange={handleIndividualChange}
                      required
                    />
                    <span className="flex items-center justify-between">
                      <p className="text-[10px] text-colors-Success font-geist font-bold">Transaction fees: 0.5%</p>
                      <div className="flex items-center gap-1">
                        <Image src={gas_icon} alt="gas" />
                        <p className="text-[10px] text-colors-ButtonOrange font-geist font-bold">Gwei</p>
                      </div>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 py-2">
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

                <div className="space-y-2 pt-3">
                  <Label htmlFor="remark">Remark (optional)</Label>
                  <Textarea
                    id="remark"
                    name="remark"
                    placeholder="What's this for?"
                    className="min-h-[100px]"
                    value={individualForm.remark}
                    onChange={handleIndividualChange}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="w-40 text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl" disabled={!isButtonEnabled} onClick={handleIndividualSubmit}>
                    Pay
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>


        {/* Bulk Recipient Tab */}
        <TabsContent value="bulk" className="border-none">
          <Card className="border-none shadow-none">
            <CardContent className="pt-6 space-y-4">
              {showAlert && (
                <Alert className="bg-colors-YellowWarnbg text-colors-BlueGray flex items-center justify-between text-center border-2 border-yellow-400 shadow-sm">
                  <div className='flex items-center gap-1 lg:gap-3'>
                    <PiWarningFill className="h-6 w-6 text-yellow-400" />
                    <div className="flex-1">
                      <AlertTitle className="text-colors-BlueGray font-normal font-geist text-sm">It is important to follow the same format as wrongly formatted files will not be processed </AlertTitle>
                      <AlertDescription className='text-colors-BlueGray text-sm font-bold font-geist'>Maximum of 700 recipients</AlertDescription>
                    </div>
                  </div>

                  <Button variant="ghost" className="h-6 w-6 p-0" onClick={() => setShowAlert(false)}>
                    <CgClose className='w-4 h-4 text-colors-BlueGray absolute top-2 right-2' />
                  </Button>
                </Alert>
              )}

              <form onSubmit={handleBulkSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="fileUpload">Upload Support Document</Label>
                      {bulkForm.file && bulkForm.uploadComplete && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-xs text-colors-ButtonOrange hover:text-orange-300 cursor-pointer no-underline"
                          onClick={openRecipientsDialog}
                        >
                          View recipients
                        </Button>
                      )}
                    </div>
                    <input
                      type="file"
                      id="fileUpload"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".csv,.json"
                    />

                    {!bulkForm.file ? (
                      <div
                        className="border-2 border-dashed border-green-500 bg-colors-LightGreen bg-opacity-45 rounded-md p-8 flex flex-col md:flex-row items-center justify-center gap-5 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleFileDragOver}
                        onDrop={handleFileDrop}
                      >
                        <Upload className="h-8 w-8 text-green-500 mb-2" />
                        <div className="text-center">
                          <p className="text-sm font-medium">Upload, Drag or drop document</p>
                          <p className="text-xs text-muted-foreground">Supported Format: CSV, JSON</p></div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="border-2 border-solid bg-colors-LightGreen bg-opacity-40 w-full lg:w-[470px] h-[88px] rounded-md p-4">
                          <div className="bg-colors-BlueGray rounded-xl p-3 flex px-6 items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Image src={document_icon} alt="document" />
                              <span className="text-sm text-white font-geist font-normal">{bulkForm.file.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleFileRemove} className="h-6 w-6">
                              <Image src={delete_icon} alt="delete" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-1 py-1">
                          {bulkForm.uploadComplete && (
                            <div className="flex items-center gap-1 text-sm text-colors-LinkColor">
                              <Image src={checkmark} alt="checkmark" />
                              <p className="text-colors-BlueGray">100% <span className="text-[8px]">completed</span></p>
                            </div>
                          )}
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-colors-LinkColor h-2 rounded-full"
                              style={{ width: `${bulkForm.uploadProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <div className="space-y-2">
                  <Label htmlFor="bulkTokenType">Token Type</Label>
                  <Select
                    disabled={bulkForm.importToken}
                    onValueChange={(value) => setBulkForm({ ...bulkForm, tokenType: value })}
                    value={bulkForm.tokenType}
                  >
                    <SelectTrigger className={bulkForm.importToken ? "blur-[1px] cursor-not-allowed" : ""}>
                      {bulkForm.tokenType ? (
                        <div className="flex items-center gap-2">
                          {tokenOptions.find((t) => t.id === bulkForm.tokenType)?.icon}
                          <span>{tokenOptions.find((t) => t.id === bulkForm.tokenType)?.title}</span>
                        </div>
                      ) : (
                        <SelectValue placeholder="Select Tokens" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {tokenOptions.map((token) => (
                        <SelectItem key={token.id} value={token.id}>
                          <div className="flex items-center gap-2">
                            {token.icon}
                            <div className="flex flex-col">
                              <p className="font-medium">{token.title}</p>
                              <p className="text-xs text-muted-foreground">{token.description}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}

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

                  <div className="space-y-2">
                    <Label htmlFor="bulkAmount">Amount</Label>
                    <Input
                      id="bulkAmount"
                      name="amount"
                      placeholder="Enter amount"
                      value={bulkForm.amount}
                      onChange={handleBulkChange}
                      required
                    />
                    <span className="flex items-center justify-between">
                      <p className="text-[10px] text-colors-Success font-geist font-bold">Transaction fees: 0.5%</p>
                      <div className="flex items-center gap-1">
                        <Image src={gas_icon} alt="gas" />
                        <p className="text-[10px] text-colors-ButtonOrange font-geist font-bold">Gwei</p>
                      </div>
                    </span>
                  </div>

                  {/* <div className="flex items-start space-x-2">
                    <Checkbox
                      id="bulkImportToken"
                      checked={bulkForm.importToken}
                      onCheckedChange={(checked) => handleImportTokenChange(checked as boolean, "bulk")}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="bulkImportToken"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Token not available click here to import tokens
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Note only ERC20 tokens and native cryptocurrency allowed
                      </p>
                    </div>
                  </div> */}

                  <div className="flex items-center space-x-2 py-2">
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

                <div className="space-y-2 pt-2">
                  <Label htmlFor="bulkRemark">Remark (optional)</Label>
                  <Textarea
                    id="bulkRemark"
                    name="remark"
                    placeholder="What's this for?"
                    className="min-h-[100px]"
                    value={bulkForm.remark}
                    onChange={handleBulkChange}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="w-40 text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl" disabled={!isBulkFormValid()}>
                    Pay
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Details Dialog */}
      <Dialog open={showTransactionDialog} onOpenChange={setShowTransactionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Please review your transaction details before confirming.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Individual transaction details */}
            {activeTab === "individual" && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipient:</span>
                  <span className="font-medium">{individualForm.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wallet Address:</span>
                  <span className="font-medium">{individualForm.walletAddress}</span>
                </div>
                {/* <div className="flex justify-between">
              <span className="text-muted-foreground">Token Type:</span>
              <span className="font-medium">
                {individualForm.importToken
                  ? "Custom Token"
                  : tokenOptions.find((t) => t.id === individualForm.tokenType)?.title || ""}
              </span>
            </div> */}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{individualForm.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Gas Fees:</span>
                  <span>gwei</span>
                  <span className="font-medium">
                    {individualForm.amount
                      ? (Number.parseFloat(individualForm.amount) * 0.0000001).toFixed(8)
                      : "0.000000"}{" "}
                    gwei
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Transaction Fee (<span className="text-green-500">0.5%</span>):
                  </span>
                  <span className="font-medium">
                    ${individualForm.amount ? (Number.parseFloat(individualForm.amount) * 0.005).toFixed(2) : "0.00"}
                  </span>
                </div>
                {individualForm.remark && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remark:</span>
                    <span className="font-medium">{individualForm.remark}</span>
                  </div>
                )}
              </>
            )}

            {/* Bulk transaction details */}
            {activeTab === "bulk" && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Recipients:</span>
                  <span className="font-medium">{mockRecipients.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Type:</span>
                  {/* <span className="font-medium">
                {bulkForm.importToken
                  ? "Custom Token"
                  : tokenOptions.find((t) => t.id === bulkForm.tokenType)?.title || ""}
              </span> */}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount per Recipient:</span>
                  <span className="font-medium">{bulkForm.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Gas Fees:</span>
                  <span className="font-medium">
                    {bulkForm.amount
                      ? (Number.parseFloat(bulkForm.amount) * mockRecipients.length * 0.0000001).toFixed(8)
                      : "0.000000"}{" "}
                    gwei
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Transaction Fee (<span className="text-green-500">0.5%</span>):
                  </span>
                  <span className="font-medium">
                    $
                    {bulkForm.amount
                      ? (Number.parseFloat(bulkForm.amount) * mockRecipients.length * 0.005).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                {bulkForm.remark && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remark:</span>
                    <span className="font-medium">{bulkForm.remark}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog} className="bg-white">
              Decline
            </Button>
            <Button onClick={handleConfirmTransaction}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center">Successful</h2>
            <p className="text-center">
              Your transaction to{" "}
              <span className="font-bold">
                {activeTab === "individual" ? individualForm.recipient : "Multiple Recipients"}
              </span>{" "}
              was successful with transaction ID <span className="font-bold">0xbd20....3571</span>
            </p>
            <Button onClick={handleCloseDialog} className="mt-4">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recipients Dialog */}
      <Dialog open={showRecipientsDialog} onOpenChange={setShowRecipientsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Recipients List</DialogTitle>
            <DialogDescription>View all recipients from your uploaded file.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-2">
              {currentRecipients.map((recipient, index) => (
                <div key={recipient.id} className="flex items-center justify-between">
                  <span className="truncate max-w-[250px]">{recipient.wallet}</span>
                  <span className="truncate max-w-[100px]">{recipient.name}</span>
                  <span>{(indexOfFirstRecipient + index + 1).toString()}</span>
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextPage} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div >
  )
}

export default BulkPaymentTab
