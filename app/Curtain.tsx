'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Curtain({ className }: { className?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    // console.log(`Route changed to: ${pathname}`);
  }, [pathname]);

  return (
    <>
      {pathname !== '/' && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: 'easeInOut' }}>
          <Link
            href='/'
            className={cn(
              className,
              'bg-slate-200/20 dark:bg-slate-950/20 backdrop-blur-lg',
              'fixed top-0 left-0 w-full h-full cursor-default'
            )}
          />
        </motion.span>
      )}
    </>
  );
}
