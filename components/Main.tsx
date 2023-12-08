'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';

export default function Main({ className, children }: { className?: string; children: ReactNode }) {
  const [showArticle, setShowArticle] = useState(true);

  useEffect(() => {
    setShowArticle(true);
  }, []);

  return (
    <>
      {showArticle && (
        <main className={cn('relative flex flex-col items-center justify-center mt-16 pb-16 max-w-3xl', className)}>
          <Link href='/' className='absolute z-20 top-4 md:top-6 right-4 md:right-6'>
            <MdClose />
          </Link>
          {children}
        </main>
      )}
    </>
  );
}
