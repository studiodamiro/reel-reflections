'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useWidth } from '@/providers/WidthProvider';
import { ReactNode, useRef } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { MdClose } from 'react-icons/md';

interface ArticleProps {
  children: ReactNode;
}

export default function Article({ children }: ArticleProps) {
  const { containerWidth } = useWidth();
  const homeRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const navToHome = () => {
    router.push('/'); // navigate to root
  };

  useOnClickOutside(homeRef, navToHome);

  return (
    <article
      ref={homeRef}
      style={{ width: containerWidth + 'px' }}
      className={cn(
        'prose dark:prose-invert prose-sm prose-quoteless px-4 md:px-6 py-10',
        'bg-slate-300/70 dark:bg-slate-800/70 shadow-lg dark:shadow-black',
        'relative rounded-lg overflow-hidden max-w-3xl'
      )}
    >
      <button onClick={navToHome} className='absolute top-4 right-4 md:top-6 md:right-6'>
        <span className='sr-only'>Close Article Button</span>
        <MdClose />
      </button>
      {children}
    </article>
  );
}
