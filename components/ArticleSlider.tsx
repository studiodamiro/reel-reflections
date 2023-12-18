'use client';

import Image from 'next/image';
import Link from 'next/link';
import useTimedFunction from '@/hooks/useTimedFunction';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovies } from '@/providers/MoviesProvider';
import { image_url, video_url } from '@/lib/constants';
import { usePalette } from 'color-thief-react';
import { cn } from '@/lib/utils';
import adjustHexColor from '@/lib/adjustColor';
import arrangeColors from '@/lib/arrangeColors';
import ReelLogo from './ReelLogo';

interface ArticleSliderProps {
  title: string;
}

export default function ArticleSlider({ title }: ArticleSliderProps) {
  const { movies } = useMovies();
  const movie = movies.find((movie) => movie.title === title);
  if (!movie) return null;

  const backdrops = movie.backdrops?.slice(0, 3); // limit to 3 images
  const logos = movie.logos;
  const video = movie.videos;
  const videoLink = `${video_url}${video}`;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useTimedFunction({
    interval: 5000,
    targetFunction: () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (backdrops?.length ?? 0));
    },
  });

  useEffect(() => {
    setCurrentImage(backdrops![currentImageIndex]);
  }, [currentImageIndex]);

  const [priColor, setPriColor] = useState<string | null>(null);
  const [secColor, setSecColor] = useState<string | null>(null);
  const { data, loading, error } = usePalette(`${image_url}${logos?.[0]}`, 4, 'hex', {
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

  return (
    <>
      <div className='relative min-w-screen aspect-square sm:aspect-video object-cover object-center overflow-hidden'>
        <div className='absolute z-20 min-w-full min-h-full flex flex-col gap-4 justify-center sm:justify-end px-4 sm:px-16 md:px-28'>
          {/* REEL LOGO */}
          <span className='block sm:hidden relative grow-[2] sm:grow-[3]' />
          <motion.div
            id={movie.title}
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 0.5, transition: { duration: 0.7, delay: 3, ease: 'easeOut' } }}
            className='relative scale-50 origin-bottom sm:origin-bottom-left mx-auto sm:ml-0'
          >
            <ReelLogo inline={false} color={priColor!} secColor={secColor!} />
          </motion.div>
          <span className='hidden sm:block relative grow-[2] sm:grow-[3]' />

          {/* MOVIE LOGO */}
          <div className='relative w-3/5 sm:w-1/2 grow-[3] sm:grow-[2] mx-auto sm:ml-0 origin-bottom-left'>
            {logos ? (
              <Image
                src={`${image_url}${logos[0]}`}
                alt={`${title} poster image ${currentImageIndex + 1}`}
                sizes='full'
                fill
                priority
                className={cn('object-contain object-bottom sm:object-left-bottom drop-shadow-lg shadow-black')}
              />
            ) : (
              <h2 style={{ textWrap: 'balance' }} className='text-3xl font-bold'>
                {movie.title}
              </h2>
            )}
          </div>

          {/* DETAILS */}
          <div className='relative flex flex-col gap-1 sm:gap-0 sm:flex-row items-center justify-start'>
            <div className='flex flex-row items-center justify-center'>
              <span className='tracking-widest font-bold scale-110 text-xs'>{movie.release}</span>
              <span className='px-4 hidden sm:block opacity-50'>|</span>
            </div>
            <div className='flex grow items-center justify-start text-xs text-center sm:text-left uppercase tracking-wider py-2'>
              <span style={{ textWrap: 'balance' }} className=''>
                {movie.genre?.map((genre) => genre).join(' ● ')}
              </span>
            </div>
            {videoLink !== video_url && (
              <Link
                rel='noopener noreferrer'
                target='_blank'
                href={videoLink}
                style={{ backgroundColor: isHover ? priColor! : secColor! }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  'relative px-3.5 py-1.5 flex-none rounded-lg tracking-widest text-xs font-bold shadow-md items-center justify-center',
                  'bg-slate-900/70 dark:bg-white/70 dark:text-slate-900 text-white opacity-80 hover:opacity-100',
                  'transition-all duration-300 ease-out'
                )}
              >
                PLAY TRAILER
              </Link>
            )}
          </div>
        </div>

        {/* IMAGE SLIDER */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='absolute z-0 object-center object-cover w-full aspect-video '
          >
            <Image
              src={`${image_url}${currentImage}`}
              alt={`${title} poster image ${currentImageIndex + 1}`}
              sizes='full'
              fill
              priority
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

      {/* TITLE */}
      <h1
        style={{ textWrap: 'balance', color: priColor! }}
        className='px-4 sm:px-16 md:px-28 pt-16 text-xl sm:text-3xl text-center sm:text-left font-semibold transition-colors duration-300 ease-out'
      >
        {movie.article}
      </h1>
    </>
  );
}
