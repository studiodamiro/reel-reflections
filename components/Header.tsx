'use client';

import Navigation from './Navigation';
import { useWidth } from '@/providers/WidthProvider';
import { cn } from '@/lib/utils';
import ReelLogo from './ReelLogo';
import { useMovies } from '@/providers/MoviesProvider';
import Link from 'next/link';

export default function Header({ className }: { className?: string }) {
  const { containerWidth } = useWidth();
  const { priColor, secColor } = useMovies();

  return (
    <div className={cn('', className)}>
      <header
        style={{ width: containerWidth }}
        className='mx-auto px-4 md:px-6 flex flex-row justify-between items-center'
      >
        <Link href={'/'}>
          <ReelLogo color={priColor} secColor={secColor} className='scale-[0.3] sm:scale-50 origin-left' />
        </Link>
        <Navigation />
      </header>
    </div>
  );
}
