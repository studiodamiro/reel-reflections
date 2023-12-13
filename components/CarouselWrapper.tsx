'use client';

import { useState, useRef } from 'react';
import { useWidth } from '@/providers/WidthProvider';
import { MdChevronLeft } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { MovieType } from '@/lib/fetchMovies';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import Carousel from './Carousel';
import { usePathname } from 'next/navigation';

interface CarouselWrapperProps {
  className?: string;
  elements: MovieType[];
}

export default function CarouselWrapper({ elements, className }: CarouselWrapperProps) {
  const { containerWidth } = useWidth();
  const [showList, setShowList] = useState(false);

  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => pathname === '/' && setShowList(false));

  return (
    <div
      ref={ref}
      className={cn(
        'fixed w-full h-auto mx-auto bottom-0 z-0 transform transition-transform duration-300',
        className,
        showList ? '-translate-y-1/4' : 'translate-y-1/3 md:translate-y-2/3'
      )}
    >
      <div
        style={{ width: containerWidth }}
        className=' h-auto mx-auto flex items-center justify-between mb-4 px-4 md:px-6'
      >
        <button onClick={() => setShowList(!showList)} className='flex items-center space-x-2'>
          <span className='tracking-wider font-bold uppercase text-md: md:text-lg'>MOVIE LIST</span>
          <MdChevronLeft className={cn('w-6 h-6 rotate-90 transition-rotate duration-300', showList && '-rotate-90')} />
        </button>
        <p>selection</p>
      </div>
      <Carousel elements={elements} />
    </div>
  );
}
