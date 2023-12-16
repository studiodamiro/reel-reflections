'use client';

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
            'fixed top-0 left-0 w-full h-full',
            'bg-slate-200/30 dark:bg-slate-950/70 backdrop-blur-lg'
          )}
        />
      )}
    </AnimatePresence>
  );
}
