import { Button } from '@/components/ui/button'
import { recipient } from '@/data/recipient'
import Link from 'next/link'
import React from 'react'
import { CgFileDocument } from 'react-icons/cg'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import TransactionDetails from '@/components/TransactionDetails'

const TransactionHistory = () => {
  const x = 2

  return x < 2 ? (
    <div className='text-colors-BlueGray  font-geist flex flex-col gap-4 justify-center w-full p-5 md:px-10 md:py-4'>
      <h1 className='text-lg font-bold font-source'>All transactions</h1>
      <hr className='w-full text-colors-DarkGray pt-5' />

      {
        recipient.map((item) => (
          <div key={item.id} className='flex flex-col gap-1 bg-colors-WhiteSmoke rounded-xl p-4 drop-shadow-md'>
            <p className='text-base font-bold'>{item.initial}</p>
            <Link href={item.link}>
              <div className='flex justify-between items-center hover:ring-1 hover:ring-colors-ButtonOrange p-1 rounded-md cursor-pointer'>
                <p className='text-sm'>{item.name}<span className='text-[10px]'>  ({item.recipient} recipients)</span></p>
                <MdKeyboardArrowRight className='w-6 h-6 text-colors-BlueGray' />
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  ) : (
    <div className='text-colors-BlueGray font-geist text-lg flex flex-col justify-center w-full p-5 md:px-10 md:py-4'>
      <div className='flex justify-between items-center py-2'>
        <h1 className='font-source font-bold'>All transactions</h1>
        <Button className='border border-colors-ButtonOrange text-colors-ButtonOrange rounded-lg p-2 hover:bg-colors-OffWhite bg-colors-WhiteSmoke w-32 flex items-center gap-2'>Filter by
          <MdKeyboardArrowDown className='w-10 h-10 text-colors-ButtonOrange' />
        </Button>
      </div>

      <hr className='w-full text-colors-DarkGray pt-5' />

      {/* <div className=' flex flex-col justify-center items-center text-center w-full h-[80vh] gap-3'>
        <CgFileDocument className='w-6 h-6 text-colors-ButtonOrange' />
        <h1 className='font-source font-bold'>No transaction history</h1>
        <p className='w-[350px] lg:w-[450px]'>You do not have any transaction history. Click on the button below to start creating one.</p>
      </div> */}

      <div>
        <TransactionDetails/>
      </div>
    </div>
  )
}

export default TransactionHistory