'use client';

import { useWidth } from '@/providers/WidthProvider';

export default function Article({ children }: { children: React.ReactNode }) {
  const { containerWidth } = useWidth();

  return (
    <article
      style={{ width: containerWidth + 'px' }}
      className='prose dark:prose-invert prose-sm prose-quoteless px-4 md:px-6 py-10 bg-slate-300/30 dark:bg-slate-800/30 backdrop-blur-xl rounded-lg overflow-hidden max-w-3xl dark:shadow-black shadow-lg'
    >
      {children}
    </article>
  );
}
