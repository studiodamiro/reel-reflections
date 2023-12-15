'use client';

import Image from 'next/image';
import { MovieType } from '@/lib/fetchMovies';
import { image_url } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useMovies } from '@/providers/MoviesProvider';
import { useWidth } from '@/providers/WidthProvider';
import { useEffect, useState } from 'react';

export default function BackgroundDetail() {
  const { containerWidth, elementWidth } = useWidth();
  const { movies, currentMovieIndex } = useMovies();
  const [currentImage, setCurrentImage] = useState<MovieType | null>(null);

  useEffect(() => {
    setCurrentImage(movies[currentMovieIndex] ?? null);
  }, [currentMovieIndex]);

  return (
    <div
      style={{ width: containerWidth, paddingBottom: `${elementWidth + 30}px` }}
      className={cn(
        'fixed inset-0 w-full min-h-screen mx-auto px-4 md:px-6 py-6 bg-red-500/20',
        'flex flex-col justify-end'
      )}
    >
      <div className='relative w-1/2 sm:w-1/3 aspect-video bg-red-500/10'>
        <Image
          src={`${image_url}${currentImage?.logos?.[0]}`}
          alt={`${currentImage?.title} poster image`}
          sizes='full'
          fill
          priority
          className='object-contain object-center-bottom sm:object-left-bottom drop-shadow-lg shadow-black bg-red-500'
        />
      </div>
    </div>
  );
}
