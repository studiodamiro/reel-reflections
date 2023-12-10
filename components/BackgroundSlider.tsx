'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { movieData } from '@/data/movies';
import useTimedFunction from '@/hooks/useTimedFunction';

const elements = movieData;

export default function BackgroundSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = elements[currentImageIndex];

  useTimedFunction({
    interval: 5000,
    targetFunction: () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % elements.length);
    },
  });

  return (
    <div className='fixed top-0 left-0 w-full h-full opacity-50'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentImage.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.7 } }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='relative top-0 left-0 w-full h-full'
        >
          <Image
            src={currentImage.src}
            alt={currentImage.title + ' poster image'}
            fill
            priority
            sizes='full'
            className='object-center object-cover'
          />
        </motion.div>
      </AnimatePresence>
      <div
        className={cn(
          'absolute w-screen h-screen top-0 left-0',
          'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
          'from-transparent from-30% via-slate-900/50 to-80% to-slate-900'
        )}
      />
    </div>
  );
}
