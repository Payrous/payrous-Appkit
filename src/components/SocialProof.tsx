import React from 'react'
import Image from 'next/image'
import { ethereum, starknet } from '@/assets/icons'
import { frame3, sponsors } from '@/assets/images'
import PropCard from './PropCard'
import icon1 from '@/assets/icons/icon1.svg'
import icon2 from '@/assets/icons/icon2.svg'
import icon3 from '@/assets/icons/icon3.svg'
import icon4 from '@/assets/icons/icon4.svg'


const propCardsData = [
    {
        icon: icon1,
        description: ' Cost-effective solutions reducing gas fees.',
    },
    {
        icon: icon2,
        description: 'Enhanced security through multi-sign capabilities.',
    },
    {
        icon: icon3,
        description: 'Automated Bulk Payments to process multiple payments with a single transaction.',
    },
    {
        icon: icon4,
        description: 'Support scheduled payments, recipient management, and payment edits.',
    },
];

const SocialProof = () => {
    return (
        <div className=''>
            <div className='bg-white py-3 flex items-center justify-center w-full'>
                <Image src={sponsors} alt='sponsors'/>
            </div>

            {/* offerpage */}
            <div className='bg-slate-50  px-8 py-4 md:px-40 md:py-10  flex flex-col justify-center items-center'>
                <div className='py-12 px-10 bg-orange-100 relative h-full w-full rounded-2xl'>
                    <Image
                        alt=""
                        src={frame3}
                        placeholder="blur"
                        quality={100}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                        className="z-0"
                    />
                    <div className=''>
                        <div className='text-left flex flex-col items-start'>
                            <h1 className='relative z-10 font-source font-bold text-colors-BlueGray text-xl md:text-5xl'>What truly sets us <span className='italic text-colors-ButtonOrange font-geist'>apart</span></h1>
                            <p className='text-xs md:text-sm font-source text-colors-BlueGray py-2'>A solution for efficient, secure, and transparent bulk payment management.</p>
                        </div>

                        {/* propstyle */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5'>
                            {propCardsData.map((card, index) => (
                                <PropCard key={index} icon={card.icon} description={card.description} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SocialProof