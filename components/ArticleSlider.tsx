import Image from 'next/image';
import Link from 'next/link';
import useTimedFunction from '@/hooks/useTimedFunction';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovies } from '@/providers/MoviesProvider';
import { image_url, video_url } from '@/lib/constants';
import { usePalette } from 'color-thief-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import adjustHexColor from '@/lib/adjustColor';
import arrangeColors from '@/lib/arrangeColors';
import invertColor from '@/lib/invertColor';

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
  const videoLink = `${video_url}${video}`;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [priColor, setPriColor] = useState<string | null>(null);
  const [secColor, setSecColor] = useState<string | null>(null);

  const { data, loading, error } = usePalette(`${image_url}${logos?.[0]}`, 4, 'hex', {
    crossOrigin: 'anonymous',
    quality: 10,
  });

  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  useEffect(() => {
    // if (data) setColor(adjustHexColor(data![1], 'light', 100));
    if (data) {
      const colors: string[] = arrangeColors(data);
      setPriColor(adjustHexColor(colors[1], 'light', 20));
      setSecColor(adjustHexColor(colors[1], 'light', 80));
    }
  }, [data]);

  useEffect(() => {
    setCurrentImage(backdrops![currentImageIndex]);
  }, [currentImageIndex]);

  useTimedFunction({
    interval: 5000,
    targetFunction: () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (backdrops?.length ?? 0));
    },
  });

  return (
    <>
      <div className='relative w-full object-cover object-center aspect-video overflow-hidden'>
        <div className='absolute z-20 min-w-full min-h-full flex flex-col gap-1 sm:gap-4 justify-center sm:justify-end px-4 sm:px-16 md:px-28'>
          <span className='relative grow-0 sm:grow-[3]' />
          {/* REEL LOGO */}
          <Logo className='relative origin-center sm:origin-bottom-left text-left sm:text-center text-sm mt-4 sm:mt-0 mx-auto sm:ml-0' />

          {/* MOVIE LOGO */}
          <div className='relative w-3/5 sm:w-1/2 grow-[1] mx-auto sm:ml-0'>
            {logos ? (
              <Image
                src={`${image_url}${logos[0]}`}
                alt={`${title} poster image ${currentImageIndex + 1}`}
                fill
                sizes='full'
                priority
                className={cn(
                  'origin-bottom-left object-contain object-center sm:object-left-top drop-shadow-lg shadow-black'
                )}
              />
            ) : (
              <h2 style={{ textWrap: 'balance' }} className='text-3xl font-bold'>
                {element.title}
              </h2>
            )}
          </div>

          {/* DETAILS */}
          <div className='relative flex flex-col gap-2sm:gap-4 sm:flex-row items-center justify-start'>
            <div className='flex flex-row items-center justify-center'>
              <span className='tracking-widest font-bold scale-110 text-xs'>{element.release}</span>
              <span className='px-2 hidden sm:block'>|</span>
            </div>
            <div className='flex grow items-center justify-start text-xs text-center sm:text-left uppercase tracking-wider py-2'>
              <span style={{ textWrap: 'balance' }} className=''>
                {element.genre?.map((genre) => genre).join(' ● ')}
              </span>
            </div>
            {videoLink !== video_url && (
              <Link
                rel='noopener noreferrer'
                target='_blank'
                href={videoLink}
                style={{ backgroundColor: isHover ? secColor! : priColor! }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  'relative px-3.5 py-1.5 flex-none rounded-full tracking-widest text-xs font-bold shadow-md items-center justify-center',
                  'bg-slate-900/70  dark:bg-white/70  dark:text-slate-900 text-white opacity-80 hover:opacity-100',
                  'transition-all duration-300 ease-out'
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
            // 'hidden sm:block',
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
      <div
        style={{ textWrap: 'balance', color: priColor! }}
        className='px-4 sm:px-16 md:px-28 pt-16 text-3xl text-center sm:text-left font-semibold transition-colors duration-300 ease-out'
      >
        {element.article}
      </div>
    </>
  );
}
