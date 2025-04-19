import React from 'react';
import StepCard from './StepCard';
import frame4 from "@/assets/images/frame4.svg";
import frame5 from "@/assets/images/frame5.svg";
import frame6 from "@/assets/images/frame6.svg";
import frame7 from "@/assets/images/frame7.svg";
import { StaticImageData } from 'next/image';

interface StepCardData {
    image: StaticImageData;
    title: string;
    description: string;
    classname?: string;
    imgclassname: string;
}

const stepCardsData: StepCardData[] = [
    { image: frame4, title: "1. Connect your Crypto Wallet", description: "Get started by clicking the connect wallet button on the landing page", classname: "w-full lg:max-w-[500px]", imgclassname: "" },
    { image: frame5, title: "2. Secure Transaction", description: "Create organization where you get to add recipients/employees you are sending funds to", classname: "w-full lg:max-w-[750px] lg:col-span-2", imgclassname: "px-4 lg:px-0 pt-3"},
    { image: frame6, title: "3. Instant Confirmation", description: "Securely send individual or bulk payments to recipients either instantly or scheduled", classname: "w-full lg:max-w-[750px] lg:col-span-2", imgclassname: "px-4 lg:px-0 pt-1" },
    { image: frame7, title: "4. Enjoy Your Assets", description: "Assets are securely stored in your connected wallet", classname: "w-full lg:max-w-[500px]", imgclassname: "" }
];

const HowItWorks: React.FC = () => {
    return (
        <div className='bg-slate-50 flex flex-col justify-center items-center py-8 w-full px-4 md:px-8 lg:px-0'>
            <div className='text-center'>
                <h1 className='relative z-10 font-source font-bold text-colors-BlueGray text-xl md:text-5xl'>
                    How it works: A simple <span className='italic text-colors-ButtonOrange font-geist'>Step by Step </span> Guide
                </h1>
                <p className='text-xs md:text-sm font-source text-colors-BlueGray py-2 font'>
                    Follow these easy steps to make transaction seamless and stress-free
                </p>
            </div>

            {/* Grid layout for cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 w-full max-w-6xl items-center justify-center py-5">
                {stepCardsData.slice(0, 4).map((step, index) => (
                    <StepCard key={index} {...step} />
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;