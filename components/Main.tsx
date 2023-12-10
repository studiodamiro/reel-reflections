'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface WidthProviderProps {
  children?: ReactNode;
  className?: string;
}

export default function Main({ className, children }: WidthProviderProps) {
  const DURATION = 0.3;

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION }}
        className={cn(className, 'flex flex-col items-center justify-center py-16 max-w-3xl')}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
