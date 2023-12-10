'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useState, MouseEvent } from 'react';
import { MdClose } from 'react-icons/md';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

interface WidthProviderProps {
  children?: ReactNode;
  className?: string;
}

export default function Main({ className, children }: WidthProviderProps) {
  const DURATION = 0.3;
  const router = useRouter();
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);

  return (
    <AnimatePresence>
      {pathname !== '/' && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION }}
          className={cn(className, 'flex flex-col items-center justify-center py-16 max-w-3xl')}
        >
          {children}
        </motion.main>
      )}
    </AnimatePresence>
  );
}
