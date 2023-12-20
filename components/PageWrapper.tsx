'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { image_url } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MovieType } from '@/lib/fetchMovies';
import { useMovies } from '@/providers/MoviesProvider';
import { usePalette } from 'color-thief-react';
import ImageFadeIn from './ImageFadeIn';
import ReelLogo from './ReelLogo';
import arrangeColors from '@/lib/arrangeColors';
import adjustHexColor from '@/lib/adjustColor';

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { recentMovies, currentRecentMovieIndex } = useMovies();
  const [currentImage, setCurrentImage] = useState<MovieType | undefined>(undefined);

  useEffect(() => {
    setCurrentImage(recentMovies[currentRecentMovieIndex] ?? undefined);
  }, [currentRecentMovieIndex]);

  const [priColor, setPriColor] = useState<string | null>(null);
  const [secColor, setSecColor] = useState<string | null>(null);
  const { data } = usePalette(`${image_url}${currentImage?.backdrops?.[0]}`, 4, 'hex', {
    crossOrigin: 'anonymous',
    quality: 10,
  });

  useEffect(() => {
    if (data) {
      const colors: string[] = arrangeColors(data);
      setPriColor(adjustHexColor(colors[0], 'light', 20));
      setSecColor(adjustHexColor(colors[2], 'light', 20));
    } else {
      setPriColor('#ffffff');
      setSecColor('#cccccc');
    }
  }, [data]);

  return (
    <>
      <div className='absolute w-full aspect-square sm:aspect-video object-cover object-center overflow-hidden'>
        <div className='absolute z-20 min-w-full min-h-full flex flex-col gap-4 justify-center sm:justify-end px-4 sm:px-16 md:px-28'>
          <motion.div
            id={currentImage?.id?.toString()}
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 0.5, transition: { duration: 0.7, delay: 3, ease: 'easeOut' } }}
            className='relative scale-50 origin-bottom sm:origin-bottom-left mx-auto sm:ml-0'
          >
            <ReelLogo inline={false} color={priColor!} secColor={secColor!} />
          </motion.div>
          <span className='block relative grow-[2] sm:grow-[3]' />
        </div>

        {/* IMAGE SLIDER */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentImage?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='absolute z-0 object-center object-cover w-full aspect-video'
          >
            <ImageFadeIn
              src={`${image_url}${currentImage?.backdrops?.[0]}`}
              alt={`${currentImage?.title} poster image`}
              className='object-center object-cover'
            />
          </motion.div>
        </AnimatePresence>
        {/* GRADIENTS */}
        <div
          className={cn(
            'absolute z-10 w-full aspect-video bg-blend-multiply',
            'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]',
            'sm:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
            'from-0% via-50% to-80% ',
            'from-transparent via-slate-300/20 to-slate-300',
            'from-transparent dark:via-slate-900/50 dark:to-slate-900'
          )}
        />
        <div
          className={cn(
            'absolute z-10 w-full aspect-video bg-blend-multiply',
            'bg-gradient-to-b from-0% via-70% to-100% ',
            'from-slate-300/0 via-slate-300/20 to-slate-300',
            'dark:from-slate-900/0 dark:via-slate-900/20 dark:to-slate-900'
          )}
        />
      </div>
      <div className='relative z-30 max-w-full px-4 sm:px-16 md:px-28 pb-20 pt-[250px] prose dark:prose-invert prose-sm prose-quoteless'>
        {children}
      </div>
    </>
  );
}
