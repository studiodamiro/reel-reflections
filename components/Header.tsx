'use client';

import Navigation from './Navigation';
import { useWidth } from '@/providers/WidthProvider';
import { cn } from '@/lib/utils';
import Logo from './Logo';

export default function Header({ className }: { className?: string }) {
  const { containerWidth } = useWidth();

  return (
    <div className={cn('', className)}>
      <header
        style={{ width: containerWidth }}
        className='mx-auto px-4 md:px-6 py-6 flex flex-row justify-between items-start'
      >
        <Logo className='scale-75 origin-top-left' />
        <Navigation />
      </header>
    </div>
  );
}
