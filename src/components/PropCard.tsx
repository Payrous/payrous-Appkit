'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PropCardProps {
  icon: string;
  description: string;
}

const PropCard: React.FC<PropCardProps> = ({ icon, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.8 }}
      whileTap={{ scale: 0.7 }}
      className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col items-center px-4 py-6 md:p-6 gap-6 text-center relative z-20 justify-center w-full'
    >
      <Image src={icon} alt='icon' width={64} height={64} className='w-12 h-16 md:w-16 md:h-16' />
      <p className='text:sm md:text-base font-source text-colors-BlueGray'>{description}</p>
    </motion.div>
  );
};

export default PropCard;