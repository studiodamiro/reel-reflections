'use client';

import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWidth } from '@/providers/WidthProvider';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageWrapper from './PageWrapper';

interface ArticlePageProps {
  title: string;
  children: ReactNode;
}

export default function ArticlePage({ children, title }: ArticlePageProps) {
  const { containerWidth } = useWidth();
  const homeRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const navToHome = () => router.push('/'); // navigate to root

  useOnClickOutside(homeRef, navToHome);

  return (
    <motion.article
      ref={homeRef}
      key={title}
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
          'absolute z-50 top-4 right-4 md:top-6 md:right-6 rounded-md w-6 aspect-square flex items-center justify-center',
          'bg-slate-200/50 hover:bg-white text-slate-950 shadow-md shadow-black/20',
          'transition-colors duration-300 ease-out'
        )}
      >
        <span className='sr-only'>Close Page Button</span>
        <MdClose />
      </Link>
      <PageWrapper>{children}</PageWrapper>
    </motion.article>
  );
}
