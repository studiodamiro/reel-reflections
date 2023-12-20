'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useWidth } from '@/providers/WidthProvider';
import { useMovies } from '@/providers/MoviesProvider';
import ReelLogo from './ReelLogo';
import Navigation from './Navigation';

type HeaderProps = {
  className?: string;
  scrollOffset: number;
};

export default function Header({ className, scrollOffset }: HeaderProps) {
  const { containerWidth } = useWidth();
  const { priColor, secColor } = useMovies();

  return (
    <div
      className={cn(
        'fixed z-30 w-screen',
        scrollOffset > 300
          ? 'from-slate-950/0 via-slate-950/0 to-slate-950'
          : 'from-slate-950/0 via-slate-950/0 to-slate-0',
        'bg-gradient-to-t from-0% via-0% to-100%',
        className
      )}
    >
      <header
        style={{ width: containerWidth }}
        className={cn('flex flex-row justify-between items-center mx-auto px-4 md:px-6')}
      >
        <Link href={'/'}>
          <ReelLogo color={priColor} secColor={secColor} className={cn('scale-[0.3] sm:scale-50 origin-left')} />
        </Link>
        <Navigation />
      </header>
    </div>
  );
}
