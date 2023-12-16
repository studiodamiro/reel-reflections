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
    <div className='z-[-1] absolute inset-0 w-full aspect-square sm:aspect-video overflow-hidden'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentImage?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.7 } }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 w-full aspect-square sm:aspect-video'
        >
          {/* {currentImage?.title} */}
          <Image
            src={`${image_url}${currentImage?.backdrops?.[0]}`}
            alt={`${currentImage?.title} poster image`}
            sizes='full'
            fill
            priority
            className='object-center object-cover'
          />
        </motion.div>
      </AnimatePresence>
      <div
        className={cn(
          'fixed inset-0 w-full aspect-square sm:aspect-video',
          'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]',
          'sm:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
          'from-transparent from-0% via-slate-950/10 to-80% to-slate-950'
        )}
      />
      <div
        className={cn(
          'fixed inset-0 w-full aspect-square sm:aspect-video bg-blend-multiply',
          'bg-gradient-to-b from-0% via-80% to-100% ',
          'from-slate-300/0 via-slate-300/20 to-slate-300',
          'dark:from-slate-900/0 dark:via-slate-950/20 dark:to-slate-950'
        )}
      />
    </div>
  );
}
