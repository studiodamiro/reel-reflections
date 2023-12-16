'use client';

import Image from 'next/image';
import { MovieType } from '@/lib/fetchMovies';
import { image_url } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useMovies } from '@/providers/MoviesProvider';
import { useWidth } from '@/providers/WidthProvider';
import { useEffect, useState } from 'react';
import { usePalette } from 'color-thief-react';
import adjustHexColor from '@/lib/adjustColor';
import arrangeColors from '@/lib/arrangeColors';
import Link from 'next/link';

type BackgroundDetailProps = {
  className?: string;
};

export default function BackgroundDetail({ className }: BackgroundDetailProps) {
  const { containerWidth, elementWidth } = useWidth();
  const { movies, currentMovieIndex } = useMovies();
  const [currentMovie, setCurrentMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    setCurrentMovie(movies[currentMovieIndex] ?? null);
  }, [currentMovieIndex]);

  const [priColor, setPriColor] = useState<string | null>(null);
  const [secColor, setSecColor] = useState<string | null>(null);
  const { data, loading, error } = usePalette(`${image_url}${currentMovie?.logos?.[0]}`, 4, 'hex', {
    crossOrigin: 'anonymous',
    quality: 10,
  });

  useEffect(() => {
    if (data) {
      const colors: string[] = arrangeColors(data);
      setPriColor(adjustHexColor(colors[1], 'light', 20));
      setSecColor(adjustHexColor(colors[1], 'light', 80));
    } else {
      setPriColor('#ffffff');
      setSecColor('#cccccc');
    }
  }, [data]);

  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <div
      style={{ width: containerWidth, bottom: elementWidth }}
      className={cn(
        'absolute left-1/2 -translate-x-1/2 w-full h-3/5 mx-auto px-4 md:px-6 py-6 flex flex-col justify-end gap-2 sm:gap-4 md:gap-6',
        className
      )}
    >
      {/* LOGO */}
      <div className='relative w-1/2 sm:w-1/4 h-1/4'>
        <Image
          src={`${image_url}${currentMovie?.logos?.[0]}`}
          alt={`${currentMovie?.title} poster image`}
          sizes='full'
          fill
          priority
          className='object-contain object-center-bottom sm:object-left-bottom drop-shadow-lg shadow-black'
        />
      </div>

      {/* DETAILS */}
      <div className='relative flex flex-col items-start justify-left gap-2 sm:gap-4 md:gap-6'>
        <div className='flex flex-row items-center justify-center gap-2 sm:gap-4'>
          <Link
            rel='noopener noreferrer'
            target='_blank'
            href={'/'}
            style={{ backgroundColor: isHover ? secColor! : priColor! }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
              'relative px-3.5 py-1.5 rounded-full tracking-widest text-sm font-bold shadow-md items-center justify-center',
              'bg-slate-900/70 dark:bg-white/70 dark:text-slate-900 text-white opacity-80 hover:opacity-100',
              'transition-all duration-300 ease-out'
            )}
          >
            READ REFLECTION
          </Link>
          <div className='flex flex-row items-center justify-center'>
            <span className='tracking-widest font-bold scale-110 text-sm'>{currentMovie?.release}</span>
            <span className='pl-2 sm:pl-4 hidden sm:block'>|</span>
          </div>
          <div className='flex grow items-center justify-start text-sm text-center sm:text-left uppercase tracking-wider py-2'>
            <span style={{ textWrap: 'balance' }} className=''>
              {currentMovie?.genre?.map((genre) => genre).join(' ● ')}
            </span>
          </div>
        </div>
        <div className='w-full md:w-2/5 text-sm line-clamp-3'>{currentMovie?.overview}</div>
      </div>
    </div>
  );
}
