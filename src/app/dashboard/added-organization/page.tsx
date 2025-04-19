import AddRecipient from '@/components/AddRecipient';
import React from 'react'
import { HiUserAdd } from "react-icons/hi";

const added_organization = () => {
  return (
    <div className='text-colors-BlueGray font-geist text-lg'>
      <div className=' flex flex-col justify-center items-center text-center w-full h-[80vh] gap-3'>
        <HiUserAdd className='w-10 h-10 text-colors-ButtonOrange' />
        <h1 className='font-source font-bold'>No Recipient added</h1>
        <p className='w-[450px]'>You do not have any Recipient. Click on the button below to start creating one.</p>
         <AddRecipient/>
      </div>
    </div>
  )
}

export default added_organization
