'use client';

import { cn } from '@/lib/utils';
import { useWidth } from '@/providers/WidthProvider';
import { ReactNode } from 'react';

interface ArticleProps {
  children: ReactNode;
}

export default function Article({ children }: ArticleProps) {
  const { containerWidth } = useWidth();

  return (
    <article
      style={{ width: containerWidth + 'px' }}
      className={cn(
        'prose dark:prose-invert prose-sm prose-quoteless px-4 md:px-6 py-10',
        'bg-slate-300/70 dark:bg-slate-900/70 shadow-lg dark:shadow-black',
        'rounded-lg overflow-hidden max-w-3xl'
      )}
    >
      {children}
    </article>
  );
}
