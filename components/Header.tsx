'use client';

import Navigation from './Navigation';
import { useWidth } from '@/providers/WidthProvider';
import { cn } from '@/lib/utils';
import ReelLogo from './ReelLogo';

export default function Header({ className }: { className?: string }) {
  const { containerWidth } = useWidth();

  return (
    <div className={cn('', className)}>
      <header
        style={{ width: containerWidth }}
        className='mx-auto px-4 md:px-6 flex flex-row justify-between items-center'
      >
        <ReelLogo className='scale-[0.4] sm:scale-50 origin-left' />
        <Navigation />
      </header>
    </div>
  );
}
