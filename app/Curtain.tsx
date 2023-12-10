'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CurtainProps {
  className?: string;
}

export default function Curtain({ className }: CurtainProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {pathname !== '/' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            className,
            'bg-slate-200/20 dark:bg-slate-950/20 backdrop-blur-lg',
            'fixed top-0 left-0 w-full h-full'
          )}
        >
          <Link href='/' className='absolute top-0 left-0 w-full h-full cursor-default' />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
