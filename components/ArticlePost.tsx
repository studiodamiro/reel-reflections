'use client';

import Link from 'next/link';
import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { IoCloseSharp } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useWidth } from '@/providers/WidthProvider';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { cn } from '@/lib/utils';
import ArticleSlider from './ArticleSlider';
import { useMovies } from '@/providers/MoviesProvider';
import getGenreFilteredMovies from '@/lib/getGenreFilteredMovies';
import CollectionCard from './CollectionCard';

interface ArticlePostProps {
  title: string;
  children: ReactNode;
}

export default function ArticlePost({ children, title }: ArticlePostProps) {
  const { movies } = useMovies();
  const movie = movies.find((movie) => movie.title === title);
  if (!movie) return null;

  const { containerWidth } = useWidth();
  const homeRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const navToHome = () => router.push('/');

  useOnClickOutside(homeRef, navToHome);

  const genres = [movie.genre[0], movie.genre[1]]; // Should be an array []
  const filteredAndSortedMovies = getGenreFilteredMovies({ genres, titleToExclude: movie.title });
  // const randomThreeItems = shuffleArray<MovieType>(filteredAndSortedMovies).slice(0, 3);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        ref={homeRef}
        id={movie.slug}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        style={{ width: containerWidth + 'px' }}
        className={cn(
          'relative rounded-lg overflow-hidden max-w-3xl my-6 sm:my-16 shadow-md dark:shadow-black/20',
          'bg-gradient-to-t from-0% to-80%',
          'from-slate-300/30 to-slate-300',
          'dark:from-slate-900/50 dark:to-slate-900'
        )}
      >
        <Link
          href={'/'}
          className={cn(
            'absolute z-30 top-4 right-4 md:top-6 md:right-6 rounded-md w-6 aspect-square flex items-center justify-center',
            'bg-slate-200/50 hover:bg-white text-slate-950 shadow-md shadow-black/20',
            'transition-colors duration-300 ease-out'
          )}
        >
          <span className='sr-only'>Close Post Button</span>
          <IoCloseSharp />
        </Link>
        <article>
          <ArticleSlider movie={movie} />
          <div className='px-4 sm:px-16 md:px-28 pb-12 max-w-full mx-auto prose dark:prose-invert prose-sm prose-quoteless'>
            {children}
          </div>
          <span className='px-4 sm:px-16 md:px-28 flex justify-center sm:justify-start font-bold uppercase text-md: md:text-lg tracking-wider'>
            MORE LIKE THIS
          </span>
          <div className='pb-8 sm:pb-16 px-3 sm:px-8 md:px-0 lg:px-24 flex flex-row gap-0 w-full items-center justify-center'>
            {filteredAndSortedMovies.slice(0, 3).map((movie) => (
              <CollectionCard key={parseInt(String(movie.id))} movie={movie} />
            ))}
          </div>
        </article>
      </motion.div>
    </AnimatePresence>
  );
}
