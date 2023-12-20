'use client';

import { useWidth } from '@/providers/WidthProvider';
import { cn } from '@/lib/utils';
import Carousel from './Carousel';

interface CarouselWrapperProps {
  className?: string;
}

export default function CarouselWrapper({ className }: CarouselWrapperProps) {
  const { containerWidth } = useWidth();

  return (
    <div className={cn('relative w-full h-fit mx-auto bottom-8 z-0', className)}>
      <div
        style={{ width: containerWidth }}
        className='w-full h-auto mx-auto flex items-center justify-between mb-4 px-4 md:px-6'
      >
        <span className='w-full tracking-widest text-center sm:text-left font-bold uppercase text-md: md:text-lg'>
          RECENT REFLECTIONS
        </span>
        {/* <p>selection</p> */}
      </div>
      <Carousel />
    </div>
  );
}
