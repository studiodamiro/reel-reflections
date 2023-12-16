'use client';

import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWidth } from '@/providers/WidthProvider';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { IoCloseSharp } from 'react-icons/io5';
import ArticleSlider from './ArticleSlider';
import Link from 'next/link';

interface ArticleProps {
  title: string;
  children: ReactNode;
}

export default function ArticlePost({ children, title }: ArticleProps) {
  const { containerWidth } = useWidth();
  const homeRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const navToHome = () => router.push('/');

  useOnClickOutside(homeRef, navToHome);

  return (
    <div
      ref={homeRef}
      style={{ width: containerWidth + 'px' }}
      className={cn(
        'relative rounded-lg overflow-hidden max-w-3xl my-6 sm:my-16 shadow-lg dark:shadow-black',
        'bg-gradient-to-t from-0% to-80%',
        'from-slate-300/30 to-slate-300',
        'dark:from-slate-900/50 dark:to-slate-900'
      )}
    >
      <Link
        href={'/'}
        className={cn(
          'absolute z-30 top-4 right-4 md:top-6 md:right-6 rounded-lg w-6 aspect-square flex items-center justify-center',
          'bg-slate-200/50 hover:bg-white text-slate-950 shadow-md shadow-black/20',
          'transition-colors duration-300 ease-out'
        )}
      >
        <span className='sr-only'>Close Article Button</span>
        <IoCloseSharp />
      </Link>
      <ArticleSlider title={title} />
      <article className='px-4 sm:px-16 md:px-28 pb-16 max-w-full mx-auto prose dark:prose-invert prose-sm prose-quoteless'>
        {children}
      </article>
    </div>
  );
}
