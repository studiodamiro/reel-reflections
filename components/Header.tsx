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
        className='h-16 mx-auto px-2 flex flex-row justify-between items-center '
      >
        <Logo />
        <Navigation />
      </header>
    </div>
  );
}
