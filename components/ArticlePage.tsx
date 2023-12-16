'use client';

import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWidth } from '@/providers/WidthProvider';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { MdClose } from 'react-icons/md';

interface ArticleProps {
  children: ReactNode;
}

export default function ArticlePage({ children }: ArticleProps) {
  const { containerWidth } = useWidth();
  const homeRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const navToHome = () => router.push('/'); // navigate to root

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
      <button onClick={navToHome} className='absolute z-30 top-4 right-4 md:top-6 md:right-6'>
        <span className='sr-only'>Close Article Button</span>
        <MdClose />
      </button>
      <article className='px-4 sm:px-16 md:px-28 py-16 max-w-full mx-auto prose dark:prose-invert prose-sm prose-quoteless'>
        {children}
      </article>
    </div>
  );
}
