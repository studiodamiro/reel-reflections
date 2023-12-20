'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMovies } from '@/providers/MoviesProvider';
import { useWidth } from '@/providers/WidthProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { usePalette } from 'color-thief-react';
import { cn } from '@/lib/utils';
import { MovieType } from '@/lib/fetchMovies';
import { image_url } from '@/lib/constants';
import adjustHexColor from '@/lib/adjustColor';
import arrangeColors from '@/lib/arrangeColors';
import ImageFadeIn from './ImageFadeIn';

type BackgroundDetailProps = {
  className?: string;
};

export default function BackgroundDetail({ className }: BackgroundDetailProps) {
  const router = useRouter();

  const { containerWidth, elementWidth } = useWidth();
  const { recentMovies, currentRecentMovieIndex, priColor, secColor, setPriColor, setSecColor } = useMovies();
  const [currentMovie, setCurrentMovie] = useState<MovieType | undefined>();
  if (!recentMovies) return null;

  useEffect(() => {
    setCurrentMovie(recentMovies[currentRecentMovieIndex] ?? undefined);
  }, [currentRecentMovieIndex]);

  const imageUrl = currentMovie?.logo ? `${image_url}${currentMovie.logo}` : '';
  const { data, loading, error } = usePalette(imageUrl, 4, 'hex', {
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

  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const navToPost = (slug: string) => {
    router.push(slug);
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={currentRecentMovieIndex}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ width: containerWidth, bottom: elementWidth }}
        className={cn('w-full mx-auto px-4 md:px-6 py-6 flex flex-col justify-end gap-4 sm:gap-4 md:gap-6', className)}
      >
        {/* LOGO */}
        <div className='relative w-2/3 sm:w-1/4 aspect-video mx-auto sm:ml-0'>
          {currentMovie?.logo === undefined || currentMovie?.logo === null ? (
            <div style={{ textWrap: 'balance' }} className='text-3xl font-bold'>
              {currentMovie?.title}
            </div>
          ) : (
            <ImageFadeIn
              src={`${image_url}${currentMovie?.logo}`}
              alt={`${currentMovie?.title} poster image`}
              priority
              className='object-contain object-bottom sm:object-left-bottom drop-shadow-lg shadow-black'
            />
          )}
        </div>

        {/* OVERVIEW */}
        <div className='flex flex-col gap-2 w-full sm:w-2/3 lg:w-2/5 text-center sm:text-left'>
          <span
            style={{ textWrap: 'balance', color: priColor! }}
            className='font-semibold text-lg text-center sm:text-left'
          >
            {currentMovie?.article ? currentMovie?.article : currentMovie?.article}
          </span>
          <span className='text-sm line-clamp-3'>
            {currentMovie?.description ? currentMovie?.description : currentMovie?.overview}
          </span>
        </div>

        {/* DETAILS */}
        <div className='relative flex flex-col items-start justify-left gap-2 sm:gap-4 md:gap-6'>
          <div className='flex flex-col-reverse sm:flex-row mx-auto sm:ml-0 items-center justify-center gap-2 sm:gap-4'>
            <button
              onClick={() => currentMovie?.slug && navToPost(currentMovie?.slug)}
              style={{ backgroundColor: isHover ? secColor! : priColor! }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={cn(
                'relative px-4 py-1.5 my-4 sm:my-0 rounded-lg tracking-widest text-sm font-bold shadow-md items-center justify-center',
                'bg-slate-900/70 dark:bg-white/70 dark:text-slate-900 text-white opacity-80 hover:opacity-100',
                'transition-all duration-300 ease-out'
              )}
            >
              READ REFLECTION
            </button>
            <div className='flex flex-col sm:flex-row gap-1 sm:gap-3'>
              <div className='flex flex-row items-center justify-center'>
                <span className='tracking-widest font-bold scale-110 text-sm'>{currentMovie?.release}</span>
                <span className='pl-2 sm:pl-3 hidden sm:block opacity-50'>|</span>
              </div>
              <div className='flex grow items-center justify-start text-sm text-center sm:text-left uppercase tracking-wider py-0 sm:py-2'>
                <span style={{ textWrap: 'balance' }} className=''>
                  {currentMovie?.genre?.map((genre) => genre).join(' ● ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
