'use client'
import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { FileIcon, CheckCircle, X } from "lucide-react"
import { HiOutlinePlusSm } from 'react-icons/hi'
import { PiWarningFill } from "react-icons/pi";
import { CgClose } from 'react-icons/cg'

const AddRecipient = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [token, setToken] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showAlert, setShowAlert] = useState(true)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    setFile(droppedFile)
    simulateUpload()
  }

  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  const isAccountFormValid = name !== "" && username !== ""
  const isPasswordFormValid = currentPassword !== "" && newPassword !== "" && file !== null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='border border-colors-ButtonOrange text-colors-ButtonOrange hover:text-colors-ButtonOrange hover:shadow-sm flex items-center gap-2 hover:bg-colors-OffWhite bg-colors-WhiteSmoke py-5 rounded-xl font-semibold font-geist w-80 lg:w-40'>
          Add Recipient
          <span className="border border-colors-ButtonOrange rounded-md ">
            <HiOutlinePlusSm size={5} />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Recipient</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-colors-BlueGray">
            <TabsTrigger value="account" className="data-[state=active]:bg-colors-ButtonOrange data-[state=active]:text-white">
              Individual Recipient
            </TabsTrigger>
            <TabsTrigger value="password" className="data-[state=active]:bg-colors-ButtonOrange data-[state=active]:text-white">
              Bulk Recipient
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="wallet address">Wallet Address</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your wallet address' />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Recipient Name</Label>
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter name of recipient' />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="token">Token</Label>
                  <Input id="token" value={token} onChange={(e) => setToken(e.target.value)} placeholder='Enter amount' />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={!isAccountFormValid} className='w-full pt-3 text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl'>
                  Save 
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardContent className="space-y-4 pt-3">
                {showAlert && (
                  <Alert className="bg-colors-YellowWarnbg text-colors-BlueGray flex items-center justify-between text-center border-2  border-yellow-400 shadow-sm">
                    <div className='flex items-center gap-1 lg:gap-3'>
                    <PiWarningFill className="h-6 w-6 text-yellow-400" />
                    <div className="flex-1">
                      <AlertTitle className="text-colors-BlueGray font-normal font-geist text-sm">It is important to follow the same format as wrongly formatted files will not be processed </AlertTitle>
                      <AlertDescription className='text-colors-BlueGray text-sm font-bold font-geist'>Maximum of 700 recipients</AlertDescription>
                    </div>
                    </div>
                   
                    <Button variant="ghost" className="h-6 w-6 p-0" onClick={() => setShowAlert(false)}>
                      <CgClose className='w-4 h-4 text-colors-BlueGray absolute top-2 right-2'/>
                    </Button>
                  </Alert>
                )}
                {/* <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input
                    id="current"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input
                    id="new"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div> */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center space-x-4 cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <FileIcon className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="font-medium">Upload, Drag or drop document</p>
                    <p className="text-sm text-gray-500">Supported Format: CSV, JSON</p>
                  </div>
                </div>
                {file && (
                  <div className="space-y-2">
                    <p className="text-sm">{file.name}</p>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button disabled={!isPasswordFormValid} className='w-full text-white bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-6 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl'>
                  Save
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AddRecipient
