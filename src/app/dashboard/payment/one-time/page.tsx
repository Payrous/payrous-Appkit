import BulkPaymentTab from '@/components/BulkPaymentTab'
import React from 'react'

const One_time = () => {
  return (
        <div className='text-colors-BlueGray  font-geist flex flex-col gap-4 justify-center w-full p-5 md:px-10 md:py-4'>
      <h1 className='text-lg font-bold font-source'>One-time payment</h1>
      <hr className='w-full text-colors-DarkGray pt-5' />

       <BulkPaymentTab/>
    </div>
  )
}

export default One_time
