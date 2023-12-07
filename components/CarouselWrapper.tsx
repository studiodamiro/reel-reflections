'use client';

import { useState } from 'react';
import { useWidth } from '@/providers/WidthProvider';
import { MdChevronLeft } from 'react-icons/md';
import Carousel from './Carousel';
import { cn } from '@/lib/utils';

export default function CarouselWrapper({ className }: { className?: string }) {
  const { containerWidth } = useWidth();
  const [showList, setShowList] = useState(false);

  return (
    <div
      className={cn(
        'fixed w-full h-auto mx-auto bottom-16 z-0 transform transition-transform duration-300',
        className,
        showList ? 'translate-y-full' : 'translate-y-0'
      )}
    >
      <div style={{ width: containerWidth }} className=' h-auto mx-auto flex items-center justify-between mb-4 px-2'>
        <button onClick={() => setShowList(!showList)} className='flex items-center space-x-2'>
          <span className='tracking-widest font-bold uppercase text-lg'>REVIEW LIST</span>
          <MdChevronLeft className={cn('w-6 h-6 -rotate-90 transition-rotate duration-300', showList && 'rotate-90')} />
        </button>
        <p>selection</p>
      </div>
      <Carousel />
    </div>
  );
}
