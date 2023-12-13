'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { movieData } from '@/data/movies';
import useTimedFunction from '@/hooks/useTimedFunction';
import { MovieType } from '@/lib/fetchMovies';
import { image_url } from '@/lib/constants';

interface BackgroundSliderProps {
  elements: MovieType[];
}

export default function BackgroundSlider({ elements }: BackgroundSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<MovieType | null>(null);

  useEffect(() => {
    setCurrentImage(elements[currentImageIndex]);
  }, [currentImageIndex]);

  useTimedFunction({
    interval: 5000,
    targetFunction: () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (elements?.length ?? 0));
    },
  });

  return (
    <div className='fixed top-0 left-0 w-full h-full opacity-50'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentImage?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.7 } }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='relative top-0 left-0 w-full h-full text-7xl'
        >
          {/* {currentImage?.title} */}
          <Image
            src={`${image_url}${currentImage?.backdrops?.[0]}`}
            alt={currentImage?.title + 'poster image'}
            fill
            priority
            sizes='full'
            className='object-center object-cover'
          />
        </motion.div>
      </AnimatePresence>
      <div
        className={cn(
          'absolute w-screen h-screen top-0 left-0 bg-blend-multiply',
          'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
          'from-transparent from-0% via-slate-900/50 to-80% to-slate-900'
        )}
      />
    </div>
  );
}
