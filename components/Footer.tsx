import Link from 'next/link';
import Navigation from './Navigation';
import ReelLogo from './ReelLogo';
import { useWidth } from '@/providers/WidthProvider';
import { useMovies } from '@/providers/MoviesProvider';

export default function Footer() {
  const { containerWidth } = useWidth();
  const { priColor, secColor } = useMovies();

  return (
    <header
      style={{ width: containerWidth }}
      className='mx-auto px-4 md:px-6 flex flex-row justify-between items-center'
    >
      <Link href={'/'}>
        <ReelLogo color={priColor} secColor={secColor} className='scale-[0.3] sm:scale-20 origin-left' />
      </Link>
      <span>All rights reserved © 2023</span>
      <Navigation />
    </header>
  );
}
