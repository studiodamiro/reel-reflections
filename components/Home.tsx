'use client';

import Header from './Header';
import BackgroundDetail from './BackgroundDetail';
import CarouselWrapper from './CarouselWrapper';
import BackgroundSlider from './BackgroundSlider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Home() {
  const pathname = usePathname();

  return (
    <div className={cn(pathname !== '/' && 'fixed', 'flex flex-col w-full min-h-screen gap-16 overflow-hidden')}>
      <Header />
      {/* <BackgroundDetail className='flex-1' /> */}
      <CarouselWrapper className='z-10' />
      {/* <BackgroundSlider /> */}
    </div>
  );
}
