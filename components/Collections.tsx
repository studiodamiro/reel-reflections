'use client';

import { cn } from '@/lib/utils';
import { useMovies } from '@/providers/MoviesProvider';
import { useWidth } from '@/providers/WidthProvider';
import { useEffect, useState } from 'react';
import ImageFadeIn from './ImageFadeIn';
import { image_url } from '@/lib/constants';

export default function Collections() {
  const { movies } = useMovies();
  const { containerWidth, elementWidth } = useWidth();

  useEffect(() => {
    console.log(movies);
  }, []);

  return (
    <div className='w-full bg-slate-950'>
      <div style={{ width: containerWidth }} className='w-full h-auto mx-auto flex flex-col'>
        <span className='w-full px-4 md:px-6 tracking-widest text-center sm:text-left font-bold uppercase text-md: md:text-lg'>
          COLLECTIONS
        </span>
        <div
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${elementWidth}px, 1fr))` }}
          className={cn('grid gap-0')}
        >
          {movies.map((movie) => (
            <div key={movie.id} style={{ width: elementWidth }} className='px-1 sm:px-2 py-6'>
              <div
                className={cn(
                  'relative z-0 object-center object-cover w-full aspect-[3/4] overflow-hidden m-0 p-0 rounded-sm md:rounded-md group'
                )}
              >
                {movie.poster ? (
                  <ImageFadeIn
                    src={`${image_url}${movie.poster}`}
                    alt={`${movie.title} poster image`}
                    priority
                    className='object-center object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-slate-800' />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
