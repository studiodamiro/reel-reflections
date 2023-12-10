'use client';

import { cn } from '@/lib/utils';
import { useWidth } from '@/providers/WidthProvider';
import { ReactNode, useEffect, useRef } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface ArticleProps {
  children: ReactNode;
}

export default function Article({ children }: ArticleProps) {
  const { containerWidth } = useWidth();
  const homeRef = useRef<HTMLDivElement | null>(null);

  const clickOutsideFunction = () => {
    console.log('clicked outside');
  };

  useOnClickOutside(homeRef, () => clickOutsideFunction());

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clickOutsideFunction();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <article
      ref={homeRef}
      style={{ width: containerWidth + 'px' }}
      className={cn(
        'prose dark:prose-invert prose-sm prose-quoteless px-4 md:px-6 py-10',
        // 'bg-slate-300/70 dark:bg-slate-900/70 shadow-lg dark:shadow-black',
        'rounded-lg overflow-hidden max-w-3xl bg-red-600'
      )}
    >
      {children}
    </article>
  );
}
