import Image from 'next/image';
import Link from 'next/link';
import useTimedFunction from '@/hooks/useTimedFunction';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovies } from '@/providers/MoviesProvider';
import { image_url, video_url } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Logo from './Logo';

interface ArticleSliderProps {
  title: string;
}

export default function ArticleSlider({ title }: ArticleSliderProps) {
  const movies = useMovies();
  const element = movies.find((movie) => movie.title === title);
  if (!element) return null;

  const backdrops = element.backdrops;
  const logos = element.logos;
  const video = element.videos;

  if (!backdrops) return null;
  if (!logos) return null;
  if (!video) return null;

  const videoLink = `${video_url}${video}`;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    setCurrentImage(backdrops[currentImageIndex]);
  }, [currentImageIndex]);

  useTimedFunction({
    interval: 5000,
    targetFunction: () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (backdrops.length ?? 0));
    },
  });

  return (
    <>
      <div className='relative w-full object-cover object-center aspect-video'>
        <div className='absolute z-20 w-full h-full flex flex-col gap-1 sm:gap-2 justify-center sm:justify-end px-4 sm:px-16 md:px-28'>
          <Logo className='origin-center sm:origin-bottom-left scale-75 text-center sm:text-left' />
          <div className='relative w-1/2 md:w-3/5 aspect-video mx-auto sm:m-0'>
            {logos ? (
              <Image
                src={`${image_url}${logos[0]}`}
                alt={`${title} poster image ${currentImageIndex + 1}`}
                fill
                sizes='full'
                className='origin-bottom-left object-contain drop-shadow-lg shadow-black ml-0 sm:-ml-8'
              />
            ) : (
              <h2>{element.title}</h2>
            )}
          </div>
          <div className='flex flex-col sm:flex-row items-center'>
            <div className='flex flex-1 items-center justify-start text-xs uppercase tracking-wider py-2'>
              <span className='font-bold'>{element.release}</span>
              <span>{element.vote_average}</span>
              <span className='px-2'> | </span>
              {element.genre?.map((genre) => genre).join(' · ')}
            </div>
            {videoLink !== video_url && (
              <Link
                rel='noopener noreferrer'
                target='_blank'
                href={videoLink}
                className={cn(
                  'relative px-3.5 py-1.5 flex-none rounded-full tracking-widest text-xs font-bold shadow-md',
                  'bg-slate-900/70 hover:bg-slate-900 dark:bg-white/70 hover:dark:bg-white dark:text-slate-900 text-white',
                  'transition-colors duration-300'
                )}
              >
                PLAY TRAILER
              </Link>
            )}
          </div>
        </div>
        <AnimatePresence mode='wait'>
          <motion.div
            key={element.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='absolute z-0 object-center object-cover w-full aspect-video '
          >
            <Image
              src={`${image_url}${currentImage}`}
              alt={`${title} poster image ${currentImageIndex + 1}`}
              sizes='full'
              fill
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div
          className={cn(
            'absolute z-10 w-full aspect-video bg-blend-multiply',
            'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
            'from-0% via-60% to-80% ',
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
    </>
  );
}
