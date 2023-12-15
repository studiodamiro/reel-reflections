'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MovieType } from '@/lib/fetchMovies';
import { image_url } from '@/lib/constants';
import { useMovies } from '@/providers/MoviesProvider';

export default function BackgroundSlider() {
  const { movies, currentMovieIndex } = useMovies();
  const [currentImage, setCurrentImage] = useState<MovieType | null>(null);

  useEffect(() => {
    setCurrentImage(movies[currentMovieIndex] ?? null);
  }, [currentMovieIndex]);

  return (
    <div className='fixed top-0 left-0 w-full h-full opacity-50'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentImage?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.7 } }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='relative top-0 left-0 w-full h-full'
        >
          {/* {currentImage?.title} */}
          <Image
            src={`${image_url}${currentImage?.backdrops?.[0]}`}
            alt={`${currentImage?.title} poster image`}
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
          'from-transparent from-0% via-slate-900/20 to-80% to-slate-900'
        )}
      />
    </div>
  );
}
