'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Header from './Header';
import BackgroundDetail from './BackgroundDetail';
import CarouselWrapper from './CarouselWrapper';
import BackgroundSlider from './BackgroundSlider';
import Collections from './Collections';
import Footer from './Footer';

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollOffset = ref.current.scrollTop;
        setScrollOffset(scrollOffset);
      }
    };

    if (ref.current) ref.current.addEventListener('scroll', handleScroll);

    return () => {
      if (ref.current) ref.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(pathname !== '/' && 'fixed', 'w-full max-h-screen overflow-hidden overflow-y-auto scrollbar-hide')}
    >
      <Header scrollOffset={scrollOffset} />
      <div className={cn('flex flex-col w-full min-h-[90vh] gap-16 overflow-hidden')}>
        <BackgroundDetail className='flex-1' />
        <CarouselWrapper className='z-20' />
        <BackgroundSlider scrollOffset={scrollOffset} />
      </div>
      <Collections />
      <Footer />
    </div>
  );
}
