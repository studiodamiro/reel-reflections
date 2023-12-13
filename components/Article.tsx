'use client';

import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWidth } from '@/providers/WidthProvider';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { MdClose } from 'react-icons/md';
import ArticleSlider from './ArticleSlider';

interface ArticleProps {
  title: string;
  children: ReactNode;
}

export default function Article({ children, title }: ArticleProps) {
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
        'bg-slate-300/70 dark:bg-slate-800/70 shadow-lg dark:shadow-black',
        'relative rounded-lg overflow-hidden max-w-3xl'
      )}
    >
      <button onClick={navToHome} className='absolute top-4 right-4 md:top-6 md:right-6'>
        <span className='sr-only'>Close Article Button</span>
        <MdClose />
      </button>
      <ArticleSlider title={title} />
      {/* TODO: Add video link to youtube */}
      <article className='mx-auto px-4 py-8 prose dark:prose-invert prose-sm prose-quoteless'>{children}</article>
    </div>
  );
}
