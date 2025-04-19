// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Checkbox } from "@/components/ui/checkbox"
// import { BiEditAlt } from "react-icons/bi"
// import { RiDeleteBin4Line } from "react-icons/ri"
// import { Button } from "@/components/ui/button"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { X, Check } from "lucide-react"
// import {
//     Pagination,
//     PaginationContent,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "./ui/pagination"


// const initialTransactions = [
//     {
//         name: "John Doe",
//         walletAddress: "0x1234...5678",
//         amount: "0.5 ETH",
//     },
//     {
//         name: "Jane Smith",
//         walletAddress: "0x9876...3210",
//         amount: "1.2 ETH",
//     },
//     {
//         name: "Alice Johnson",
//         walletAddress: "0x2468...1357",
//         amount: "0.8 ETH",
//     },
//     {
//         name: "Bob Williams",
//         walletAddress: "0x3690...1478",
//         amount: "2.0 ETH",
//     },
//     {
//         name: "Charlie Brown",
//         walletAddress: "0x7531...9512",
//         amount: "0.3 ETH",
//     },
//     {
//         name: "Diana Prince",
//         walletAddress: "0x1597...5310",
//         amount: "1.5 ETH",
//     },
//     {
//         name: "Ethan Hunt",
//         walletAddress: "0x9876...3210",
//         amount: "1.2 ETH",
//     },
//     {
//         name: "Fiona Gallagher",
//         walletAddress: "0x1597...5311",
//         amount: "1.5 ETH",
//     },
// ]

// const IndividualOrg = () => {
//     const [currentPage, setCurrentPage] = useState(1)
//     const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
//     // const [showAlert, setShowAlert] = useState(true)
//     const [transactions, setTransactions] = useState(initialTransactions)
//     const [editingTransaction, setEditingTransaction] = useState<string | null>(null)
//     const itemsPerPage = 6
//     const totalPages = Math.ceil(transactions.length / itemsPerPage)

//     const handlePageChange = (newPage: number) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setCurrentPage(newPage)
//         }
//     }

//     const startIndex = (currentPage - 1) * itemsPerPage
//     const endIndex = startIndex + itemsPerPage
//     const currentTransactions = transactions.slice(startIndex, endIndex)

//     const handleSelectAll = (checked: boolean) => {
//         if (checked) {
//             setSelectedTransactions(currentTransactions.map((t) => t.walletAddress))
//         } else {
//             setSelectedTransactions([])
//         }
//     }

//     const handleSelectTransaction = (walletAddress: string, checked: boolean) => {
//         if (checked) {
//             setSelectedTransactions([...selectedTransactions, walletAddress])
//         } else {
//             setSelectedTransactions(selectedTransactions.filter((id) => id !== walletAddress))
//         }
//     }

//     const handleEdit = (walletAddress: string) => {
//         setEditingTransaction(walletAddress)
//     }

//     const handleDelete = (walletAddress: string) => {
//         setTransactions(transactions.filter((t) => t.walletAddress !== walletAddress))
//     }

//     const handleSaveEdit = (walletAddress: string, newData: Partial<(typeof transactions)[0]>) => {
//         setTransactions(transactions.map((t) => (t.walletAddress === walletAddress ? { ...t, ...newData } : t)))
//         setEditingTransaction(null)
//     }
//     return (
//         <div className="">
//             {/* {showAlert && (
//                 <Alert className="bg-green-100 border-green-400 text-green-700 w-full mb-4">
//                     <div className="flex items-center">
//                         <Check className="h-4 w-4 mr-2" />
//                         <AlertDescription>Success! Recipients added successfully.</AlertDescription>
//                     </div>
//                     <Button
//                         className="absolute top-2 right-2 text-green-700 hover:text-green-900"
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setShowAlert(false)}
//                     >
//                         <X className="h-4 w-4" />
//                     </Button>
//                 </Alert>
//             )} */}
//             <div className="overflow-x-auto">
//                 <Table className="min-w-full">
//                     <TableHeader>
//                         <TableRow className="">
//                             <TableHead className="min-w-[200px] text-colors-BlueGray font-bold font-source text-sm ml-2">
//                                 <div className="flex items-center space-x-2">
//                                     <Checkbox
//                                         id="select-all"
//                                         checked={
//                                             currentTransactions.length > 0 && selectedTransactions.length === currentTransactions.length
//                                         }
//                                         onCheckedChange={handleSelectAll}
//                                     />
//                                     <label htmlFor="select-all">Name</label>
//                                 </div>
//                             </TableHead>
//                             <TableHead className="min-w-[200px] text-colors-BlueGray font-bold font-source text-sm">
//                                 Wallet Address
//                             </TableHead>
//                             <TableHead className="min-w-[200px] text-colors-BlueGray font-bold font-source text-sm">Amount</TableHead>
//                             <TableHead className="min-w-[00px] text-colors-BlueGray font-bold font-source text-sm "><span className="ml-4">Status</span></TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {currentTransactions.map((transaction) => (
//                             <TableRow key={transaction.walletAddress}>
//                                 <TableCell>
//                                     <div className="flex items-center space-x-2">
//                                         <Checkbox
//                                             id={`checkbox-${transaction.walletAddress}`}
//                                             checked={selectedTransactions.includes(transaction.walletAddress)}
//                                             onCheckedChange={(checked) =>
//                                                 handleSelectTransaction(transaction.walletAddress, checked as boolean)
//                                             }
//                                         />
//                                         <label htmlFor={`checkbox-${transaction.walletAddress}`}>
//                                             {editingTransaction === transaction.walletAddress ? (
//                                                 <input
//                                                     type="text"
//                                                     defaultValue={transaction.name}
//                                                     onBlur={(e) => handleSaveEdit(transaction.walletAddress, { name: e.target.value })}
//                                                 />
//                                             ) : (
//                                                 transaction.name
//                                             )}
//                                         </label>
//                                     </div>
//                                 </TableCell>
//                                 <TableCell>
//                                     {editingTransaction === transaction.walletAddress ? (
//                                         <input
//                                             type="text"
//                                             defaultValue={transaction.walletAddress}
//                                             onBlur={(e) => handleSaveEdit(transaction.walletAddress, { walletAddress: e.target.value })}
//                                         />
//                                     ) : (
//                                         transaction.walletAddress
//                                     )}
//                                 </TableCell>
//                                 <TableCell>
//                                     {editingTransaction === transaction.walletAddress ? (
//                                         <input
//                                             type="text"
//                                             defaultValue={transaction.amount}
//                                             onBlur={(e) => handleSaveEdit(transaction.walletAddress, { amount: e.target.value })}
//                                         />
//                                     ) : (
//                                         transaction.amount
//                                     )}
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="flex items-center">
//                                         <Button variant="ghost" size="icon" onClick={() => handleEdit(transaction.walletAddress)}>
//                                             <BiEditAlt className="h-4 w-4 text-yellow-600" />
//                                         </Button>
//                                         <Button variant="ghost" size="icon" onClick={() => handleDelete(transaction.walletAddress)}>
//                                             <RiDeleteBin4Line className="h-4 w-4 text-red-600" />
//                                         </Button>
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </div>
//             <div className="flex justify-center items-center md:justify-end mt-5 ">
//                 <Pagination className="cursor-pointer">
//                     <PaginationContent>
//                         <PaginationItem>
//                             <PaginationPrevious
//                                 className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
//                                 onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
//                             />
//                         </PaginationItem>
//                         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                             <PaginationItem key={page}>
//                                 <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page}>
//                                     {page}
//                                 </PaginationLink>
//                             </PaginationItem>
//                         ))}
//                         <PaginationItem>
//                             <PaginationNext
//                                 className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
//                                 onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
//                             />
//                         </PaginationItem>
//                     </PaginationContent>
//                 </Pagination>
//             </div>
//         </div>
//     )
// }

// export default IndividualOrg


"use client"

import { useState } from "react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { BiEditAlt } from "react-icons/bi"
import { RiDeleteBin4Line } from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import { deleteIcon } from "@/assets/images"

const initialTransactions = [
  {
    name: "Bethan-Helen",
    walletAddress: "0x606.....522718a",
    amount: "$2.OO",
  },
  {
    name: "Jane Smith",
    walletAddress: "0x606.....522748a",
    amount: "1.2 ETH",
  },
  {
    name: "Alice Johnson",
    walletAddress: "0x246.....135734b",
    amount: "0.8 ETH",
  },
  {
    name: "Bob Williams",
    walletAddress: "0x3690...1478",
    amount: "2.0 ETH",
  },
  {
    name: "Charlie Brown",
    walletAddress: "0x7531...9512",
    amount: "0.3 ETH",
  },
  {
    name: "Diana Prince",
    walletAddress: "0x1597...5310",
    amount: "1.5 ETH",
  },
  {
    name: "Ethan Hunt",
    walletAddress: "0x9876...3210",
    amount: "1.2 ETH",
  },
  {
    name: "Fiona Gallagher",
    walletAddress: "0x1597...5311",
    amount: "1.5 ETH",
  },
]

const IndividualOrg = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [transactions, setTransactions] = useState(initialTransactions)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editedTransaction, setEditedTransaction] = useState<any>(null)
  const itemsPerPage = 6
  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const [editingTransaction, setEditingTransaction] = useState<any>(null)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleSelectTransaction = (walletAddress: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, walletAddress])
    } else {
      setSelectedTransactions(selectedTransactions.filter((id) => id !== walletAddress))
    }
  }

  const handleEdit = (transaction: any) => {
    setEditedTransaction({ ...transaction })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (transaction: any) => {
    setEditedTransaction(transaction)
    setIsDeleteDialogOpen(true)
  }

  const handleUpdateTransaction = () => {
    setTransactions(
      transactions.map((t) => (t.walletAddress === editedTransaction.walletAddress ? editedTransaction : t)),
    )
    setIsEditDialogOpen(false)
    toast({
      title: "Transaction Updated",
      description: "The recipient details have been successfully updated.",
    })
  }

  const handleDeleteConfirm = () => {
    setTransactions(transactions.filter((t) => t.walletAddress !== editedTransaction.walletAddress))
    setIsDeleteDialogOpen(false)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = currentTransactions.map((t) => t.walletAddress)
      setSelectedTransactions(newSelected)
      toast({
        title: `${newSelected.length} items selected`,
        description: (
          <div className="flex items-center justify-between mt-2">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setSelectedTransactions([])}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteAll}>
                Delete all
              </Button>
            </div>
          </div>
        ),
        duration: 5000,
      })
    } else {
      setSelectedTransactions([])
    }
  }

  const handleDeleteAll = () => {
    setTransactions(transactions.filter((t) => !selectedTransactions.includes(t.walletAddress)))
    setSelectedTransactions([])
    toast({
      title: "Deleted",
      description: `${selectedTransactions.length} items have been deleted.`,
    })
  }

  const handleSaveEdit = (walletAddress: string, changes: Partial<(typeof initialTransactions)[0]>) => {
    setTransactions(
      transactions.map((t) => {
        if (t.walletAddress === walletAddress) {
          return { ...t, ...changes }
        }
        return t
      }),
    )
    setEditingTransaction(null)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = transactions.slice(startIndex, endIndex)

  return (
    <div className="">
      <div className="overflow-x-auto">
        <Table className="min-w-[800px] lg:min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%] text-colors-BlueGray font-bold font-source text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={
                      currentTransactions.length > 0 && selectedTransactions.length === currentTransactions.length
                    }
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all">Name</label>
                </div>
              </TableHead>
              <TableHead className="[30%] text-colors-BlueGray font-bold font-source text-sm">Wallet Address</TableHead>
              <TableHead className="w-[30%] text-colors-BlueGray font-bold font-source text-sm">Amount</TableHead>
              <TableHead className="w-[10%] text-right right-6 text-colors-BlueGray font-bold font-source text-sm">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTransactions.map((transaction) => (
              <TableRow key={transaction.walletAddress}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`checkbox-${transaction.walletAddress}`}
                      checked={selectedTransactions.includes(transaction.walletAddress)}
                      onCheckedChange={(checked) =>
                        handleSelectTransaction(transaction.walletAddress, checked as boolean)
                      }
                    />
                    <label htmlFor={`checkbox-${transaction.walletAddress}`}>{transaction.name}</label>
                  </div>
                </TableCell>
                <TableCell>{transaction.walletAddress}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell className="text-right right-5">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(transaction)}>
                    <BiEditAlt className="h-4 w-4 text-yellow-600" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(transaction)}>
                    <RiDeleteBin4Line className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="px-5 lg:px-8">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-colors-BlueGray font-source">Edit Recipient</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="wallet" className="text-colors-BlueGray font-geist text-sm font-normal">Wallet address</Label>
              <Input
                id="wallet"
                value={editedTransaction?.walletAddress || ""}
                onChange={(e) => setEditedTransaction({ ...editedTransaction, walletAddress: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-colors-BlueGray font-geist text-sm font-normal">Recipient name <span className="text-colors-DarkGray italic font-geist ">(optional)</span></Label>
              <Input
                id="name"
                value={editedTransaction?.name || ""}
                onChange={(e) => setEditedTransaction({ ...editedTransaction, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-colors-BlueGray font-geist text-sm font-normal">Amount <span className="text-colors-DarkGray italic font-geist ">(optional)</span></Label>
              <div className="relative">
                <Input
                  id="amount"
                  value={editedTransaction?.amount || ""}
                  onChange={(e) => setEditedTransaction({ ...editedTransaction, amount: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-sm text-colors-DarkGray">
                    <div>2 USDC</div>
                    <div>$2.00</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button onClick={handleUpdateTransaction} className="text-white bg-[#D98837] hover:bg-orange-300 shadow-slate-200 px-8 py-7 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl font-geist w-full">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="">
          <div className="flex flex-col items-center text-center text-colors-BlueGray pt-16">
            <Image src={deleteIcon} alt="Delete" width={64} height={64} />
            <p className="mt-4 w-64 font-source font-bold text-2xl">Are you sure you want to delete recipient?</p>
            <p className="py-4 font-geist text-colors-BlueGray text-base font-normal">"{editedTransaction?.name}"</p>
          </div>
          <DialogFooter className="sm:justify-center flex flex-col lg:flex-row gap-4 lg:gap-2 pb-16">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="text-colors-BlueGray shadow-slate-200 px-5 py-6 border border-colors-BlueGray rounded-xl font-geist w-full lg:w-40">
              Cancel
            </Button >
            <Button variant="destructive" onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl font-geist w-full lg:w-40">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex justify-center items-center md:justify-end mt-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default IndividualOrg


