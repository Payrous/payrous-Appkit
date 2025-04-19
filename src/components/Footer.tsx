import React from 'react'
import Image from 'next/image';
import { FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { payrous_logo, warpcastlogo } from '@/assets/icons';

const Footer = () => {
    return (
        <div className='bg-white w-full font-source font-normal flex flex-col p-8 md:p-16 lg:px-32 lg:py-10'>
            <div className=' text-colors-BlueGray text-base flex flex-col md:flex-row justify-between text-center md:text-left gap-8 md:gap-0'>
                <div className='flex flex-col items-center md:items-start'>
                    <Image src={payrous_logo} alt="payrous logo" className='w-24 pb-3 items-center md:items-start' />
                    <p className='w-full md:max-w-[400px] :max-w-[350px]'>Payrous is a blockchain-powered platform designed to streamline payroll and bulk payment processes by enabling organizations to efficiently handle payments to multiple recipients.</p>
                </div>
               
               {/* link */}
                <div className='flex flex-col md:flex-row justify-between  w-full md:w-auto gap-12'>
                    <div className=''>
                        <h1 className='font-semibold pb-3'>Company</h1>
                        <ul className='flex flex-col gap-2'>
                            <li className='hover:text-orange-300 cursor-pointer'>Features</li>
                            <li className='hover:text-orange-300 cursor-pointer'>How it works</li>
                            <li className='hover:text-orange-300 cursor-pointer'>FAQs</li>
                        </ul>
                    </div>

                    <div className=''>
                        <h1 className='font-semibold pb-3'>Legal</h1>
                        <ul className='flex flex-col gap-2'>
                            <li className='hover:text-orange-300 cursor-pointer'>Privacy Policy</li>
                            <li className='hover:text-orange-300 cursor-pointer'>Terms and condition</li>
                        </ul>
                    </div>

                    <div className='flex flex-col items-center md:items-start'>
                        <h1 className='font-semibold pb-3'>Social media</h1>
                        <ul className='flex flex-col gap-2'>
                            <li className='hover:text-orange-300 cursor-pointer flex items-center gap-1'><span><FaDiscord /></span>Discord</li>
                            <li className='hover:text-orange-300 cursor-pointer flex items-center gap-1'><span><BsTwitterX /></span>Twitter</li>
                            <li className='hover:text-orange-300 cursor-pointer flex items-center gap-1'><span><Image src={warpcastlogo} alt='warpcast' className='w-5 h-5' /></span>Warpcast</li>
                        </ul>
                    </div>
                </div>

            </div>

            <div className='pt-5 md:pt-10'>
                <hr className='text-gray-400' />
                <h1 className='flex items-center justify-center text-gray-400 py-3'>© 2025 Payrous.</h1>
            </div>

        </div>



    )
}

export default Footer