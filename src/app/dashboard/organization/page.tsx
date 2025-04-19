'use client'

import React, { useState } from 'react'
import AddOrg from '@/components/AddOrg'
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';
import AddRecipient from '@/components/AddRecipient';
import { recipient } from '@/data/recipient';
import { FaPeopleGroup } from "react-icons/fa6";
import IndividualOrg from '@/components/IndividualOrg';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CgClose } from 'react-icons/cg';


const Organization = () => {
  const [showAlert, setShowAlert] = useState(true)
  const x = 2

  return x < 2 ? (
    <div className='text-colors-BlueGray font-geist flex flex-col gap-4 justify-center w-full p-5 md:px-10 md:py-4'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 font-source items-center font-bold text-lg'>
          <h1>Organization</h1>
          <p className='border border-colors-ButtonOrange bg-colors-Primay100 px-2 rounded-md'>2</p>
        </div>
        <div> <AddOrg /></div>
      </div>
      {
        recipient.map((item) => (
          <div key={item.id} className='flex flex-col gap-1 bg-colors-WhiteSmoke rounded-xl p-4 drop-shadow-md'>
            <p className='text-base font-bold'>{item.initial}</p>
            <Link href='/dashboard/organization/added-organization'>
              <div className='flex justify-between items-center hover:ring-1 hover:ring-colors-ButtonOrange p-1 rounded-md cursor-pointer'>
                <p className='text-sm'>{item.name}<span className='text-[10px]'>  ({item.recipient} recipients)</span></p>
                <MdKeyboardArrowRight className='w-6 h-6 text-colors-BlueGray' />
              </div>
            </Link>
          </div>
        ))
      }
      <AddRecipient />  // to be added to the add receipient page created. it is not meant to be on this page
    </div>

    // individual org => confab company receipients
    // <div className='space-y-5'>
    //   {showAlert && (
    //     <div className='px-5 md:px-10  '>
    //       <Alert className="bg-colors-OffGreen border-colors-RoundedGreen shadow-md w-full mb-1 mt-4 p-5 md:px-6 md:py-5 border-2 flex justify-between items-center ">
    //       <div className="flex items-center gap-3">
    //         <Check className="h-6 w-6 mr-2 text-white bg-colors-RoundedGreen p-1 rounded-full" />
    //         <AlertDescription className='text-colors-BlueGray font-medium text-base '>Success! Recipients added successfully.</AlertDescription>
    //       </div>
    //       <Button
    //         className="absolute text-green-700 hover:border-2 bg-none right-4 p-1 rounded-full "
    //         variant="ghost"
    //         size="sm"
    //         onClick={() => setShowAlert(false)}
    //       >
    //         <CgClose className='w-4 h-4 text-colors-BlueGray'/>
    //       </Button>
    //     </Alert>
    //     </div>
    //   )}
    //   <div className='text-colors-BlueGray font-geist flex flex-col gap-4 justify-center w-full p-5 md:px-10 md:py-4'>
    //     <div className='flex flex-col lg:flex-row items-start justify-start lg:justify-between lg:items-center gap-5 lg:gap-0 '>
      
    //      <div className='flex gap-2 font-source items-center font-bold text-lg'>
    //         <h1>Receipients</h1>
    //         <p className='border border-colors-ButtonOrange bg-colors-Primay100 px-2 rounded-md'>100</p>
    //       </div> 
    //       <div> <AddRecipient /></div>
    //     </div>

    //     <hr className='w-full text-colors-DarkGray pt-5' />

    //     <IndividualOrg />

    //   </div>

    // </div>

  ) : (
    <div className='text-colors-BlueGray font-geist text-lg'>
      <div className=' flex flex-col justify-center items-center text-center w-full h-[80vh] gap-3'>
        <FaPeopleGroup className='w-6 h-6 text-colors-ButtonOrange' />
        <h1 className='font-source font-bold'>No Organization added</h1>
        <p className='w-[350px] lg:w-[450px]'>You do not have any Organization. Click on the button below to start creating one.</p>
        <AddOrg />
      </div>
    </div>
  )
}

export default Organization
