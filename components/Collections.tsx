'use client';

import { cn } from '@/lib/utils';
import { useMovies } from '@/providers/MoviesProvider';
import { useWidth } from '@/providers/WidthProvider';
import CollectionCard from './CollectionCard';

export default function Collections() {
  const { movies } = useMovies();
  const { containerWidth, elementWidth } = useWidth();

  return (
    <div className='w-full bg-slate-950'>
      <div style={{ width: containerWidth }} className='w-full h-auto mx-auto flex flex-col'>
        <span className='w-full px-4 md:px-6 tracking-widest text-center sm:text-left font-bold uppercase text-md: md:text-lg'>
          ARCHIVE
        </span>
        <div
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${elementWidth}px, 1fr))` }}
          className={cn('grid gap-0')}
        >
          {movies.map((movie, index) => (
            <CollectionCard key={movie.id} movie={movie} id={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
