import Link from 'next/link';
import Navigation from './Navigation';
import ReelLogo from './ReelLogo';
import { useWidth } from '@/providers/WidthProvider';
import { useMovies } from '@/providers/MoviesProvider';

export default function Footer() {
  const { containerWidth } = useWidth();
  const { priColor, secColor } = useMovies();
  const year = new Date().getFullYear();

  return (
    <header
      style={{ width: containerWidth }}
      className='mx-auto px-4 md:px-6 flex flex-col sm:flex-row gap-2 justify-between my-8'
    >
      <Link href={'/'}>
        <ReelLogo
          color={priColor}
          secColor={secColor}
          className='scale-[0.3] sm:scale-20 origin-left h-[30px] object-center'
        />
      </Link>
      <div className='flex flex-row-reverse sm:flex-row gap-2 justify-between items-center text-xs text-slate-500'>
        <span className='hidden sm:block'>All rights reserved</span>© {year}
        <Navigation />
      </div>
    </header>
  );
}
